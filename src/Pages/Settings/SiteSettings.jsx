import React, { Fragment, useEffect, useState } from 'react'
import AdminLayout from '../../Components/Partials/AdminLayout'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getBasicSiteSettings, getSingleVendor, updateBasicSiteSettings } from '../../api/api_endpoint'
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

function SiteSettings() {

    // let [basicSiteData, setBasicSiteData] = useState({});

    let currentAdmin = useSelector((state) => state.adminAuth);




    useEffect(() => {
        getBasicSiteSettings().then((data) => {
            let response = data?.data;
            if (response?.status) {
                let siteData = response?.data;
                setBasicSiteSettingInitialValues({
                    referrer_bonus: siteData?.referrer_bonus,
                    referred_bonus: siteData?.referred_bonus,
                })
                console.log(siteData)
            }
        }).catch((err) => { })
    }, [])

    //Basic Site Related
    let basicSiteSettingValidation = Yup.object().shape({
        referrer_bonus: Yup.number("Please enter valid amount").required("Referrer bonus is required"),
        referred_bonus: Yup.number("Please enter valid amount").required("Referred bonus is required")
    })

    let [basicSiteSettingInitialValues, setBasicSiteSettingInitialValues] = useState({
        referrer_bonus: "",
        referred_bonus: "",
    })

    function onBasicSiteUpdate(values) {
        let updateData = { referrer_bonus: values.referrer_bonus, referred_bonus: values.referred_bonus };

        updateBasicSiteSettings({ site_data: updateData }).then((data) => {
            console.log(data)
            let response = data?.data;
            if (response?.status) {
                toast.success("Basic site update success")
            } else {
                toast.error("Basic site update failed")
            }
        }).catch((err) => {
            toast.error("Something went wrong")
        })
    }



    //Account Related
    let accountSettingsValidation = Yup.object().shape({
        email_address: Yup.string().email("Please enter valid mail address").required("Email address is require"),
        phone_number: Yup.number("Please enter valid phone number").required("Phone number is required")
    })
    let [accountInitialValues, setAccountInitialValues] = useState({
        email_address: "",
        phone_number: ""
    })
    function onAccountUpdate() {
        
    }

    useEffect(() => {
        getSingleVendor().then((vendor) => {
            let response = vendor?.data;
            console.log(response)
            if (response?.status) {
                let accountData = response?.vendor;
                setAccountInitialValues({
                    email_address: accountData?.email,
                    phone_number: accountData?.mobile
                })
            }
        }).catch((err) => {
            console.log(err);
            alert("ERROR")
        })
    }, [])



    // Profile Related
    let profileValidation = Yup.object().shape({
        first_name: Yup.string("Please enter valid first name").required("First name is required"),
        last_name: Yup.string("Please enter valid last name").required("Last name is required")
    })
    let profileRelatedInitialValues = {
        first_name: "",
        last_name: ""
    }
    function onProfileUpdate() { }

    //Authentication related
    let authenticationInitialValues = {
        username: "",
        password: ""
    }
    let authenticationValidation = Yup.object().shape({
        username: Yup.string("Please enter valid username").required("Username is required"),
        password: Yup.string("Please enter valid string password").required("Password is required")
    })
    function onPasswordUpdate() { }


    return (
        <AdminLayout>
            <div className="content_body" id="content_body">
                <div className="wrapper_content_body">
                    <h2>Site Settings</h2>

                    <div className="content_box_border">
                        <h6>Basic site settings</h6>
                        <div className="row mt-3">
                            <Formik
                                initialValues={basicSiteSettingInitialValues}
                                validationSchema={basicSiteSettingValidation}
                                onSubmit={onBasicSiteUpdate}
                                enableReinitialize
                            >
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Referrer Bonus</label>
                                                <Field id="name" name="referrer_bonus" type="text" placeholder="Referrer Bonus" />
                                                <ErrorMessage name="referrer_bonus" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Referred  Bonus</label>
                                                <Field id="name" name="referred_bonus" type="text" placeholder="Referred Bonus" />
                                                <ErrorMessage name="referred_bonus" component="div" className="formValidateError" />
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

                    <div className="row">

                        <div className="col-md-6">
                            <div className="content_box_border">
                                <h6>Account settings</h6>
                                <Formik
                                    initialValues={accountInitialValues}
                                    validationSchema={accountSettingsValidation}
                                    onSubmit={onAccountUpdate}
                                    enableReinitialize
                                >
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form_group">
                                                    <label htmlFor="name">Email address</label>
                                                    <Field id="name" name="email_address" type="text" placeholder="Email address" />
                                                    <ErrorMessage name="email_address" component="div" className="formValidateError" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form_group">
                                                    <label htmlFor="name">Phone number</label>
                                                    <Field id="name" name="phone_number" type="text" placeholder="Phone number" />
                                                    <ErrorMessage name="phone_number" component="div" className="formValidateError" />
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
                        <div className="col-md-6">
                            <div className="content_box_border">
                                <h6>Profile settings</h6>
                                <Formik
                                    initialValues={profileRelatedInitialValues}
                                    validationSchema={profileValidation}
                                    onSubmit={onProfileUpdate}
                                >
                                    <Form>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form_group">
                                                    <label htmlFor="name">First name</label>
                                                    <Field id="name" name="referrer_bonus" type="text" placeholder="First name" />
                                                    <ErrorMessage name="referrer_bonus" component="div" className="formValidateError" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form_group">
                                                    <label htmlFor="name">Last name</label>
                                                    <Field id="name" name="referrer_bonus" type="text" placeholder="Last name" />
                                                    <ErrorMessage name="referrer_bonus" component="div" className="formValidateError" />
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

                    <div className="content_box_border">
                        <h6>Authentication settings</h6>
                        <div className="row mt-2">

                            <Formik
                                initialValues={authenticationInitialValues}
                                validationSchema={authenticationValidation}
                                onSubmit={onPasswordUpdate}
                            >
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Username</label>
                                                <Field id="name" name="referrer_bonus" type="text" placeholder="Referrer Bonus" />
                                                <ErrorMessage name="referrer_bonus" component="div" className="formValidateError" />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form_group">
                                                <label htmlFor="name">Password</label>
                                                <Field id="name" name="referred_bonus" type="text" placeholder="Referred Bonus" />
                                                <ErrorMessage name="referred_bonus" component="div" className="formValidateError" />
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

export default SiteSettings
