import React from 'react'

function InputOneValidate({ placeHolder, type, icon, label, name, state }) {


    function inputOnChange(e, state) {
        state(e.target.value)
    }


    return (
        <div className="form_group">
            {label && <label htmlFor={name}>{label}</label>}
            <input name={name} onChange={(e) => { inputOnChange(e, state) }} type={type} placeholder={placeHolder} />
            <i className={"fa-solid" + icon}></i>


        </div>
    )
}

export default InputOneValidate
