import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { deleteCategoryEndPoint, getAllCategoryEndPoint, updateCategoryEndPoint } from '../../api/api_endpoint';
import { const_data } from '../../const/const_data';
import $ from 'jquery'
import { Link } from 'react-router-dom';
import FiltterButton from '../../Components/Button/FiltterButton';
import ActionButton from '../../Components/Button/ActionButton';
import { toast } from 'react-toastify';


function ManageCategory() {

    let [categoryList, setCategoryList] = useState([]);
    let [tempCategoryList, setTempCategoryList] = useState([]);
    let [checkedCategory, setCheckedCategory] = useState([]);


    useEffect(() => {
        let table = $("#categoryTable").DataTable();

        var rows = table.rows().nodes();
        rows.reverse();
        table.clear().rows.add(rows).draw();
    }, [categoryList]);




    useEffect(() => {
        getAllCategoryEndPoint().then((category) => {
            let response = category.data;
            if (response.status) {
                $("#categoryTable").DataTable().destroy();
                setCategoryList(response.categorys)
                setTempCategoryList(response.categorys)
            }
        }).catch((err) => { })
    }, [])


    function toggleCheckedCategory(categoryID) {
        if (checkedCategory.includes(categoryID)) {
            let withoutThis = checkedCategory.filter((items) => items != categoryID);
            setCheckedCategory(withoutThis)
        } else {
            setCheckedCategory([...checkedCategory, categoryID])
        }
    }


    function filtterCategory(type) {
        let filtter = tempCategoryList.filter((items) => items.status == type);
        setCategoryList(filtter)
    }

    function deleteCategory() {
        deleteCategoryEndPoint(checkedCategory.join(",")).then((dlt) => {
            let response = dlt.data;
            if (response.status) {
                toast.success("Category deleted success")
                checkedCategory.forEach((eachItems) => {
                    document.getElementById("row_id_" + eachItems).remove()
                })
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }


    function updateCategoryStatus(newStatus) {

        updateCategoryEndPoint(checkedCategory.join(","), { status: newStatus }).then((data) => {

            let response = data.data;
            console.log(response)
            if (response.status) {
                toast.success("Category update success");
                checkedCategory.forEach((eachItems) => {
                    $(".status_field_" + eachItems).each(function () {
                        $(this).text(newStatus ? "Active" : "In Active")
                    })
                })
            } else {

                toast.error("Something went wrong1")
            }
        }).catch((err) => {
            toast.error("Something went wrong2")
        })
    }

    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2>Manage Category</h2>


                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton isButton={false} className={"green"} title={"Add Category "} icon={"fa-add"} to={"/add_category"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { filtterCategory(true) }} isButton={true} className={"green"} title={"Active Category Only"} icon={"fa-thumbs-up"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { filtterCategory(false) }} isButton={true} className={"red"} title={"In Active Category Only"} icon={"fa-thumbs-down"} />
                            </div>





                        </div>
                    </div>

                    <div className="type_pages_list">



                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={"Delete"} onClickAction={() => { deleteCategory() }} icon={"fa-trash"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-4">
                                <ActionButton className={"green"} title={"Active"} onClickAction={() => { updateCategoryStatus(true) }} icon={"fa-thumbs-up"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={"In Active"} onClickAction={() => { updateCategoryStatus(false) }} icon={"fa-thumbs-down"} />
                            </div>


                        </div>
                    </div>
                    <div className="table_data_check">
                        <div className="table_head_sec">
                            <h2>Manage Stock</h2>
                        </div>



                        <table id="categoryTable" className="display" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Offer </th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categoryList?.map((categoryItem) => {
                                        return (
                                            <tr id={"row_id_" + categoryItem._id}>
                                                <td>
                                                    <input className='check_select' checked={checkedCategory.includes(categoryItem._id)} onChange={() => { toggleCheckedCategory(categoryItem._id) }} type="checkbox" />
                                                </td> 
                                                <td>{categoryItem.name}</td>
                                                <td><img src={const_data.public_image_url + "/" + categoryItem.image} width={"100px"} alt="" /></td>
                                                <td>{categoryItem?.offer}</td>
                                                <td className={"status_field_" + categoryItem._id}>{categoryItem.status ? "Active" : "In Active"}</td>
                                                <td>
                                                    <Link to={`/edit_category/${categoryItem._id}`} className='btn btn-primary'>Edit</Link>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table >



                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageCategory
