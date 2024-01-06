import React, { Fragment, useState } from 'react'
import InputOne from '../../Components/Input/InputOneValidate'
import ButtonOne from '../../Components/Button/ButtonOne'
import { Link, useParams } from 'react-router-dom'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { resetPasswordEndPoint } from '../../api/api_endpoint'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { passwordResetValidation } from '../../validation/FormValidation'

function ResetPassword() {


    let [alertState, alertStateUpdate] = useState({ alertClass: "", alertMessage: "" });

    let { token } = useParams();

    function resetPasswordAction(values) {
        let { password } = values;
        resetPasswordEndPoint(password, token).then((data) => {
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
                    <h2 className="head_login"><span>Admin</span> New Password</h2>
                    <p className="pstart">Create password</p>

                    <div className="form_box">

                    {
                            alertState && (
                                <div className={alertState.alertClass}>
                                    {
                                        alertState.alertMessage
                                    }
                                </div>
                            )
                        }

                        <Formik initialValues={{ password: "", cpassword: "" }} validationSchema={passwordResetValidation} onSubmit={resetPasswordAction}>
                            <Form>
                                <div className="form_group">
                                    <Field name={"password"} placeholder={"Enter password"} type={"password"}></Field>
                                    <ErrorMessage name="password" component="div" className="formValidateError" />
                                </div>

                                <div className="form_group">
                                    <Field name={"cpassword"} placeholder={"Enter confirm password"} type={"password"}></Field>
                                    <ErrorMessage name="cpassword" component="div" className="formValidateError" />
                                </div>

                                <Link to="/login">Don't need to reset password? login now</Link>


                                <ButtonOne type={"submit"} title={"Login now"} width={"w-100"} />
                            </Form>
                        </Formik>

                    </div>
                </div>
            </div> 
    )
}

export default ResetPassword
