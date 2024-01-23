import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { ErrorMessage, Field, Formik, Form } from 'formik'
import * as Yup from 'yup'
import { editProduct, getSingleCategory, updateCategoryEndPoint } from '../../api/api_endpoint'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
function EditCategory() {



    let [startEditing, setStartEditing] = useState(true);

    let [initialValues, setInitialValues] = useState({
        name: "",
        status: false,
        offer: 0,
    });

    let categoryImageRef = useRef();
    let { edit_id } = useParams();


    let validationSchema = Yup.object().shape({
        name: Yup.string("Name should be string").trim().required("Name is required"),
        status: Yup.string("").trim().required("Status is required"),
        offer: Yup.number("Please enter valid number").max(10, "Offer percentage must be less than 10%")
    })


    function handleSubmit(values) {

        if (startEditing) {
            updateCategoryEndPoint(
                edit_id,
                {
                    name: values.name,
                    status: values.status,
                    image: categoryImageRef.current.value,
                    offer: values.offer
                }).then((upd) => {
                    let response = upd.data;
                    if (response?.status) {
                        toast.success("Category updated success")
                    } else {
                        toast.error("Category updated failed")
                    }
                }).catch((err) => {
                    console.log(err)
                    toast.error("Something went wrong")
                })
        }   
    }

    useEffect(() => {
        getSingleCategory(edit_id).then((categoryData) => {
            let res = categoryData.data;
            if (res?.status) {
                let categoryData = res.category;
                setInitialValues({ name: categoryData.name, status: categoryData.status, offer: categoryData?.offer })
                categoryImageRef.current.value = categoryData.image
            }
        }).catch((err) => {

        })
    }, [])



    return (
        <AdminLayout>

            <div className="content_body" id="content_body">
                {startEditing ? <div className="wrapper_content_body">
                    <h2>Edit Category</h2>

                    <div className="content_box_border">
                        <div className="row mt-2">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                                enableReinitialize
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
                                                        window.showSelectImage('categoryImage', categoryImageRef.current.value)
                                                    }
                                                }>
                                                    <label htmlFor="images">Images</label>

                                                    <input ref={categoryImageRef} className="pointerNone" id="categoryImage" name="categoryImage" type="text" placeholder="Select Category Images" />
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
                                                <label htmlFor="name">Offer (10%)</label>
                                                <Field id="offer" name="offer" type="text" placeholder="Offer Percentage" />
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
                </div> : null}
            </div>
        </AdminLayout>
    )
}

export default EditCategory
