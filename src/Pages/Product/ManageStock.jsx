import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { getOutofStockItems, updateManyProduct } from '../../api/api_endpoint';
import $ from 'jquery'
import { const_data } from '../../const/const_data';
import { Link } from 'react-router-dom';
import ActionButton from '../../Components/Button/ActionButton';
import FiltterButton from '../../Components/Button/FiltterButton';
import { toast } from 'react-toastify';


function ManageStock() {

    let [stockList, setStockList] = useState([]);
    let [tempStockList, setTempStockList] = useState([]);
    let [productChecked, setProductChecked] = useState([]);


    function checkSelectedCount() {
        if (productChecked?.length < 1) {
            toast.error("Please select any records");
            return false;
        }
        return true;
    }


    function toggleProductCheck(product_id) {
        if (productChecked.includes(product_id)) {
            setProductChecked(productChecked.filter((checked) => checked != product_id));
        } else {
            setProductChecked([...productChecked, product_id])
        }
    }


    function filtterStockProduct(fromStock, toStock) { 

        let fillterItems = tempStockList.filter((items) => (items.stock <= fromStock && items.stock >= toStock));
         $('#stockListTable').DataTable().destroy()
        setStockList(fillterItems)
    }

    useEffect(() => {
        let table = $('#stockListTable').DataTable();
        var rows = table.rows().nodes();
        rows.reverse();
        table.clear().rows.add(rows).draw();
    }, [stockList])

    useEffect(() => {
        getOutofStockItems().then((outOfStockItems) => {
            let response = outOfStockItems.data;
            if (response.status) {
                $('#stockListTable').DataTable().destroy();
                setStockList(response.products)
                setTempStockList(response.products)
            }
        }).catch((err) => {

        })
    }, [])


    function updateStocktems(stockItem) {

        if (checkSelectedCount()) {
            updateManyProduct(productChecked.join(","), { stock: stockItem }).then((status) => {
                if (status?.status) {
                    toast.success("Stock update success");
                    productChecked.forEach((eachId) => {
                        document.getElementById("row_id_" + eachId).remove()
                    })
                } else {
                    toast.error("Something went wrong")
                }
            }).catch((err) => {
                toast.error("Something went wrong")
            })
        }
    }



    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2>Manage Stock</h2>


                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton isButton={false} className={"green"} title={"Add Product"} icon={"fa-add"} to={"/add_product"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { filtterStockProduct(50,0) }} isButton={true} className={"green"} title={"Reset Sort"} icon={"fa-list"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { filtterStockProduct(0, 0) }} isButton={true} className={"green"} title={"Out Of Stocks only"} icon={"fa-list"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { filtterStockProduct(50, 1) }} isButton={true} className={"green"} title={"Limited Stock"} icon={"fa-thumbs-up"} to={"/add_product"} />
                            </div>





                        </div>
                    </div>

                    <div className="type_pages_list">



                        <div className="row rmr">

                            {/* <div class="col-lg-1 col-xs-3 height_control">
                                <input  type="checkbox" class="check_checkbox" id="checkall" />
                            </div> */}


                            {
                                [60, 100, 500, 1000, 2000].map((eachItem) => {
                                    return (
                                        <div className="col-lg-3 col-xs-12 col-sm-4 mb-3">
                                            <ActionButton className={"green"} title={"Update Stock (" + eachItem + ")"} onClickAction={() => { updateStocktems(eachItem) }} icon={"fa-list"} />
                                        </div>
                                    )
                                })

                            }





                        </div>
                    </div>


                    <div className="table_data_check">
                        <div className="table_head_sec">
                            <h2>Manage Stock</h2>
                        </div>



                        <table id="stockListTable" className="display" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Stock</th>
                                    <th>Stock Status</th>
                                    <th>Main Image</th>
                                    <th>Category</th>
                                    <th>Sale Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stockList?.map((productItem) => {
                                        console.log(productItem)
                                        return (
                                            <tr id={"row_id_" + productItem._id}>
                                                <td>
                                                    <input className='check_select' checked={productChecked.includes(productItem._id)} onChange={() => { toggleProductCheck(productItem._id) }} type="checkbox" />
                                                </td>
                                                <td>{productItem.name}</td>
                                                <td>{productItem.stock}</td>
                                                <td>{productItem.stock <= 0 ? "Out Of Stock" : "Limited Stock"}</td>
                                                <td><img src={const_data.public_image_url + "/" + productItem.images[0]} width={"100px"} alt="" /></td>
                                                <td>{productItem?.category?.name}</td>
                                                <td>{productItem.sale_price}</td>
                                                <td>
                                                    <p id={"product_status_" + productItem._id}>
                                                        {productItem.status ? "Active" : "In Active"}

                                                    </p>
                                                </td>
                                                <td>
                                                    <Link to={`/edit_product/${productItem._id}`} className='btn btn-primary'>Edit</Link>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Stock</th>
                                    <th>Stock Status</th>
                                    <th>Main Image</th>
                                    <th>Category</th>
                                    <th>Sale Price</th>
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

export default ManageStock
