import React, { Fragment, useEffect, useState } from 'react'
import SideBar from './SideBar'
import SelectImage from '../ImageModel/Component/SelectImage'
import UploadImage from '../ImageModel/UploadImage'
import { Link, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Util/LoadingSpinner';

function AdminLayout({ children }) {


    const { pathname } = useLocation();
    let [isLoading,setLoading] = useState(true);

    var loadScript = function (src) {
        var tag = document.createElement('script');
        tag.async = false;
        tag.src = src;
        console.log(tag)
        document.body.appendChild(tag);
    }

    useEffect(() => {
        loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js")
        loadScript("assets/script/ImagePopUpTop.js");
        loadScript("plugin/table/datatables.js");
        loadScript("assets/script/script.js");
        loadScript("assets/script/ImagePopUpBelow.js");
    }, [])

    useEffect(() => {
        setLoading(false)
    }, [])



    return (
        <Fragment>
            <UploadImage></UploadImage>

            <LoadingSpinner isShow={isLoading}></LoadingSpinner>

            <div className="header_admin">
                <Link to="/" className="header_heading">
                    <span>Control</span> Panel
                </Link>
                <nav className="head_nav">
                    <a href="javascript:;">
                        <i id="asidebard_btn" className="fa-solid fa-bars"></i>
                    </a>
                    <ul>
                    
                        <li className="removeres">HELLO, JAWAD</li>
                        <li><i className="fa-solid fa-laptop"></i> FRONT END</li>
                        <li><i className="fa-solid fa-right-from-bracket"></i> LOG OUT</li>
                    </ul>
                </nav>
            </div>
            <div id="content_body_hc" className="content_body_hc">
                <SideBar></SideBar>
                {
                    children
                }
            </div>
        </Fragment>
    )
}

export default AdminLayout
