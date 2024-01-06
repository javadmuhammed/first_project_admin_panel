import React from 'react'

function ButtonTwo({ width, title, onClick }) {
    return (
        <button onClick={onClick} className={"a_btn_red " + width} >{title}</button>
    )
}

export default ButtonTwo
