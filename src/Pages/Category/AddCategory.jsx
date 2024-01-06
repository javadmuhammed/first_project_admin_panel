import React, { useRef, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectImage from '../../Components/ImageModel/Component/SelectImage'
import UploadImage from '../../Components/ImageModel/UploadImage'
import { addCategoryEndPoint } from '../../api/api_endpoint'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function AddCategory() {


    let categoryImageRef = useRef();
    let navigate = useNavigate();


    let initialValues = {
        name: "",
        status: null,
        categoryImage: ""
    }

    let validationSchema = Yup.object().shape({
        name: Yup.string("Name should be string").required("Name is required"),
        status: Yup.string("").required("Status is required"),
        offer: Yup.number("Please enter valid number").max(10, "Offer percentage must be less than 10%")
    })

    function handleSubmit(values) {
        addCategoryEndPoint({
            name: values?.name,
            image: categoryImageRef.current.value,
            status: values?.status,
            offer: values.offer
        }).then((response) => {
            let data = response.data;
            if (data?.status) {
                toast.success("Category successfuly created")
                navigate("/manage_category")
            } else {
                toast.error("Category failed to create")
            }
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong")
        })
    }


    return (
        <AdminLayout>


            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2>Add Category</h2>

                    <div className="content_box_border">
                        <div className="row mt-2">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                validate={(values) => {
                                    let error = {};
                                    if (categoryImageRef.current.value == null || categoryImageRef.current.value == "") {
                                        error.categoryImage = "Please select valid category images";
                                    } else {
                                        error = {};
                                    } 
                                    return error;
                                }}
                            >
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Name</label>
                                                <Field id="name" name="name" type="text" placeholder="Category Name" />
                                                <ErrorMessage name="name" component="div" className="formValidateError" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">


                                            <div className="form_group">

                                                <div className="fileselect form_group" onClick={
                                                    () => {
                                                        window.showSelectImage('categoryImage', null)
                                                    }
                                                }>
                                                    <label htmlFor="images">Images</label>


                                                    <input ref={categoryImageRef} className="pointerNone" id="categoryImage" name="categoryImage" type="text" placeholder="Select Product Images" />

                                                    {/* <Field className="pointerNone" id="categoryImage" name="categoryImage" type="text" placeholder="Select Category Images" /> */}
                                                    <ErrorMessage name="categoryImage" component="div" className="formValidateError" />


                                                </div>




                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Status</label>
                                                <Field as="select" name="status" id="status">
                                                    <option value="" label='Select Status' />
                                                    <option value={true} label='Active' />
                                                    <option value={false} label='In Active' />
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Offer (Max 10%)</label>
                                                <Field id="offer" name="offer" type="text" placeholder="Offer percentage" />
                                                <ErrorMessage name="offer" component="div" className="formValidateError" />
                                            </div>
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
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddCategory
