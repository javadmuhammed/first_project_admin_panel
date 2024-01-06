import React from "react";
import { useEffect, useState } from 'react'; 
import AdminLayout from '../../Components/Partials/AdminLayout';
import SiteStatics from '../../Components/Parts/SiteStatics';
import CardUserProfile from '../../Components/Util/CardUserProfile';

import { getSiteStatics } from '../../api/api_endpoint';
import { const_data, getAvtarImage } from '../../const/const_data';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Label, BarChart, Legend, Bar } from "recharts";
import { getValidDateFormat } from "../../helper/Helper";
import ModalItem from "../../Components/modal/ModalItem";


function Dashboard() {



    let [siteStatics, setSiteStatics] = useState({});
    let [categoryPieColor, setCategoryPieColor] = useState([])


    let [isFilterModalOpen, setIsFilterModalOpen] = useState(false);



    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    let [chartType, setChartType] = useState(const_data.CHART_TYPE.YEARLY)
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    let [userGraphData, setUserGraphData] = useState([])
    let [orderGraphData, setOrderGraphData] = useState([])
    let [categoryGraphDate, setCategoryGraphDate] = useState([])
    let [siteStatic, setSiteStatic] = useState();
    let [userList, setUserList] = useState([]);

    useEffect(() => {

        let startDateWithFormat = startDate == null ? null : getValidDateFormat(startDate)
        let endDateWithFormat = endDate == null ? null : getValidDateFormat(endDate)

        getSiteStatics(startDateWithFormat, endDateWithFormat, chartType).then((data) => {
            let response = data?.data;

            if (response?.status) {
                let statics = response?.data;
                setUserGraphData(statics?.users_graph)
                setOrderGraphData(statics?.orders)
                setCategoryGraphDate(statics?.category)
                setUserList(statics?.users)
                setSiteStatic(statics?.site_statics)

                console.log(statics)
            }
        }).catch((err) => {
            console.log(err);
        })
    }, [startDate, endDate,chartType])







    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };



    return (
        <AdminLayout>
            <ModalItem isOpen={isFilterModalOpen} title={"Select filter date"} onClose={() => { setIsFilterModalOpen(false) }} onSave={() => { setIsFilterModalOpen(false)}} width="auto" isCenter={true}>
                <div>
                    <div>
                        <DatePicker selected={startDate}
                            onChange={onChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            inline>

                        </DatePicker>
                    </div>
                    <div> 
                        <select onChange={(e)=> setChartType(e.target.value)}>
                            {
                                Object.values(const_data.CHART_TYPE).map((each) => {
                                    return <option value={each}>{each}</option>
                                })
                            }

                        </select>
                    </div>
                </div>
            </ModalItem>
            <div className="content_body" id="content_body">

                <div className="editTriggerButton" onClick={() => setIsFilterModalOpen(true)}>
                    <i class="fa-solid fa-gear"></i>
                </div>

                <div className="wrapper_content_body">




                    <div className="row mb-3">
                        <SiteStatics statics={siteStatic}></SiteStatics>
                    </div>

                    <div className="recennt_joings mb-5 row">

                        <div className="col-md-6">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <h5 className="mb-3">Users Statics</h5>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart
                                        width={500}
                                        height={200}
                                        data={userGraphData}
                                        syncId="userGraphSync"
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>

                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="shadow p-3 mb-5 bg-white rounded">
                                <h5 className="mb-3">Orders Statics</h5>
                                <ResponsiveContainer width="100%" height={200}>
                                    <AreaChart
                                        width={500}
                                        height={200}
                                        data={orderGraphData}
                                        syncId="orderGraphSync"
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="date" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
                                    </AreaChart>
                                </ResponsiveContainer>

                            </div>
                        </div>
 
                        <div className="col-md-6">
                            <div className="shadow p-3  bg-white rounded">
                                <h5 className="mb-3">Category Statics</h5>
                                 
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart
                                        data={categoryGraphDate}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                        barSize={20}
                                    >
                                        <XAxis dataKey="name" />
                                        <YAxis domain={[0, 'dataMax + 5']} />
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="count" fill="#8884d8" />
                                    </BarChart>
                                </ResponsiveContainer>


                            </div>
                        </div>
 
                    </div>




                    <div className="recennt_joings">
                        <h4>Recent Users</h4>

                        <div className="drop_listbox" id="remove_droplist_seeker">
                            <div className="listbox_web">
                                <h4>Latest Users</h4>
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
                                    {
                                        userList?.slice(0, 12).map((eachUser) => {
                                            return (
                                                <li className="col-xs-6 col-md-4 col-lg-3 col-6">
                                                    <CardUserProfile email={eachUser?.email} id={eachUser._id} name={eachUser?.first_name + " " + eachUser?.last_name} phone={eachUser?.phone} profile={eachUser?.profile == null ? getAvtarImage() : const_data.user_profile_path + "/" + eachUser?.profile} username={eachUser?.username}     ></CardUserProfile>
                                                </li>
                                            )
                                        })
                                    }


                                </ul>
                            </div>
                        </div>
                    </div>

                   

                </div>


            </div>
        </AdminLayout>
    )
}

export default Dashboard;
