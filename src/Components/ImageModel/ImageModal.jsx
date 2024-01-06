import React from 'react'
import { useImageModelContext } from '../../Context/ImageModelContext'

function ImageModal() {

    let { flatImageModel, setflatImageModel } = useImageModelContext();

    return (

        <div className="imagepopup_view" style={{ display: flatImageModel.isShow ? "flex" : "none" }}>
            <div className="image_popup_wrapper">
                <img src={flatImageModel.src} id="setPopUpImage" className="image_popupview" alt="" />
                <span onClick={() => {
                    setflatImageModel({ ...flatImageModel, isShow: false })
                }} type="button">X</span>
            </div>
        </div>
    )
}

export default ImageModal
