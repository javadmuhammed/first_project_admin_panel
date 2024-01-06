import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { useParams } from 'react-router-dom'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import * as Yup from 'yup'
import { editBannerEndPoint, getSingleBanner } from '../../api/api_endpoint';
import { toast } from 'react-toastify'

function EditBanner() {

    let { edit_id } = useParams();
    let bannerImage = useRef();
    let [bannerImageError, setBannerImageError] = useState({ error: false, msg: "Product images is required" })
    // let

    let [initValues, setInitValues] = useState({})




    let validation = Yup.object().shape({
        name: Yup.string().required("Name field is required"),
        url: Yup.string().required("URL is required"),
        status: Yup.string().required("Status is required")
    })


    function handleEditBanner(values, { resetForm }) {

        let bannerImg = bannerImage.current.value;
        
        let editData = {
            name: values?.name,
            url: values?.url,
            status: values?.status,
            images: bannerImg,
            edit_id: [edit_id]
        }


        console.log(editData)


        editBannerEndPoint(editData).then((edit) => {
            let response = edit?.data;
            if (response?.status) {
                toast.success("Banner update success");
            } else {
                toast.error("Something went wrong")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }


    useEffect(() => {
        getSingleBanner(edit_id).then((data) => {
            let response = data?.data;
            if (response?.status) {
                setInitValues(response?.banner)
                bannerImage.current.value = response?.banner?.images;
            }
        }).catch((err) => { })
    }, [edit_id])

    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2>Edit Banner</h2>

                    <div className="content_box_border">
                        <div className="row mt-2">

                            <Formik
                                initialValues={initValues}
                                onSubmit={handleEditBanner}
                                validationSchema={validation}
                                enableReinitialize
                            >

                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Name</label>
                                                <Field id="name" name="name" placeHolder="Enter banner name" />
                                                <ErrorMessage name="name" component="div" className="formValidateError" ></ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="fileselect form_group" onClick={
                                                () => {
                                                    window.showSelectImage('productImage', null)
                                                }
                                            }>

                                                <label htmlFor="name">Image</label>
                                                <input ref={bannerImage} className="pointerNone" id="productImage" name="productImage" type="text" placeholder="Select Product Images" />
                                                {
                                                    bannerImageError.error && (
                                                        <p className='formValidateError'>{bannerImageError.msg}</p>
                                                    )
                                                }


                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">URL ('#' if don't have any)</label>
                                                <Field id="url" name="url" placeHolder="Enter banner url" />
                                                <ErrorMessage name="url" component="div" className="formValidateError" ></ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Status</label>
                                                <Field as="select" id="status" name="status" >
                                                    <option value="">Select Option</option>
                                                    <option value={true} >Active</option>
                                                    <option value={false} >In Active</option>
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="formValidateError" ></ErrorMessage>
                                            </div>
                                        </div>

                                        <div className="col-12 text-center">
                                            <button className="form_btn btn_green" type="submit">
                                                Submit
                                            </button>
                                            <button className="form_btn btn_warning" type="reset">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditBanner
