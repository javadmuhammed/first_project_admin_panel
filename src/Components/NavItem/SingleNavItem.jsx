import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function SingleNavItem({ to, icon, title, isNested }) {

    let { pathname } = useLocation();
    let activeClass = (pathname == to && !isNested) ? "activepage" : null;

    return (
        <li>
            
            <Link to={to} className={activeClass} >
                <i className={"fa-solid " + icon}></i>
                {title}
            </Link>
        </li>
    )
}

export default SingleNavItem
