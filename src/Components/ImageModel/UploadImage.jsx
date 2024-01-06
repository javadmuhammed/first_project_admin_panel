import React, { useState } from 'react'
import HeadWindow from './Component/HeadWindow'
import SelectImage from './Component/SelectImage'
import UploadTab from './Component/UploadTab'
import ImageReloadContext from '../../Context/ImageReloadContext'
import ModalItem from '../modal/ModalItem'
import ImageCrop from 'react-image-crop-component'

function UploadImage() {

    

    return (

        <ImageReloadContext>

            

            <div className="image_upload_popup" id="cmsImagepop">
                <div className="flex_avodid_pop">
                    <div className="image_upload_wrapper">
                        <HeadWindow />

                        <div className="tab_items_image_upload">

                            <div className="upload_imga_center hideimagetab tab_image_uipload_common" id="upload_image_tab">
                                <UploadTab />
                            </div>

                            <div className="imgae_upload_tab_popup_select hideimagetab tab_image_uipload_common" id="showimagedata">
                                <SelectImage />
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </ImageReloadContext>
    )
}

export default UploadImage
