import React from 'react'

function ButtonOne({ width, title, onClick,type }) {
    return (
        <button type={type} onClick={onClick} className={"btn_submit " + width} >{title}</button>
    )
}

export default ButtonOne
