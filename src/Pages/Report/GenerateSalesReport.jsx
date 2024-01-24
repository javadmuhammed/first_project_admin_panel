import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { downloadSalesReport, downloadSalesReportAsPdf, getAllCategoryEndPoint, getAllOrder } from '../../api/api_endpoint';
import { const_data } from '../../const/const_data';
import * as Yup from 'yup'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';




function GenerateSalesReport() {

  let [categoryList, setCategoryList] = useState([]);
  let [allOrders, setAllOrders] = useState([]);
  let [temp_order, setTempOrders] = useState([]);
  let [downloadUrl, setDownloadUrl] = useState("");
  let [downloadUrlPDF, setDownloadUrlPDF] = useState("");

  function downloadSalesReportAsPDF(from_date, to_date, category, status) {

    downloadSalesReportAsPdf(from_date, to_date, category, status).then((dt) => {

      console.log(dt)
      try {
        let data = dt.data;
        console.log(data)

        const blob = new Blob([data], { type: 'application/pdf' });

        let objectUrl = URL.createObjectURL(blob);
        console.log(objectUrl)
        setDownloadUrlPDF(objectUrl)

      } catch (e) {
        toast.error("PDF Generate Failed")
        console.log(e)
      }
    }).catch((err) => {
      toast.error("PDF Generate Failed")
      console.log(err)
    })

  }


  function downloadButtonGenerate(from_date, to_date, category, status) {
    downloadSalesReport(from_date, to_date, category, status)
      .then(async (dt) => {
        try {
          let data = dt.data;
          console.log(data)
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

          let objectUrl = URL.createObjectURL(blob);
          console.log(objectUrl)
          setDownloadUrl(objectUrl)
        } catch (e) {
          toast.error("XL Generate Failed")
        }
      }).catch((err) => {
        toast.error("XL Generate Failed")
      })
  }

  useEffect(() => {
    $("#generateSalesReport").DataTable();
  }, [allOrders])



  useEffect(() => {


    downloadButtonGenerate("", "", "", "")
    downloadSalesReportAsPDF("", "", "", "")

    getAllCategoryEndPoint().then((data) => {
      let response = data?.data
      if (response.status) {
        setCategoryList(response.categorys)
      }
    }).catch((err) => { })

    getAllOrder().then((data) => {
      let response = data.data;
      if (response.status) {
        $("#generateSalesReport").DataTable().destroy();
        let orders = response.orders.reverse();

        let deliveredOnly = orders.filter((each) => each.status = const_data.ORDER_STATUS.DELIVERED)
        setAllOrders(deliveredOnly)
        setTempOrders(deliveredOnly)
      }
    }).catch((err) => {
    })

  }, [])




  let initialValues = {
    from_date: new Date().toISOString().split('T')[0],
    to_date: new Date().toISOString().split('T')[0],
    category: "",
    status: "",
  }

  let validationSchema = Yup.object().shape({
    from_date: Yup.date("Please select valid date").required("From date is required"),
    to_date: Yup.date("Please select end date").required("End date is required").min(Yup.ref('from_date'), "End date must be greater than start date"),
    category: Yup.string("Please select valid category").notRequired(),
    status: Yup.string("Please select valid status").notRequired(),
  })



  let handleSubmit = function (values) {

    arrangeOrderTable(values.from_date, values.to_date, values.status, values.category)
    downloadButtonGenerate(values.from_date, values.to_date, values.category, values.status)
    downloadSalesReportAsPDF(values.from_date, values.to_date, values.category, values.status)
  }


  function arrangeOrderTable(from_date, to_date, status, category) {

    let newData = temp_order.filter((eachItems) => {
      if (new Date(eachItems.order_date) <= new Date(to_date) && new Date(eachItems.order_date) >= new Date(from_date)) {
        let include = true;
        if (category != "") {
          if (eachItems.products.category != category) {
            include = false;
          }
        }
        if (status != "") {
          if (eachItems.status != status) {
            include = false;
          }
        }
        return include;
      } else {
        return false;
      }
    });
    $("#generateSalesReport").DataTable().destroy()
    setAllOrders(newData)
  }

  return (
    <AdminLayout>

      <div className="content_body" id="content_body">
        <div className="wrapper_content_body">
          <h2>Generate Sales Report</h2>

          <div className="content_box_border">
            <div className="row mt-2">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">From Date</label>
                        <Field id="from_date" name="from_date" type="date" placeholder="From Date" />
                        <ErrorMessage name="from_date" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">To Date</label>
                        <Field id="to_date" name="to_date" type="date" placeholder="To Date" />
                        <ErrorMessage name="to_date" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Category</label>
                        <Field as="select" id="category" name="category" placeholder="Category">
                          <option value="">ALL</option>
                          {
                            categoryList.map((option) => {
                              return (
                                <option value={option._id}>{option.name}</option>
                              )
                            })
                          }
                        </Field>
                        <ErrorMessage name="category" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Status</label>
                        <Field as="select" id="status" name="status" placeholder="Category">
                          <option value="">ALL</option>
                          {
                            Object.values(const_data.ORDER_STATUS).map((status) => {
                              return (
                                <option value={status}>{status}</option>
                              )
                            })
                          }
                        </Field>
                        <ErrorMessage name="status" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-12 text-center">
                      <button className="form_btn btn_green" type="submit">
                        Submit
                      </button>
                      <button className="form_btn btn_warning" type="reset">
                        Cancel
                      </button>
                    </div>


                  </div>
                </Form>
              </Formik>
            </div>
          </div>

          <div className="table_data_check mt-3">
            <div className="table_head_sec">
              <div className="row mb-3">
                <div className="col-md-6">
                  <h5>Manage Stock</h5>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                  <a href={downloadUrlPDF} download="sales_report_pdf.pdf" className='btn btn-success'> <i className='fa fa-download'></i> Download As PDF</a>
                  <a href={downloadUrl} download="sales_report.xlsx" className='btn btn-success'> <i className='fa fa-download'></i> Download As Excel</a>
                </div>
              </div>
            </div>




            <table id="generateSalesReport" className="display " style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Order ID</th>

                  <th>Shipper Name</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Invoice ID</th>
                  <th>Payment Type</th>
                  <th>Product ID</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allOrders.map((eachOrder) => {
                    return (
                      <tr>
                        <td></td>
                        <td>{eachOrder.order_id}</td>

                        <td>{eachOrder.shipper_name}</td>
                        <td>{eachOrder.total}</td>
                        <td>{eachOrder.status}</td>
                        <td>{eachOrder.invoice_id}</td>
                        <td>{eachOrder.payment_type}</td>
                        <td>{eachOrder.products?.product}</td>
                        <td><Link to={'/view_single_order/' + eachOrder._id} className='btn btn-success' >View</Link></td>
                        {/* <td>{eachOrder}</td> */}
                      </tr>
                    )
                  })
                }


              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Order ID</th>

                  <th>Shipper Name</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Invoice ID</th>
                  <th>Payment Type</th>
                  <th>Product ID</th>
                  <th >Action</th>
                </tr>
              </tfoot>
            </table >



          </div>

        </div>
      </div>
    </AdminLayout>
  )
}

export default GenerateSalesReport
