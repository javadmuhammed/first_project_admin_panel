import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import FiltterButton from '../../Components/Button/FiltterButton'
import ActionButton from '../../Components/Button/ActionButton'
import { delete_user, getAllUsers, updateUsers } from '../../api/api_endpoint'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import { toast } from 'react-toastify'


function ManageUsers() {

    let [allUsers, setAllUsers] = useState([])
    let [tempUsers, setTempUsers] = useState([])
    let [userChecked, setUserChecked] = useState([])


    
    function updateUsersTable(users) {
        $("#userTable").DataTable().destroy()
        setAllUsers(users)
    }

    useEffect(() => {
        $("#userTable").DataTable()
    }, [allUsers])


    useEffect(() => {
        getAllUsers().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let users = response?.users;
                updateUsersTable(users)
                setTempUsers(users)
            }
        }).catch((err) => { })
    }, [])


    function filtterUsers(status) {
        if (status === "ALL") {
            updateUsersTable(tempUsers)
        } else if (status) {
            let filtterActiveUsers = tempUsers.filter((each) => each.status)
            updateUsersTable(filtterActiveUsers)
        } else {
            let filtterActiveUsers = tempUsers.filter((each) => !each.status)
            updateUsersTable(filtterActiveUsers)
        }
    }


    function safeDeleteUser() {
        delete_user(userChecked).then((data) => {
            let response = data?.data;
            if (response?.status) {
                toast.success("User delete success")

                let newUsers = tempUsers.filter((each) => !userChecked.includes(each._id))
                updateUsersTable(newUsers)
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => toast.error("Something went wrong"))
    }

    function updateUserStatus(newStatus) {
        updateUsers(userChecked, { status: newStatus }).then((data) => {
            let response = data?.data;
            if (response?.status) {
                toast.success("User update success")

                let newUsers = tempUsers.map((each) => {
                    console.log(each)
                    if (userChecked.includes(each?._id)) {
                        each.status = newStatus;
                    }

                    return each
                })
                updateUsersTable(newUsers)
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => toast.error("Something went wrong"))
    }


    function toggleUserChecked(user_id) {
        if (userChecked.includes(user_id)) {
            setUserChecked(userChecked.filter((checked) => checked != user_id));
        } else {
            setUserChecked([...userChecked, user_id])
        }
    }



    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2> Manage Users</h2>
                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton className={"green"} title={"Add User"} icon={"fa-add"} to={"/add_user"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => filtterUsers("ALL")} isButton={true} className={"green"} title={"All Users"} icon={"fa-list"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton isButton={true} onClick={() => filtterUsers(true)} className={"green"} title={"Active Users Only"} icon={"fa-thumbs-up"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => filtterUsers(false)} isButton={true} className={"red"} title={"In Active Users Only"} icon={"fa-thumbs-down"} />
                            </div>



                        </div>

                    </div>


                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-2 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={"Delete user"} onClickAction={() => { safeDeleteUser() }} icon={"fa-trash"} />
                            </div>

                            <div className="col-lg-2 col-xs-12 col-sm-4">
                                <ActionButton className={"green"} title={"Active"} onClickAction={() => { updateUserStatus(true) }} icon={"fa-thumbs-up"} />
                            </div>

                            <div className="col-lg-2 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={"In Active"} onClickAction={() => { updateUserStatus(false) }} icon={"fa-thumbs-down"} />
                            </div>
                        </div>
                    </div>

                    <div className="table_data_check">
                        <div className="table_head_sec">
                            <h2>Manage User</h2>
                        </div>



                        <table id="userTable" className="display" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allUsers?.map((eachUser) => {
                                        return (
                                            <tr id={"row_id_" + eachUser._id}>
                                                <td>
                                                    <input className='check_select' checked={userChecked.includes(eachUser._id)} onChange={() => { toggleUserChecked(eachUser._id) }} type="checkbox" />
                                                </td>
                                                <td>{eachUser.first_name}</td>
                                                <td>{eachUser.last_name}</td>
                                                <td>{eachUser.mobile}</td>
                                                <td>{eachUser?.email}</td>
                                                <td>
                                                    {eachUser.status ? "Active" : "In Active"}
                                                </td>
                                                <td>
                                                    <Link to={`/edit_user/${eachUser._id}`} className='btn btn-primary'>Edit</Link>
                                                </td>
                                                <td>
                                                    <Link to={`/view_single_user/${eachUser._id}`} className='btn btn-primary'>View</Link>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th></th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>View</th>
                                </tr>
                            </tfoot>
                        </table>



                    </div>

                </div>
            </div>
        </AdminLayout>
    )
}

export default ManageUsers
