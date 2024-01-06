import React from 'react'
import { Link } from 'react-router-dom'

function FiltterButton({ className, title, to, icon, isButton, onClick }) {
    return (
        <div className={"itemselect_filter " + className}>
            {
                isButton ? <a href="javascript:;" onClick={onClick}><i className={"fa " + icon}></i> {title} </a> : <Link to={to}><i className={"thisWork fa " + icon}></i> {title} </Link>
            }
        </div>
    )
}

export default FiltterButton
