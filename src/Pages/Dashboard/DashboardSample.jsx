import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../Components/Partials/AdminLayout';
import SiteStatics from '../../Components/Parts/SiteStatics';
import CardUserProfile from '../../Components/Util/CardUserProfile';
import CanvasJSReact from '@canvasjs/react-charts'
import { getSiteStatics } from '../../api/api_endpoint';

function Dashboard() {

    let CanvasJS = CanvasJSReact.CanvasJS;
    let CanvasJSChart = CanvasJSReact.CanvasJSChart;

    let [siteStatics, setSiteStatics] = useState({});
    let [usersGraph, setOption] = useState({
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
            text: "User's Graph"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: siteStatics?.user_graph?.map((eachUser, index) => ({ label: "D" + (index + 1), y: eachUser?.count })) ?? []
        }]
    })

    useEffect(() => {
        getSiteStatics().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let statics = response.data;
                setSiteStatics(statics);
            
                const newGraphDataPoints = statics?.user_graph?.map((eachUser, index) => ({
                    label: "D" + (index + 1),
                    y: eachUser?.count
                }
                )) || [];
            
                setOption(prevOption => ({
                    ...prevOption,
                    data: {
                        ...prevOption.data,
                        dataPoints: newGraphDataPoints
                    }
                }));
            }
            
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        let dt = 
        console.log(usersGraph)
    }, [siteStatics])

    //const options = 

    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">

                    <SiteStatics></SiteStatics>

                    <div className="recennt_joings">
                        <h4>Recent Orders</h4>

                        <div className="drop_listbox" id="remove_droplist_seeker">
                            <div className="listbox_web">
                                <h4>Latest Orders</h4>
                                <div className="collaps_right_box">
                                    <span>12 latest members</span>
                                    <button className="collaps_btn hide_seekerlist_drop"
                                        data-widget="dropwrapper_collapse_control">-</button>
                                    <button className="collaps_btn remove_seekerlist_drop"
                                        data-widget="remove_droplist_seeker">x</button>
                                </div>

                            </div>
                            <div className="list_drop_wrapper" id="dropwrapper_collapse_control">
                                <ul className="list_ul_drop">
                                    <li className="col-xs-6 col-md-3 col-lg-2 col-6">
                                        <CardUserProfile></CardUserProfile>
                                    </li>
                                    <li className="col-xs-6 col-md-3 col-lg-2 col-6">
                                        <CardUserProfile></CardUserProfile>
                                    </li>
                                    <li className="col-xs-6 col-md-3 col-lg-2 col-6">
                                        <CardUserProfile></CardUserProfile>
                                    </li>
                                    <li className="col-xs-6 col-md-3 col-lg-2 col-6">
                                        <CardUserProfile></CardUserProfile>
                                    </li>

                                    <li className="col-xs-6 col-md-3 col-lg-2 col-6">
                                        <CardUserProfile></CardUserProfile>
                                    </li>
                                    <li className="col-xs-6 col-md-3 col-lg-2 col-6">
                                        <CardUserProfile></CardUserProfile>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div className='mt-3'>
                                <CanvasJSChart options={usersGraph}

                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='mt-3'>
                                <CanvasJSChart options={usersGraph}

                                />
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        </AdminLayout >
    )
}

export default Dashboard;
