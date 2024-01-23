import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import FiltterButton from '../../Components/Button/FiltterButton'
import ActionButton from '../../Components/Button/ActionButton'
import { deleteProducts, getAllProduct, updateManyProduct } from '../../api/api_endpoint';
import 'datatables.net-dt'
import DataTable from 'datatables.net-dt';
import { const_data } from '../../const/const_data';
import $ from 'jquery'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


function ManageProduct() {

    let [allProduct, setAllProduct] = useState([]);
    let [productChecked, setProductChecked] = useState([]);
    let [temporaryProducts, setTemporaryProducts] = useState([]);


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


    useEffect(() => {
        let table = $('#example').DataTable();
        var rows = table.rows().nodes();
        rows.reverse();
        table.clear().rows.add(rows).draw();
    }, [allProduct])


    function updateTableProduct(products) {
        $('#example').DataTable().destroy();
        setAllProduct(products)
    }


    function activeProductOnly() {
        let activeProductOnlyList = temporaryProducts.filter((eachIteam) => eachIteam.status);
        updateTableProduct(activeProductOnlyList);
    }

    function inActiveProductOnly() {
        let inActiveProductOnlyList = temporaryProducts.filter((eachIteam) => eachIteam.status != true);
        updateTableProduct(inActiveProductOnlyList);
    }


    function AllProductsOnly() {
        if (temporaryProducts.length !== allProduct.length) {
            updateTableProduct(temporaryProducts);
        }
    }

    function updateProductList() {

        getAllProduct().then((products) => {
            let response = products?.data;

            if (response.status) {
                let products = response.products;
                console.log(products)
                updateTableProduct(products)
                setTemporaryProducts(products)
            }
        }).catch((err) => {
            console.log("ERROR")
        })
    }

    useEffect(() => {
        updateProductList()
    }, [])


    function updateProductStatus(status) {
        if (checkSelectedCount()) {
            let newStatus = status == "ACTIVE" ? true : false;

            updateManyProduct(productChecked.join(','), { status: newStatus }).then((updated) => {
                let response = updated?.data;
                console.log(response)
                if (response?.status) {
                    toast.success("Product updated success");
                    console.log(productChecked)
                    productChecked.forEach((items) => {
                        let element_id = "product_status_" + items;
                        let element_doc = document.getElementById(element_id);
                        element_doc.innerText = status
                    })
                } else {
                    toast.error("Product updated failed");
                }
            }).catch((err) => {
                console.log(err)
                toast.error("Product updated failed");
            })
        }
    }


    function deleteBulkProduct() {
        if (checkSelectedCount()) {
            deleteProducts(productChecked.join(',')).then((deleted) => {
                let response = deleted?.data;
                if (response?.status) {
                    toast.success("Product deleted success");
                    productChecked.forEach((items) => {
                        document.getElementById("row_id_" + items).remove();
                    })
                } else {
                    toast.error("Product deletion failed");
                }
            }).catch((err) => {
                toast.error("Product deletion failed");
            })
        }
    }


    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton isButton={false} className={"green"} title={"Add Product"} icon={"fa-add"} to={"/add_product"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={AllProductsOnly} isButton={true} className={"green"} title={"All Product"} icon={"fa-list"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={activeProductOnly} isButton={true} className={"green"} title={"Active Product Only"} icon={"fa-thumbs-up"} to={"/add_product"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={inActiveProductOnly} isButton={true} className={"red"} title={"In Active Product Only"} icon={"fa-thumbs-down"} to={"/add_product"} />
                            </div>



                        </div>
                    </div>

                    <div className="type_pages_list">



                        <div className="row rmr">

                            {/* <div class="col-lg-1 col-xs-3 height_control">
                                <input  type="checkbox" class="check_checkbox" id="checkall" />
                            </div> */}


                            <div className="col-lg-2 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={"Delete"} onClickAction={() => { deleteBulkProduct() }} icon={"fa-trash"} />
                            </div>

                            <div className="col-lg-2 col-xs-12 col-sm-4">
                                <ActionButton className={"green"} title={"Active"} onClickAction={() => { updateProductStatus("ACTIVE") }} icon={"fa-thumbs-up"} />
                            </div>

                            <div className="col-lg-2 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={"In Active"} onClickAction={() => { updateProductStatus("INACTIVE") }} icon={"fa-thumbs-down"} />
                            </div>



                        </div>
                    </div>


                    <div className="table_data_check">
                        <div className="table_head_sec">
                            <h2>Manage Product</h2>
                        </div>



                        <table id="example" className="display" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Sale Price</th>
                                    <th>Original Price</th>
                                    <th>Main Image</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allProduct?.map((productItem) => {

                                        return (
                                            <tr id={"row_id_" + productItem._id}>
                                                <td>
                                                    <input className='check_select' checked={productChecked.includes(productItem._id)} onChange={() => { toggleProductCheck(productItem._id) }} type="checkbox" />
                                                </td>
                                                <td>{productItem.name}</td>
                                                <td>{productItem.sale_price}</td>
                                                <td>{productItem.original_price}</td>
                                                <td><img src={const_data.public_image_url + "/" + productItem.images[0]} width={"100px"} alt="" /></td>
                                                <td>{productItem?.category?.name}</td>
                                                <td>{productItem.stock}</td>
                                                <td>
                                                    <p id={"product_status_" + productItem._id}>
                                                        {productItem.status ? "Active" : "In Active"}
                                                    </p>
                                                </td>
                                                <td>
                                                    <Link to={`/edit_product/${productItem._id}`} className='btn btn-primary'>Edit</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/view_single_product/${productItem._id}`} className='btn btn-primary'>View</Link>
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
                                    <th>Sale Price</th>
                                    <th>Original Price</th>
                                    <th>Main Image</th>
                                    <th>Category</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>View</th>
                                </tr>
                            </tfoot>
                        </table >



                    </div>

                </div>
            </div >
        </AdminLayout >
    )
}

export default ManageProduct