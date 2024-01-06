import React, { Fragment, useState } from 'react' 
import ButtonOne from '../../Components/Button/ButtonOne';
import { AdminLoginPost } from '../../Redux/Slicer/AdminSlicer';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AdminLayout from '../../Components/Partials/AdminLayout'; 
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { loginValidationSchema } from '../../validation/FormValidation';

function Login() {


    let dispatch = useDispatch();
    let navigator = useNavigate();
    let [errorState, errorStateUpdate] = useState();

   


    async function adminLogginAction(values) {

        let { username, password } = values;

        let adminData = await dispatch(AdminLoginPost({ username, password }))
        if (adminData?.payload?.data?.status) {
            navigator("/")
        } else {
            errorStateUpdate(adminData?.payload?.data?.msg ?? "Something Went Wrong")
        }
    }

    return ( 
            <div className="login_flex_center">
                <div className="login_wrapper">
                    <h2 className="head_login"><span>Admin</span> Login Panel</h2>
                    <p className="pstart">Sign in to start your session</p>


                    <div className="form_box">
                        {
                            errorState && (
                                <div className='errorAlert'>
                                    {
                                        errorState
                                    }
                                </div>
                            )
                        }

                        <Formik
                            initialValues={{ username: "", password: "" }} validationSchema={loginValidationSchema} onSubmit={adminLogginAction}
                        >
                            <Form>

                                <div className="form_group">
                                    <Field id="username" name="username" autoFocus type="text" />
                                    <ErrorMessage name="username" component="div" className="formValidateError" />
                                </div>

                                <div className="form_group">
                                    <Field id="password" name="password" type="password" />
                                    <ErrorMessage name="password" component="div" className="formValidateError" />
                                </div>

                                <div className="option_login">
                                    <div className="remember">
                                        <input type="checkbox" />
                                        <label for="">Remember Me</label>
                                    </div>
                                    <Link to="/forget_password">Forgot password?</Link>
                                </div>

                                <ButtonOne type={"submit"} title={"Login now"} width={"w-100"} />
                            </Form>
                        </Formik>

                    </div>
                </div>
            </div>
 
    )
}

export default Login
