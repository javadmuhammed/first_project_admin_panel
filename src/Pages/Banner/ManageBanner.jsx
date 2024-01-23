import React, { useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { deleteBanners, editBannerEndPoint, getBanner } from '../../api/api_endpoint';
import { const_data } from '../../const/const_data';
import $ from 'jquery'
import FiltterButton from '../../Components/Button/FiltterButton';
import ActionButton from '../../Components/Button/ActionButton';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { renderToString } from 'react-dom/server'

function ManageBanner() {

    let [bannerList, setBannerList] = useState([]);
    let [tempBannerList, setTempBannerList] = useState([]);
    let [selectedBanner, setSelectedBanner] = useState([]);
    let navigate = useNavigate();


    useEffect(() => {
        let table = $("#bannerTable").DataTable();
        var rows = table.rows().nodes();
        rows.reverse();
        table.clear().rows.add(rows).draw();
    }, [bannerList])

    // function tableArrange() {
    //     let table = $("#bannerTable").DataTable();
    //     var rows = table.rows().nodes();
    //     rows.reverse();
    //     table.clear().rows.add(rows).draw();
    // }


    function toggleBannerCheck(checking_id) {
        if (selectedBanner.includes(checking_id)) {
            let newToggle = selectedBanner.filter((each) => each != checking_id);
            setSelectedBanner(newToggle)
        } else {
            setSelectedBanner([...selectedBanner, checking_id])
        }
    }



    // useEffect(() => {

    //     let table = $("#bannerTable").DataTable();
    //     if (bannerList.length === 0) {
    //         return;
    //     } else {
    //         let tableNodes = bannerList.map((eachBanner) => {
    //             return [
    //                 renderToString(<input type="checkbox" checked={selectedBanner.includes(eachBanner._id)} onChange={() => { toggleBannerCheck(eachBanner._id) }} />),
    //                 eachBanner.name,
    //                 eachBanner.url,
    //                 `<img src=${const_data.public_image_url + "/" + eachBanner?.images} width="80px" alt="" />`,
    //                 eachBanner.status ? "Active" : "In Active",
    //                 renderToString(<button onClick={() => redirectEditing(eachBanner._id)} className='btn btn-primary'>Edit</button>)
    //             ];
    //         })
    //         tableNodes.reverse();
    //         table.clear()
    //         table.rows.add(tableNodes).draw();
    //     }
    // }, [bannerList])


    useEffect(() => {
        getBanner().then(async (bannerResponse) => {
            let response = bannerResponse.data;
            if (response.status) {
                $("#bannerTable").DataTable().destroy();
                setBannerList(response.banners);
                setTempBannerList(response.banners)
                // tableArrange()
            }
        }).catch((err) => { })
    }, [])


    function sortBannerList(status) {
        $("#bannerTable").DataTable().destroy();
        if (status === "ALL") {
            setBannerList(tempBannerList)
        } else {
            let filtterData = tempBannerList.filter((eachItem) => eachItem.status == status);
            setBannerList(filtterData)
        }
    }



    function updateBannerStatus(newStatus) {
        editBannerEndPoint({ edit_id: selectedBanner, status: newStatus }).then((data) => {
            let response = data?.data;
            if (response?.status) {
                // alert(selectedBanner.join("-"))
                let newList = bannerList.map((each) => {
                    if (selectedBanner.includes(each._id)) {
                        each.status = newStatus
                    }
                    return each;
                });

                setBannerList(newList)
                toast.success("Banner update success")
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }

    function deleteBanner() {
        deleteBanners(selectedBanner).then((data) => {
            let response = data?.data;
            console.log(response)
            if (response?.status) {
                let table = $("#bannerTable").DataTable();
                table.rows().every(function () { 
                    const rowData = this.id();  
                    if (selectedBanner.includes(rowData)) { 
                        this.remove();
                    } 
                    return true;
                });

                let newList = bannerList.filter((each) => !selectedBanner.includes(each._id))
                setBannerList(newList)

                toast.success("Banner delete success")
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }




    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2>Manage Banner</h2>


                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton isButton={false} className={"green"} title={"Add Banner"} icon={"fa-add"} to={"/add_banner"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { sortBannerList("ALL") }} isButton={true} className={"green"} title={"All Banner"} icon={"fa-list"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { sortBannerList(true) }} isButton={true} className={"green"} title={"Active Banner"} icon={"fa-list"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-6">
                                <FiltterButton onClick={() => { sortBannerList(false) }} isButton={true} className={"green"} title={"In Active Banner"} icon={"fa-list"} />
                            </div>



                        </div>
                    </div>


                    <div className="type_pages_list">
                        <div className="row rmr">

                            <div className="col-lg-3 col-xs-12 col-sm-4 ">
                                <ActionButton className={"red"} title={'DELETE'} onClickAction={() => { deleteBanner() }} icon={"fa-trash"} />
                            </div>


                            <div className="col-lg-3 col-xs-12 col-sm-4 ">
                                <ActionButton className={"green"} title={'Active'} onClickAction={() => { updateBannerStatus(true) }} icon={"fa-thumbs-up"} />
                            </div>

                            <div className="col-lg-3 col-xs-12 col-sm-4">
                                <ActionButton className={"red"} title={'In Active'} onClickAction={() => { updateBannerStatus(false) }} icon={"fa-thumbs-down"} />
                            </div>

                        </div>
                    </div>


                    <div className="table_data_check">
                        <div className="table_head_sec">
                            <h2>Manage Stock</h2>
                        </div>



                        <table id="bannerTable" className="display" style={{ width: "100%" }}>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>URL</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>    
                            <tbody>
                                {
                                    bannerList.map((eachBanner) => {
                                        return (
                                            <tr id={eachBanner._id}>
                                                <td><input type="checkbox" checked={selectedBanner.includes(eachBanner._id)} onChange={() => { toggleBannerCheck(eachBanner._id) }} /></td>
                                                <td>{eachBanner.name}</td>
                                                <td>{eachBanner.url}</td>
                                                <td><img src={const_data.public_image_url + "/" + eachBanner?.images} width="80px" alt="" /></td>
                                                <td>{eachBanner.status ? "Active" : "In Active"}</td>
                                                <td>
                                                    <a href={"edit_banner/" + eachBanner._id} className='btn btn-primary'>Edit</a>
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
                                    <th>URL</th>
                                    <th>Image</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>



                    </div>


                </div>
            </div>


            <script>


            </script>
        </AdminLayout>
    )
}

export default ManageBanner
