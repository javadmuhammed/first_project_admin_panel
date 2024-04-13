import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { getAllOrder } from '../../api/api_endpoint';
import $ from 'jquery'
import FiltterButton from '../../Components/Button/FiltterButton';
import { const_data } from '../../const/const_data';
import { Link } from 'react-router-dom';
import { getValidDateFormat } from '../../helper/Helper';

function ManageOrders() {

    let [orderList, setOrderList] = useState([]);
    let [orderChecked, setOrderChecked] = useState([])
    let [TempOrderChecked, setTempOrderChecked] = useState([])


    useEffect(() => {
        let table = $('#orderTable').DataTable();
    }, [orderList])


    useEffect(() => { 

        getAllOrder().then((response) => {
            let response_data = response?.data;
            console.log(response_data)
            if (response_data?.status) {
                $('#orderTable').DataTable().destroy();
                console.log(response_data.orders)
                setOrderList(response_data.orders)
                setTempOrderChecked(response_data.orders)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    function toggleOrderChecked(order_id) {
        if (orderChecked.includes(order_id)) {
            setOrderChecked(orderChecked.filter((checked) => checked != order_id));
        } else {
            setOrderChecked([...orderChecked, order_id])
        }
    }

    function filtterOrder(newStatus) {
        
        if (newStatus == "ALL") {
            $('#orderTable').DataTable().destroy();
            setOrderList(TempOrderChecked)
        } else {
            let statusMatched = TempOrderChecked.filter((items) => items.status === newStatus);
            console.log(statusMatched)
            $('#orderTable').DataTable().destroy();
            setOrderList(statusMatched.reverse())
        }
    }

    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">

                    <h2>Manage Orders</h2>



                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-6 mb-2">
                                <FiltterButton onClick={() => { filtterOrder("ALL") }} isButton={true} className={"green"} title={"ALL"} icon={"fa-list"} />
                            </div>

                            {
                                Object.values(const_data.ORDER_STATUS).map((items) => {
                                    return (<div className="col-lg-3 col-xs-12 col-sm-6 mb-2">
                                        <FiltterButton onClick={() => { filtterOrder(items) }} isButton={true} className={"green"} title={items} icon={"fa-list"} />
                                    </div>
                                    )
                                })
                            }


                        </div>
                    </div>


                    <div className="table_data_check mt-2">
                        <div className="table_head_sec">
                            <h2>Manage Order</h2>
                        </div>

                        <table id="orderTable" className="display" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Shipper Name</th>
                                    <th>Total</th>
                                    <th>Status</th> 
                                    <th>Delivery Time</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderList?.map((orderItem) => {
                                        return (
                                            <tr id={"row_id_" + orderItem._id}>
                                                <td>
                                                    <input className='check_select' checked={orderChecked.includes(orderItem._id)} onChange={() => { toggleOrderChecked(orderItem._id) }} type="checkbox" />
                                                </td>
                                                <td>{orderItem.order_id}</td>
                                                <td>{getValidDateFormat(orderItem.order_date)}</td>
                                                <td>{orderItem.shipper_name}</td>
                                                <td>{Number(orderItem.total).toFixed(2)}</td>
                                                <td>{orderItem.status}</td> 
                                                <td>{orderItem.delivery_time}</td>
                                                <td><Link to={"/view_single_order/" + orderItem._id} className='btn btn-primary'>View</Link></td>
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
                                    <th>Status</th> 
                                    <th>Delivery Time</th>
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

export default ManageOrders
