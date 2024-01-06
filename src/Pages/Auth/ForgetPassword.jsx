import React, { Fragment, useState } from 'react'
import InputOne from '../../Components/Input/InputOneValidate'
import ButtonOne from '../../Components/Button/ButtonOne';
import { Link } from 'react-router-dom';
import AdminLayout from '../../Components/Partials/AdminLayout';
import { ForgetPasswordEndPoint } from '../../api/api_endpoint';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { forgetPasswordValidate } from '../../validation/FormValidation';

function ForgetPassword() {

    let [alertState, alertStateUpdate] = useState({ alertClass: false, alertMessage: "" });

    function onForgetSubmit(values) {
        let { email } = values;
        ForgetPasswordEndPoint(email).then((data) => {
            if (data?.data?.status) {
                alertStateUpdate({ alertClass: "successAlert", alertMessage: data.data?.msg })
            } else {
                alertStateUpdate({ alertClass: "errorAlert", alertMessage: data.data?.msg })
            }
        }).catch((err) => {
            alertStateUpdate({ alertClass: "errorAlert", alertMessage: err.message })
        })
    }


    return ( 
            <div className="login_flex_center">
                <div className="login_wrapper">
                    <h2 className="head_login"><span>Admin</span> Forget Password</h2>
                    <p className="pstart">Reset Admin Password</p>

                    <div className="form_box">

                        {
                            alertState.alertClass && (
                                <div className={alertState.alertClass}>
                                    {
                                        alertState.alertMessage
                                    }
                                </div>
                            )
                        }

                        <Formik initialValues={{ email: "" }} onSubmit={onForgetSubmit} validationSchema={forgetPasswordValidate}>
                            <Form>
                                <div className="form_group">
                                    <Field id="email" name="email" icon={"fa-user"} label={false} placeHolder={"Enter email address"} type={"email"} />
                                    <ErrorMessage name="email" component="div" className="formValidateError" />
                                </div>

                                <Link to="/login">Don't need to reset password? login now</Link>


                                <ButtonOne type={"submit"}   title={"Login now"} width={"w-100"} />
                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>
 
    )
}

export default ForgetPassword
