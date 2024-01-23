import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { Link, useParams } from 'react-router-dom'
import { getAllOrder, getOrdersByProductId, getSingleProduct } from '../../api/api_endpoint';
import ProfileDataDetails from '../../Components/Reusability/ProfileDataDetails';
import { const_data } from '../../const/const_data';
import ImageGallery from "react-image-gallery";
import Slider from "react-slick";
import $ from 'jquery'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getValidDateFormat } from '../../helper/Helper';

function ViewSingleProduct() {

    let { product_id } = useParams();
    let [product_data, setProductData] = useState(null);
    let [productImages, setProductImages] = useState([]);
    let [thisOrder, setThisOrders] = useState([]);

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    useEffect(() => {
        $('#productOrders').DataTable();
    }, [thisOrder])



    function downloadSalesReport() {

    }


    useEffect(() => {


        getSingleProduct(product_id).then((data) => {
            let response = data?.data;
            console.log(response)
            if (response?.status) {
                console.log(response.product)
                setProductData(response?.product);
                setProductImages(response?.product?.images ?? [])
            }
        }).catch((err) => {
            console.log(err)
        })


        getOrdersByProductId(product_id).then((data) => {
            let response = data?.data;
            if (response.status) {
                $('#productOrders').DataTable().destroy();
                setThisOrders(response?.orders?.reverse());
            }
        }).catch((err) => {

        })

    }, [])




    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                {product_data ? <div className="wrapper_content_body">

                    <h2>View Single Product </h2>




                    <div className="content_box_border">

                        <span className="name_profile">
                            {product_data?.name}
                        </span>

                        <div className="row">
                            <div className="col-md-3 col-xs-12 mt-3">
                                <Slider  {...settings}>
                                    {
                                        productImages.map((eachImages) => {
                                            return (
                                                <div>
                                                    <img src={const_data.public_image_url + "/" + eachImages} className="w-100 img-responsive img-thumbnail" />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                                {/* <img src={const_data.public_image_url + "/" + product_data?.images[0]} className="w-100 img-responsive img-thumbnail" /> */}

                                <div id="#generateSalesReport">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <input type="date"></input>
                                        </div>
                                        <div className="col-md-12">
                                            <input type="date"></input>
                                        </div>
                                    </div>
                                    <button onClick={downloadSalesReport} className="btn btn-success w-100 mt-2">Downalod Sales Report</button>
                                </div>
                            </div>

                            <div className="col-md-9 col-xs-12 mt-3">

                                <ProfileDataDetails
                                    title={"Basic Product Details"}
                                    dataMap={
                                        [

                                            {
                                                key: "Product Name",
                                                value: product_data?.name
                                            }, {
                                                key: "Small Description",
                                                value: product_data?.small_description
                                            }, {
                                                key: "Sales Price",
                                                value: product_data?.sale_price
                                            },
                                            {
                                                key: "Original Price",
                                                value: product_data?.original_price,
                                            },
                                            {
                                                key: "Category",
                                                value: product_data?.category?.name
                                            },
                                            {
                                                key: "Extra Description",
                                                value: product_data?.extra_description
                                            }, {
                                                key: "Key features",
                                                value: product_data?.key_features
                                            },
                                            {
                                                key: "Specification",
                                                value: product_data?.specifications
                                            },
                                            {
                                                key: "Stock",
                                                value: product_data?.stock
                                            },
                                            // {
                                            //     key: "Status",
                                            //     value: product_data?.status
                                            // },
                                            // {
                                            //     key: "Option",
                                            //     value: product_data?.option
                                            // }
                                        ]
                                    }
                                />
                            </div>
                        </div>
                    </div>



                    <div className="row" style={{ padding: "10px" }}>
                        <div className="table_data_check ">
                            <div className="table_head_sec">
                                <h2>User's orderd on this Product</h2>
                            </div>
                            <table id="productOrders" className="display" style={{ width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Order ID</th>
                                        <th>Invoice ID</th>
                                        <th>Order Date</th>
                                        <th>Shipper Name</th>
                                        <th>Total </th>
                                        <th>Status</th>
                                        <th>Payment Type</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        thisOrder?.map((eachItem) => {
                                            return (
                                                <tr>
                                                    <td></td>
                                                    <td>{eachItem.order_id}</td>
                                                    <td>{eachItem.invoice_id}</td>
                                                    <td>{getValidDateFormat(eachItem.order_date)}</td>
                                                    <td>{eachItem.shipper_name}</td>
                                                    <td>{eachItem.total}</td>
                                                    <td>{eachItem.status}</td>
                                                    <td>{eachItem.payment_type}</td>
                                                    <td>
                                                        <Link to={"/view_single_order/" + eachItem._id} className="btn btn-primary">View</Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th>Order ID</th>
                                        <th>Invoice ID</th>
                                        <th>Order Date</th>
                                        <th>Shipper Name</th>
                                        <th>Total </th>
                                        <th>Status</th>
                                        <th>Payment Type</th>
                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                            </table >
                        </div>
                    </div>

                </div>
                    : null
                }

            </div>
        </AdminLayout >
    )
}

export default ViewSingleProduct
