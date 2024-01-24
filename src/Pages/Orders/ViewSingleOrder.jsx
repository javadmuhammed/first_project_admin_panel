import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import ProfileDataDetails from '../../Components/Reusability/ProfileDataDetails'
import { downloadInvoiceEndPoint, getSingleOrder, updateOrderStatusEndPoint } from '../../api/api_endpoint'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { const_data } from '../../const/const_data'
import ActionButton from '../../Components/Button/ActionButton'
import { toast } from 'react-toastify'
import { getNextOrderStatus, getValidDateFormat } from '../../helper/Helper'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css';

function ViewSingleOrder() {

    let { order_id } = useParams();
    let navigate = useNavigate();
    let [thisOrder, setThisOrder] = useState(null);

    let [status, setStatus] = useState(const_data.ORDER_STATUS)
    let [nextStatus, setNextStatus] = useState([]);


    useEffect(() => {

        let orderStatusAsArray = Object.values(const_data.ORDER_STATUS);
        let indexOfCurrentStatus = orderStatusAsArray.slice(orderStatusAsArray.indexOf(thisOrder?.status), orderStatusAsArray.length);
        setStatus(indexOfCurrentStatus)



        getSingleOrder(order_id).then((data) => {
            let response = data.data;
            if (response.status) {
                console.log(response.order)
                let nextStatus = getNextOrderStatus(response?.order?.status)
                setThisOrder(response.order)
                setNextStatus(nextStatus);

            } else {
                navigate("/manage_orders");
            }
        }).catch((err) => {
            navigate("/manage_orders");
        })
    }, []);


    function updateOrderStatus(newStatus) {
 

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            overlayClassName: "alert-confirm-overlay",
            buttons: [
                {
                    label: 'Yes',
                    onClick: function () {
                        updateOrderStatusEndPoint(order_id, newStatus).then((data) => {
                            let response = data.data;
                            if (response.status) {
                                toast.success("Order Update Success")
                                document.getElementById("status_field").innerText = newStatus;
                                let nextStatus = getNextOrderStatus(const_data.ORDER_STATUS[newStatus])
                                setNextStatus(nextStatus);
                            } else {
                                toast.error(response.msg)
                            }
                        }).catch((err) => { 
                            console.log("The error is" + err)
                            toast.error("Something went wrong")
                        })
                    }
                },
                {
                    label: 'No',
                    onClick: function () {
                        return;
                    }
                }
            ]
        });

    }


    function downloadInvoice() {
        downloadInvoiceEndPoint(order_id).then((downloadUrl) => {
            console.log(downloadUrl.data)
            let data = downloadUrl.data;
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            let objectUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = objectUrl;
            a.download = 'product_invoice.pdf';
            a.click();
        }).catch((err) => {
            console.log(err)
        })
    }





    return (
        <AdminLayout>


            <div className="content_body" id="content_body">
                {thisOrder ? <div className="wrapper_content_body">

                    <h2>View Single Order    </h2>
                    <p>Update Order Status</p>
                    {
                        nextStatus?.length <= 0 ? null :
                            <div className="type_pages_list">

                                <div className="row rmr">
                                    {/* 
                                    {
                                        Object.keys(const_data.ORDER_STATUS)?.map((items) => {
                                            return (
                                                <div className="col-lg-3 col-xs-12 col-sm-4 mb-3">
                                                    <ActionButton className={"green"} title={items} onClickAction={() => { updateOrderStatus(items) }} icon={"fa-list"} />
                                                </div>
                                            )
                                        })
                                    } */}


                                    {
                                        nextStatus?.map((items) => {
                                            return (
                                                <div className="col-lg-3 col-xs-12 col-sm-4">
                                                    <ActionButton needAlert={false} className={"green"} title={const_data.ORDER_STATUS[items]} onClickAction={() => {
                                                   
                                                        updateOrderStatus(items)
                                                        // setNextOrderStatus(items)

                                                    }} icon={"fa-list"} />
                                                </div>
                                            )
                                        })
                                    }



                                </div>
                            </div>
                    }

                    <div className="content_box_border">

                        <span className="name_profile">
                            {thisOrder?.product?.name} <em>Quantity : {thisOrder?.products?.quantity} </em>
                        </span>

                        <div className="row">
                            <div className="col-md-3 col-xs-12 mt-3">
                                <img src={const_data.public_image_url + "/" + thisOrder?.product?.images[0]} className="w-100 img-responsive img-thumbnail" />
                                <a href="javascript:;" onClick={downloadInvoice} className="btn btn-success w-100 mt-2">Downalod Invoice</a>
                                <Link to={"/view_single_product/" + thisOrder?.product?._id} className="btn btn-success w-100 mt-2">View Product</Link>

                            </div>

                            <div className="col-md-9 col-xs-12 mt-3">

                                <ProfileDataDetails
                                    title={"Basic Order Details"}
                                    dataMap={
                                        [
                                            {
                                                key: "Order ID",
                                                value: thisOrder?.order_id
                                            },
                                            {
                                                key: "Order Date",
                                                value: getValidDateFormat(thisOrder?.order_date)
                                            }, {
                                                key: "Shipper Name",
                                                value: thisOrder?.shipper_name
                                            }, {
                                                key: "Total",
                                                value: thisOrder?.total
                                            }, {
                                                key: "Status",
                                                value: thisOrder?.status,
                                                id: "status_field",
                                            }, {
                                                key: "Payment Type",
                                                value: thisOrder?.payment_type
                                            }, {
                                                key: "Delivery Time",
                                                value: thisOrder?.delivery_time
                                            },
                                            {
                                                key: "Product Variation",
                                                value: thisOrder?.products?.variation + "Kg"
                                            }

                                        ]
                                    }
                                />


                                <div className='mt-3'>
                                    <ProfileDataDetails
                                        title={"Product Details"}
                                        dataMap={
                                            [
                                                {
                                                    key: "Product Name",
                                                    value: thisOrder?.product?.name
                                                }, {
                                                    key: "Sale Price (Current)",
                                                    value: thisOrder?.product?.sale_price
                                                }, {
                                                    key: "Original Price (Current)",
                                                    value: thisOrder?.product?.original_price
                                                },
                                                // {
                                                //     key: "Category",
                                                //     value: thisOrder?.product?.category
                                                // },
                                            ]
                                        }
                                    />
                                </div>

                                <div className='mt-3'>
                                    <ProfileDataDetails
                                        title={"Address Details"}
                                        dataMap={
                                            [
                                                {
                                                    key: "Type",
                                                    value: thisOrder?.address?.type
                                                },
                                                {
                                                    key: "Name",
                                                    value: thisOrder?.address?.name
                                                }, {
                                                    key: "House name",
                                                    value: thisOrder?.address?.house_name
                                                }, {
                                                    key: "City/Town/District",
                                                    value: thisOrder?.address?.city_town_dist
                                                },
                                                {
                                                    key: "State",
                                                    value: thisOrder?.address?.state
                                                },
                                                {
                                                    key: "Address",
                                                    value: thisOrder?.address?.address,

                                                },
                                                {
                                                    key: "Pincode",
                                                    value: thisOrder?.address?.pincode
                                                },
                                                {
                                                    key: "Landmark",
                                                    value: thisOrder?.address?.landmark
                                                },
                                                {
                                                    key: "Phone number",
                                                    value: thisOrder?.address?.phone_number
                                                },
                                                {
                                                    key: "Email",
                                                    value: thisOrder?.address?.email
                                                },
                                                {
                                                    key: "Altranative Phone",
                                                    value: thisOrder?.address?.alternative_phone
                                                }
                                            ]
                                        }
                                    />
                                </div>


                                <div className='mt-3'>
                                    <ProfileDataDetails
                                        title={"User Details"}
                                        dataMap={
                                            [
                                                {
                                                    key: "Username",
                                                    value: thisOrder?.user?.username
                                                },
                                                {
                                                    key: "Email",
                                                    value: thisOrder?.user?.email
                                                }, {
                                                    key: "Mobile",
                                                    value: thisOrder?.user?.mobile
                                                }, {
                                                    key: "Fullname",
                                                    value: thisOrder?.user?.first_name + " " + thisOrder?.user?.last_name
                                                }
                                            ]
                                        }
                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                </div> : null
                }
            </div>
        </AdminLayout>
    )
}

export default ViewSingleOrder
