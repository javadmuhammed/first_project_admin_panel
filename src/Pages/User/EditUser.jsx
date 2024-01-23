import React, { useEffect, useRef, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { getSingleUser, updateUsers } from '../../api/api_endpoint';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { toast } from 'react-toastify';


function EditUser() {


    let userImage = useRef();
    let { edit_id } = useParams();
    let navigate = useNavigate()
    let [startEditing, setStartEditing] = useState(false);

    let [initValues, setInitValues] = useState({
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
        password: "",
        status: "",
        productImage: "",
    })

    let onUserAddSubmit = (values, { resetForm }) => {

        if (startEditing) {
            values.profile = userImage.current.value

            updateUsers([edit_id], values).then((data) => {
                console.log(data)
                let response = data?.data;
                if (response?.status) {
                    toast.success("User successfuly updated")
                    navigate("/manage_user")
                } else {
                    toast.error(response.msg)
                }
            }).catch((err) => toast.success("Something went wrong"))
        }

        // addUser(values).then((data) => {
        //     let response = data?.data;
        //     if (response?.status) {
        //         toast.success("User successfuly created")
        //         resetForm();
        //     } else {
        //         toast.error(response.msg)
        //     }
        // }).catch((err) => toast.success("Something went wrong"))
    }

    let validateUserScheme = Yup.object().shape({
        first_name: Yup.string("Please enter valid string").trim().required("Please enter first name"),
        last_name: Yup.string("Please enter valid string").trim().required("Please enter last name"),
        mobile: Yup.number("Please enter valid number").required("Please enter phone number").min(10, "Please enter minimum 10 digit"),
        email: Yup.string("Please enter valid email").trim().required("Please enter valid email address").email("Please enter valid email address"),
        password: Yup.string("Please enter valid password").trim(),
        status: Yup.bool("Please enter valid status").required("Please enter valid status"),
    })

    useEffect(() => {
        getSingleUser(edit_id).then((data) => {
            let response = data?.data;

            if (response?.status) {
                let user = response?.user;
                console.log(user)
                let initValuesTemplate = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    mobile: user.mobile,
                    email: user.email,
                    status: user.status,
                }
                userImage.current.value = user.profile ?? ""
                setInitValues(initValuesTemplate)
                setStartEditing(true);
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])



    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                {startEditing ? <div className="wrapper_content_body">
                    <h2>Add User</h2>

                    <div className="content_box_border">
                        <div className="row mt-2">
                            <Formik
                                initialValues={initValues}
                                onSubmit={onUserAddSubmit}
                                validationSchema={validateUserScheme}
                                enableReinitialize

                            >
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">First Name</label>
                                                <Field id="first_name" name="first_name" type="text" placeholder="First Name" />
                                                <ErrorMessage name="first_name" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Last Name</label>
                                                <Field id="last_name" name="last_name" type="text" placeholder="Last Name" />
                                                <ErrorMessage name="last_name" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Mobile Number</label>
                                                <Field id="mobile" name="mobile" type="text" placeholder="Mobile Number" />
                                                <ErrorMessage name="mobile" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Email Address</label>
                                                <Field id="email" name="email" type="text" placeholder="Email address" />
                                                <ErrorMessage name="email" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Password</label>
                                                <Field id="password" name="password" type="text" placeholder="Enter password" />
                                                <ErrorMessage name="password" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="fileselect form_group" onClick={
                                                () => {
                                                    window.showSelectImage('userProfileImage', null)
                                                }
                                            }>
                                                <label htmlFor="images">Profile Image</label>

                                                <input ref={userImage} className="pointerNone" id="userProfileImage" name="userProfileImage" type="text" placeholder="Select User Profile" />
                                                <ErrorMessage name="userProfileImage" component="div" className="formValidateError" />

                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Status</label>
                                                <Field id="status" name="status" as="select" type="text" >
                                                    <option>Select Status</option>
                                                    <option value={true}>Active</option>
                                                    <option value={false}>In Active</option>
                                                </Field>
                                                <ErrorMessage name="status" component="div" className="formValidateError" />
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
                </div> : null
                }
            </div>
        </AdminLayout>
    )
}

export default EditUser