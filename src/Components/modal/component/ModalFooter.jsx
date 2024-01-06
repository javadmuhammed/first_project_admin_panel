import React from 'react'

function ModalFooter({ cancelOnClick, saveOnClick }) {
    return (
        <div className="modalFooter">
            <button onClick={cancelOnClick} className='btn btn-danger'>Cancel</button>
            <button onClick={saveOnClick} className='btn btn-success'>Save</button>
        </div>
    )
}

export default ModalFooter
