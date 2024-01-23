import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage, } from 'formik';
import * as Yup from 'yup';
import { editCoupen, getSingleCoupenCode } from '../../api/api_endpoint';
import { getValidDateFormat } from '../../helper/Helper';
import { toast } from 'react-toastify';

function EditCoupen() {


  let { coupen_id } = useParams();
  let [startEditing, setStartEditing] = useState(false);


  let [initValues, setInitValues] = useState({
    name: "",
    code: "",
    description: "",
    offer: "",
    minimum_order: "",
    maximum_order: "",
    valid_from: "",
    valid_to: "",
    status: "",
  })


  useEffect(() => {
    getSingleCoupenCode(coupen_id).then((data) => {
      let response = data?.data;
      if (response?.status) {
        let coupen = response?.coupen;
        coupen.valid_from = getValidDateFormat(coupen?.valid_from)
        coupen.valid_to = getValidDateFormat(coupen?.valid_to)
        setInitValues(coupen)
      }
    }).catch((err) => { })
  }, [])

  let schemeValidation = Yup.object().shape({
    name: Yup.string("Please valid string").trim().required("Coupen name is required"),
    code: Yup.string("Please valid string").trim().required("Coupen code is required"),
    description: Yup.string("Please valid string").trim().required("Coupen description is required"),
    offer: Yup.string("Please valid string").required("Coupen offer is required"),
    minimum_order: Yup.number().typeError("Please enter valid value").required("Coupen minimum value is required"),
    maximum_order: Yup.number().typeError("Please valid value").moreThan(Yup.ref("minimum_order"), "Please enter value greater than minimum order").required("Coupen maximum value is required"),
    valid_from: Yup.date("Please valid date").required("Coupen valid from is required"),
    valid_to: Yup.date("Please valid date").required("Coupen valid to is required"),
    status: Yup.string("Please valid string").trim().required("Coupen status is required"),
  })


  function onEditCoupen(values) {

    if (startEditing) {
      let coupenCodeData = {
        name: values?.name,
        code: values?.code,
        description: values?.description,
        offer: values?.offer,
        minimum_order: values?.minimum_order,
        maximum_order: values?.maximum_order,
        valid_from: values?.valid_from,
        valid_to: values?.valid_to,
        status: values?.status,
        edit_id: [coupen_id]
      }

      editCoupen(coupenCodeData).then((data) => {
        let response = data?.data;
        if (response?.status) {
          toast.success("Coupen update success")
        } else {
          toast.error("Something went wrong")
        }
      }).catch((err) => toast.error("Something went wrong"))
    }
  }

  return (
    <AdminLayout>
      <div className="content_body" id="content_body">
        {startEditing ? <div className="wrapper_content_body">

          <h2>Edit Coupen Code</h2>

          <div className="content_box_border">
            <div className="row mt-2">
              <Formik enableReinitialize initialValues={initValues} onSubmit={onEditCoupen} validationSchema={schemeValidation}>
                <Form >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="name" type="text" placeholder="Coupen Name" />
                        <ErrorMessage name="name" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Code</label>
                        <Field id="code" name="code" type="text" placeholder="Coupen Code" />
                        <ErrorMessage name="code" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Description</label>
                        <Field id="description" name="description" type="text" placeholder="Coupen Description" />
                        <ErrorMessage name="description" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Offer (in %)</label>
                        <Field id="offer" name="offer" type="text" placeholder="Coupen Offer" />
                        <ErrorMessage name="offer" component="div" className="formValidateError" />
                      </div>
                    </div>


                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Minimum order</label>
                        <Field id="minimum_order" name="minimum_order" type="text" placeholder="Coupen Minimum Order" />
                        <ErrorMessage name="minimum_order" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Maximum Order</label>
                        <Field id="maximum_order" name="maximum_order" type="text" placeholder="Coupen Maximum Order" />
                        <ErrorMessage name="maximum_order" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Valid From</label>
                        <Field id="valid_from" name="valid_from" type="date" placeholder="Coupen Valid From" />
                        <ErrorMessage name="valid_from" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Valid To</label>
                        <Field id="valid_to" type="date" name="valid_to" placeholder="Coupen Valid To" />
                        <ErrorMessage name="valid_to" component="div" className="formValidateError" />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form_group">
                        <label htmlFor="name">Status</label>
                        <Field id="status" name="status" type="text" as="select">
                          <option value="">Select Status</option>
                          <option value={true}>Active</option>
                          <option value={false}>In Active</option>
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
        </div> : null}
      </div>
    </AdminLayout>
  )
}

export default EditCoupen
