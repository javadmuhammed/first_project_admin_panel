import React, { useState } from 'react'
import ModalFooter from './component/ModalFooter'
import ModalHead from './component/ModalHead'

function ModalItem({ isOpen, children, title, onClose, onSave, width, MinHeight, isCenter }) {

    return (
        <div className="modal_site" style={{ display: isOpen ? "flex" : "none", overflow:"auto" }}>
            <div className={"modal_wrapper_site " } style={{ width: width, minHeight: MinHeight }} >

                <ModalHead onClose={onClose} title={title}></ModalHead>
                <div className={"modalSiteBody " + (isCenter ? "d-flex justify-content-center align-items-center" : null)}>
                    {
                        children
                    }
                </div>

                <ModalFooter saveOnClick={onSave} cancelOnClick={onClose}></ModalFooter>

            </div>
        </div>
    )
}

export default ModalItem
