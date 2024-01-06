import React, { useContext, useEffect, useRef, useState } from 'react'
import { deleteImagesEndPoint, fetchAllImages } from '../../../api/api_endpoint';
import { const_data } from '../../../const/const_data';
import { useImageReloadContext } from '../../../Context/ImageReloadContext';
import { useImageModelContext } from '../../../Context/ImageModelContext';
import { toast } from 'react-toastify';

function SelectImage() {

    let [images, imagesUpdate] = useState([]);
    let { reloadFlag, setReloadFlag } = useImageReloadContext()
    let imagesIdRef = useRef();

    let { flatImageModel, setflatImageModel } = useImageModelContext();

    useEffect(() => { 
        fetchAllImages().then((data) => {
            if (data?.data?.status) {
                let images = data?.data?.data;
                imagesUpdate(images)
            }
        }).catch((err) => {
            toast.success("Something went wrong for image fetching", const_data.DEFAULT_ALERT_DATA)
        })
    }, [reloadFlag])


    function onImageDrag(e) {
        let imageName = e.currentTarget.getAttribute('data-imagename');
        setflatImageModel({ ...flatImageModel, isShow: true, src: const_data.public_image_url + "/" + imageName })
    }
    function deleteImages() {
        let selectedImagesId = imagesIdRef.current.value;
        let confirm = window.confirm("Are you sure want to delete image");
        if (confirm) {
            if (selectedImagesId != "" && selectedImagesId != null) {
                deleteImagesEndPoint(selectedImagesId).then((data) => {
                    console.log(data)
                    setReloadFlag(!reloadFlag)
                    toast.success("Image delete success", const_data.DEFAULT_ALERT_DATA)
                }).catch((err) => {
                    setReloadFlag(!reloadFlag)
                    toast.error("Image delete failed", const_data.DEFAULT_ALERT_DATA)
                })
            }
        }
    }

    return (
        <div className="content_show_image_filespopup">
            <div className="row h100">
                <div className="col-12">
                    <div className="image_list_show">
                        <input type="hidden" id="setValue" />
                        <input type="hidden" id="idValue" ref={imagesIdRef} />
                        <input type="hidden" id="fromIdInput" />

                        <div className="imageuploadlist">
                            <ul id="uploadImagesList" className="mt-3 row">


                                {
                                    images?.length > 0 && (
                                        images.map((item, index) => (
                                            <div className="col-md-4 col-6" key={index}>
                                                <li onDrag={onImageDrag} className="image_uploaded_list_item" data-image-id={item._id} data-imagename={item.image}>
                                                    <img src={const_data.public_image_url + "/" + item.image} className="viewImages w-100" alt="" />
                                                </li>
                                            </div>
                                        )
                                        )
                                    )
                                }




                            </ul>
                        </div>
                    </div>
                    <div className="button_group">
                        <div className="flex_avoid button_flex">

                            <div onClick={deleteImages}>
                                <button className="btn btn-danger" id="deleteImagePopup"   ><i className="fa fa-trash"></i> Delete</button>
                            </div>

                            <div>
                                <button className="btn btn-success" id="doneageSelect">Done</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SelectImage
