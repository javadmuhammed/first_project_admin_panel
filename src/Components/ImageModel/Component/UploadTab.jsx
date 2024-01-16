import React, { Fragment, useState } from 'react'
import { uploadFile } from '../../../api/api_endpoint';
import { useImageReloadContext } from '../../../Context/ImageReloadContext';
import { toast } from 'react-toastify';
import { const_data } from '../../../const/const_data';
import ModalItem from '../../modal/ModalItem';
import ImageCrop from 'react-image-crop-component';
import 'react-image-crop-component/style.css';


function UploadTab() {

    let { reloadFlag, setReloadFlag } = useImageReloadContext()

    let [isModalOpen, setIsModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    let [croppedImages, setCroppedImage] = useState("");


    function BlobToImage(blob) {
        return new Promise(resolve => {
            const url = URL.createObjectURL(blob)
            let img = new Image()
            img.onload = () => {
                URL.revokeObjectURL(url)
                resolve(img)
            }
            img.src = url
        })
    }

    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    let _onCropped = function (e) { 
        console.log(e.image)
        setCroppedImage(e.image)
    };

    let handleClose = () => {
        setIsModalOpen(false)
    }

    let croppeImage = () => {

    }

    let onImageSave = () => {

        let blobImage = dataURItoBlob(croppedImages);

        try {
            let sizeKb = blobImage.size / 1024;
            const file = new File([blobImage], 'image_filename.png', { type: 'image/png' });

            uploadFile(file, sizeKb).then((data) => {
                console.log(data)
                window.changetabimage();
                console.log(data)
                setReloadFlag(!reloadFlag)
                toast.success("Image upload success", const_data.DEFAULT_ALERT_DATA)
            }).catch((err) => {
                console.log(err)
                toast.error("Image upload failed", const_data.DEFAULT_ALERT_DATA)
            })

        } catch (e) {
            toast.error("Something went wrong", const_data.DEFAULT_ALERT_DATA)
        } finally {
            setIsModalOpen(false)
        }
    }

    function onImageUpload(file) {
        const reader = new FileReader();

        reader.onload = function (loadEvent) {
            const dataUrl = loadEvent.target.result;
            setImageUrl(dataUrl)
            setCroppedImage(dataUrl)
            setIsModalOpen(true)
        };

        reader.readAsDataURL(file);
    }





    return (
        <Fragment>

            <ModalItem isCenter={true} MinHeight={"auto"} width={"600px"} onClose={() => { handleClose() }} onSave={onImageSave} isOpen={isModalOpen} title={'Crop Images'} >

                <div className="row">
                    <div className="col-md-12">

                        {imageUrl && (
                            <ImageCrop
                                src={imageUrl}
                                square={false}
                                resize={true}
                                border={'dashed #ffffff 2px'}
                                onCrop={_onCropped}
                                
                            />
                        )}

                    </div>

                </div>
            </ModalItem>


            <input type="file" onChange={(e) => {
                onImageUpload(e.target.files[0])
            }} id='imagFile' style={{ display: 'none' }} className="fileToUpload form-control"></input><br />
            <div className="imgae_upload_tab_popup">
                <div className="flex_avoid">
                    <h2>Select File</h2>
                    <p>By Clicking Below Button</p>
                    <button className="select_files_imgae_popup" id="select_file">Select Files</button>
                    <div className="size_file_image_popuo">
                        <span>Maximum upload file size 512MB</span>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default UploadTab
