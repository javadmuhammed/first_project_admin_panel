import React from 'react'

function ModalHead({ title,onClose }) {

    
    return (
        <div className="modalHead">
            <h2>{title}</h2>
            <button onClick={onClose}>x</button>
        </div>
    )   
}

export default ModalHead
