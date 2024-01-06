import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import FiltterButton from '../../Components/Button/FiltterButton'
import ActionButton from '../../Components/Button/ActionButton'
import { deleteCoupenCode, editCoupen, getAllCoupen } from '../../api/api_endpoint';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import { toast } from 'react-toastify';
import { getValidDateFormat } from '../../helper/Helper';

function ManageCoupen() {

  let [coupenCode, setCoupenCode] = useState([]);
  let [tempCoupenCode, setTempCoupenCode] = useState([]);
  let [coupenChecked, setCoupenChecked] = useState([]);


  function updateTable(products) {
    $('#coupenTable').DataTable().destroy();
    setCoupenCode(products)
  }

  useEffect(() => {
    let table = $("#coupenTable").DataTable()
    var rows = table.rows().nodes();
    rows.reverse();
    table.clear().rows.add(rows).draw();
  }, [coupenCode])

  useEffect(() => {
    getAllCoupen().then((data) => {
      let response = data?.data;
      if (response?.status) {
        let coupens = response?.coupens
        $("#coupenTable").DataTable().destroy();
        setCoupenCode(coupens)
        setTempCoupenCode(coupens)
      }
    }).catch((err) => { })
  }, [])


  function toggleCoupenChecked(coupen_id) {
    if (coupenChecked.includes(coupen_id)) {
      setCoupenChecked(coupenChecked.filter((checked) => checked != coupen_id));
    } else {
      setCoupenChecked([...coupenChecked, coupen_id])
    }
  }

  function deleteBulkCoupen() {
    deleteCoupenCode(coupenChecked).then((data) => {
      let response = data?.data;
      if (response?.status) {
        toast.success("Coupen delete success")
        let table = $("#coupenTable").DataTable();
        table.rows().every(function () {
          const rowData = this.id();
          if (coupenChecked.includes(rowData)) {
            this.remove();
          }
          return true;
        });

        let newList = coupenCode.filter((each) => !coupenChecked.includes(each._id))
        setCoupenCode(newList)

      } else {
        toast.error("Coupen delete failed")
      }
    }).catch((err) => {
      toast.error("Something went wrong")
    })
  }


  function updateStatus(newStatus) {





    let editData = {
      edit_id: coupenChecked,
      status: newStatus
    }

    editCoupen(editData).then((data) => {
      let response = data?.data;
      if (response?.status) {
        let newList = coupenCode.map((each) => {
          if (coupenChecked.includes(each._id)) {
            each.status = newStatus
          }
          return each;
        })
        updateTable(newList)
        toast.success("Coupen status update success")
      } else {
        toast.success("Coupen status update failed")
      }
    }).catch((err) => {
      toast.success("Coupen status update failed")
    })

  }

  function filterCoupen(status) {
    if (status === "ALL") {
      updateTable(tempCoupenCode)
      //setCoupenCode(tempCoupenCode)
    } else {
      let filtterData = tempCoupenCode.filter((eachItem) => eachItem.status == status);
      updateTable(filtterData)
      // setCoupenCode(filtterData)
    }
  }


  return (
    <AdminLayout>
      <div className="content_body" id="content_body">
        <div className="wrapper_content_body">

          <h2>Manage Coupen Code</h2>

          <div className="type_pages_list">
            <div className="row rmr">

              <div className="col-lg-3 col-xs-12 col-sm-6">
                <FiltterButton className={"green"} title={"Add Coupen"} icon={"fa-add"} to={"/add_coupen_code"} />
              </div>

              <div className="col-lg-3 col-xs-12 col-sm-6">
                <FiltterButton isButton={true} onClick={() => filterCoupen("ALL")} className={"green"} title={"All Coupen"} icon={"fa-list"} />
              </div>

              <div className="col-lg-3 col-xs-12 col-sm-6">
                <FiltterButton isButton={true} onClick={() => filterCoupen(true)} className={"green"} title={"Active Coupen"} icon={"fa-thumbs-up"} />
              </div>

              <div className="col-lg-3 col-xs-12 col-sm-6">
                <FiltterButton isButton={true} onClick={() => filterCoupen(false)} className={"red"} title={"In Active Coupen"} icon={"fa-thumbs-down"} />
              </div>


            </div>
          </div>

          <div className="type_pages_list">

            <div className="row rmr">


              <div className="col-lg-2 col-xs-12 col-sm-4">
                <ActionButton className={"red"} title={"Delete"} onClickAction={() => { deleteBulkCoupen() }} icon={"fa-trash"} />
              </div>

              <div className="col-lg-2 col-xs-12 col-sm-4">
                <ActionButton className={"green"} title={"Active"} onClickAction={() => { updateStatus(true) }} icon={"fa-thumbs-up"} />
              </div>

              <div className="col-lg-2 col-xs-12 col-sm-4">
                <ActionButton className={"red"} title={"In Active"} onClickAction={() => { updateStatus(false) }} icon={"fa-thumbs-down"} />
              </div>


            </div>
          </div>


          <div className="table_data_check">
            <div className="table_head_sec">
              <h2>Manage Product</h2>
            </div>



            <table id="coupenTable" className="display" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>CODE</th>
                  <th>Description</th>
                  <th>Offer</th>
                  <th>Minimum Order</th>
                  <th>Maximum Order</th>
                  <th>Valid From </th>
                  <th>Valid To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  coupenCode?.map((coupenItem) => {
                    return (
                      <tr id={coupenItem._id}>
                        <td>
                          <input className='check_select' checked={coupenChecked.includes(coupenItem._id)} onChange={() => { toggleCoupenChecked(coupenItem._id) }} type="checkbox" />
                        </td>
                        <td>{coupenItem.name}</td>
                        <td>{coupenItem.code}</td>
                        <td>{coupenItem.description}</td>
                        <td>{coupenItem.offer}</td>
                        <td>{coupenItem.minimum_order}</td>
                        <td>{coupenItem.maximum_order}</td>
                        <td>{getValidDateFormat(coupenItem.valid_from)}</td>
                        <td>{getValidDateFormat(coupenItem.valid_to)}</td>
                        <td>{coupenItem.status ? "Active" : "In Active"}</td>
                        <td><Link className="btn btn-success" to={"/edit_coupen/" + coupenItem._id}>Edit</Link></td>
                      </tr>
                    )
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>CODE</th>
                  <th>Description</th>
                  <th>Offer</th>
                  <th>Minimum Order</th>
                  <th>Maximum Order</th>
                  <th>Valid From </th>
                  <th>Valid To</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>



        </div>
      </div>
    </AdminLayout>
  )
}

export default ManageCoupen
