import React from 'react'

function ActionButton({ className, onClickAction, title, icon }) {
    return (
        <div className={"itemselect_filter " + className}>
            <a href="javascript:;" onClick={onClickAction}>
                <i className={"fa " + icon}></i> {title}
            </a>
        </div>
    )
}

export default ActionButton
