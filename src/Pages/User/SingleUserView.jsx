import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import ProfileDataDetails from '../../Components/Reusability/ProfileDataDetails'
import { Link, useParams } from 'react-router-dom';
import { getSingleUser, getUserOrder } from '../../api/api_endpoint';
import { const_data } from '../../const/const_data';
import $ from 'jquery'
import { getValidDateFormat } from '../../helper/Helper';

function SingleUserView() {

    let { user_id } = useParams();
    let [thisUser, setThisUser] = useState(null);
    let [userOrders, setUserOrder] = useState([])


    useEffect(() => {
        $("#userOrders").DataTable()
    }, [userOrders])

    function setOrdersDataToTable(orders) {
        setUserOrder(orders)

    }

    function fetchThisUserOrder() {
        getUserOrder(user_id).then((data) => {
            let response = data?.data;
            if (response?.status) {
                let orders = response?.orders
                setOrdersDataToTable(orders)
            }
        }).catch((err) => { })
    }

    useEffect(() => {
        getSingleUser(user_id).then((data) => {
            let response = data?.data;
            if (response?.status) {
                let user = response?.user;
                $("#userOrders").DataTable().destroy();
                setThisUser(user)
                fetchThisUserOrder()
            }
        }).catch((err) => { })
    }, [])

    // useEffect(() => {
    //     $("#userOrders").DataTable();
    // }, [userOrders])




    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                {thisUser ? <div className="wrapper_content_body">
                    <h2> {thisUser?.first_name + " " + thisUser?.last_name}  Profile</h2>



                    <div className="content_box_border">

                        <span className="name_profile">
                            {thisUser?.first_name + " " + thisUser?.last_name} <em>Username   : {thisUser?.username} </em>
                        </span>

                        <div className="row">
                            <div className="col-md-3 col-xs-12 mt-3">

                                <div>
                                    <img src={!thisUser?.profile ? "assets/images/male.png" : const_data.user_profile_path + "/" + thisUser?.profile} className="w-100 img-responsive img-thumbnail" />
                                </div>

                                {/* <a href="" className="btn btn-success w-100 mt-2">Downalod Sales Report</a> */}
                            </div>

                            <div className="col-md-9 col-xs-12 mt-3">

                                <ProfileDataDetails
                                    title={"Basic Product Details"}
                                    dataMap={
                                        [

                                            {
                                                key: "First Name",
                                                value: thisUser?.first_name
                                            }, {
                                                key: "Last name",
                                                value: thisUser?.last_name
                                            },
                                            {
                                                key: "Username",
                                                value: thisUser?.username
                                            },
                                            {
                                                key: "Email Address",
                                                value: thisUser?.email
                                            },
                                            {
                                                key: "Mobile Number",
                                                value: thisUser?.mobile,
                                            },
                                            {
                                                key: "Wallet Amount",
                                                value: thisUser?.wallet_amount
                                            },
                                            {
                                                key: "User Joined Date",
                                                value: getValidDateFormat(thisUser?.joining_date)
                                            }, {
                                                key: "Referal Code",
                                                value: thisUser?.referal_code
                                            },
                                            {
                                                key: "Number of order placed",
                                                value: thisUser?.number_orders_placed
                                            },
                                            {
                                                key: "Status",
                                                value: thisUser?.status ? "Active" : "In Active"
                                            },
                                            {
                                                key: "Number of coupen applied",
                                                value: thisUser?.applied_coupen?.length ?? 0
                                            },

                                        ]
                                    }
                                />
                            </div>
                        </div>

                        <div className="row" style={{ padding: "10px" }}>
                            <div className="table_data_check ">
                                <div className="table_head_sec">
                                    <h2>{thisUser?.first_name + " " + thisUser?.last_name} Orders</h2>
                                </div>
                                <table id="userOrders" className="display" style={{ width: "100%" }}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Order ID</th>
                                            <th>Order Date</th>
                                            <th>Shipper Name</th>
                                            <th>Total</th>
                                            <th>Invoice Number </th>
                                            <th>Status</th>
                                            <th>Payment Type</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            userOrders?.map((eachItem) => {
                                                return (
                                                    <tr>
                                                        <td></td>
                                                        <td>{eachItem.order_id}</td>
                                                        <td>{getValidDateFormat(eachItem.order_date)}</td>
                                                        <td>{eachItem?.shipper_name}</td>
                                                        <td>{eachItem.total}</td>
                                                        <td>{eachItem.invoice_number}</td>
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
                                            <th>Order Date</th>
                                            <th>Shipper Name</th>
                                            <th>Total</th>
                                            <th>Invoice Number </th>
                                            <th>Status</th>
                                            <th>Payment Type</th>
                                            <th>Action</th>

                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div> : null
                }

            </div>
        </AdminLayout>
    )
}

export default SingleUserView
