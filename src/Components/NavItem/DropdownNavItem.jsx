import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function DropdownNavItem({ title, icon, children, dataShow }) {

    console.log(children)
    let { pathname } = useLocation();
    let isMatched = Array.isArray(children) ? children?.find((eachItem) => eachItem?.props?.to == pathname) : children?.props?.to == pathname
    let className = isMatched ? "activepage" : null;
    let style = { display: isMatched ? "block" : "none" }

    return (
        <li>
            <Link to={""} className={className} data-show={dataShow}>
                <i className={"fa " + icon}></i>
                {title}
                <i className="downarrow fa-solid fa-chevron-down"></i>
            </Link>


            <ul className="submenus" id={dataShow} style={style}>
                {
                    children
                }
            </ul>
        </li>
    )
}

export default DropdownNavItem
