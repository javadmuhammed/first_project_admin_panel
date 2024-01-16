import React, { Fragment, useEffect } from 'react'
import react from 'react'
import { useDispatch, useSelector } from 'react-redux'
import instance from '../../axios/instance'
import { const_data } from '../../const/const_data'
import authHelper from '../../helper/AuthHelper'
import { adminSlicerAction } from '../../Redux/Slicer/AdminSlicer'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import Login from '../../Pages/Auth/Login'
import ForgetPassword from '../../Pages/Auth/ForgetPassword'
import ResetPassword from '../../Pages/Auth/ResetPassword'
import AddProduct from '../../Pages/Product/AddProduct'
import EditProduct from '../../Pages/Product/EditProduct'
import ProtectRouter from './ProtectRouter'
import ManageProduct from '../../Pages/Product/ManageProduct'
import ManageOrders from '../../Pages/Orders/ManageOrders'
import ViewSingleOrder from '../../Pages/Orders/ViewSingleOrder'
import ManageStock from '../../Pages/Product/ManageStock'
import SingleUserView from '../../Pages/User/SingleUserView'
import ManageUsers from '../../Pages/User/ManageUsers'
import AddUsers from '../../Pages/User/AddUsers'
import AddCategory from '../../Pages/Category/AddCategory'
import ManageCategory from '../../Pages/Category/ManageCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AddBanner from '../../Pages/Banner/AddBanner'
import ManageBanner from '../../Pages/Banner/ManageBanner'
import EditBanner from '../../Pages/Banner/EditBanner'
import setCheckAuth from './AuthChecker'
import AddCoupen from '../../Pages/Coupen/AddCoupen'
import EditCoupen from '../../Pages/Coupen/EditCoupen'
import ManageCoupen from '../../Pages/Coupen/ManageCoupen'
import ViewSingleProduct from '../../Pages/Product/ViewSingleProduct'
import GenerateSalesReport from '../../Pages/Report/GenerateSalesReport' 
import DemoCropping from '../CropImages/DemoCropping'
import SiteSettings from '../../Pages/Settings/SiteSettings'
import EditUser from '../../Pages/User/EditUser'


function RouterComponent() {


    let dispatch = useDispatch();
    let isLogged = useSelector((state) => state.adminAuth.isLogged)


   



    let adminData;

    try {
        adminData = JSON.parse(localStorage.getItem("adminAuth"));
    } catch (e) {
        adminData = {}
    }

    let authData = {
        jwt: adminData?.jwt,
        reference: adminData?.refresh_reference
    }



    instance.interceptors.request.use(async function (config) {


        try {
            adminData = JSON.parse(localStorage.getItem("adminAuth"));
        } catch (e) {
            adminData = {}
        }

        let authData = {
            jwt: adminData?.jwt,
            reference: adminData?.refresh_reference
        }


        const jwtHeaderValue = "Bearer " +  encodeURIComponent(authData.jwt);
        const referenceHeaderValue = await encodeURIComponent(authData.reference);
        console.log(authData)



        alert(referenceHeaderValue + " " + typeof referenceHeaderValue)

        config.headers.authorization = jwtHeaderValue;
         config.headers.sample = "Hello world";
        config.headers.refresh_reference = referenceHeaderValue;


        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            try {
                let localData = JSON.parse(localStorage.getItem("adminAuth"));
                let refresh_token = localData?.refresh_reference;

                if (error?.response?.status == 403) {
                    let refreshToken = authData.reference;
                    instance.post(const_data.API_ENDPOINT.admin_jwt_regenarate, { refresh_token }).then((refreshData) => {

                        if (refreshData.data?.status) {
                            authData.jwt = refreshData.data.token;
                            authHelper.setJwtLocalStorage(authData.jwt, refresh_token)
                            setAdmin()
                        } else {
                            dispatch(adminSlicerAction.adminLogout())
                        }
                    }).catch((err) => {
                        dispatch(adminSlicerAction.adminLogout())
                    })
                } else {
                    dispatch(adminSlicerAction.adminLogout())
                }
            } catch (e) {
                adminData = {}
            }

        }

    )


    function setAdmin() {

        try {

            let authDataLocal = JSON.parse(localStorage.getItem("adminAuth"));
            let profileData = JSON.parse(localStorage.getItem("adminData"))

            authData.jwt = authDataLocal?.jwt;
            authData.reference = authDataLocal?.reference;

            if (authDataLocal?.jwt) {

                let returnData = profileData?.vendorAdmin?.profileAdmin;

                let adminData = {
                    username: returnData?.username,
                    first_name: returnData?.first_name,
                    last_name: returnData?.last_name,
                    isAdmin: returnData?.isAdmin,
                    profile: returnData?.profile,
                    mobile: returnData?.mobile,
                    email: returnData?.email
                }


                console.log(adminData)

                dispatch(adminSlicerAction.setAdminAsLogged({ admin: adminData }))

            } else {
                console.log("Do not have valid JWT Auth")
            }

        } catch (e) {

        }
    }

    if (!isLogged) setAdmin()


    return (
        <Fragment>

            <Router>
                <Routes>

                    <Route path="/" element={<ProtectRouter element={<Dashboard />} notLoggedPath="/login" />} />

                    {/* Auth Related */}
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/forget_password' element={<ForgetPassword />}></Route>
                    <Route path='/reset_password/:token' element={<ResetPassword />}></Route>

                    {/* Site Settings */}
                    <Route path='/site_settings' element={<ProtectRouter element={<SiteSettings />} notLoggedPath="/login" />}></Route>


                    {/* Product Related */}
                    <Route path='/add_product' element={<ProtectRouter element={<AddProduct />} notLoggedPath="/login" />}></Route>
                    <Route path='/view_single_product/:product_id' element={<ProtectRouter element={<ViewSingleProduct />} notLoggedPath="/login" />}></Route>
                    <Route path='/manage_product' element={<ProtectRouter element={<ManageProduct />} notLoggedPath="/login" />}></Route>
                    <Route path='/edit_product/:edit_id' element={<ProtectRouter element={<EditProduct />} notLoggedPath="/login" />}></Route>
                    <Route path='/manage_stock' element={<ProtectRouter element={<ManageStock />} notLoggedPath="/login" />}></Route>

                    {/* Order Related */}
                    <Route path='/manage_orders' element={<ProtectRouter element={<ManageOrders />} notLoggedPath="/login" />}></Route>
                    <Route path='/view_single_order/:order_id' element={<ProtectRouter element={<ViewSingleOrder />} notLoggedPath="/login" />}></Route>

                    {/* User Related */}
                    <Route path='/add_user' element={<ProtectRouter element={<AddUsers />} notLoggedPath="/login" />}></Route>
                    <Route path='/manage_user' element={<ProtectRouter element={<ManageUsers />} notLoggedPath="/login" />}></Route>
                    <Route path='/view_single_user/:user_id' element={<ProtectRouter element={<SingleUserView />} notLoggedPath="/login" />}></Route>
                    <Route path='/edit_user/:edit_id' element={<ProtectRouter element={<EditUser />} notLoggedPath="/login" />}></Route>

                    {/* Category Related */}
                    <Route path='/add_category' element={<ProtectRouter element={<AddCategory />} notLoggedPath="/login" />}></Route>
                    <Route path='/manage_category' element={<ProtectRouter element={<ManageCategory />} notLoggedPath="/login" />}></Route>
                    <Route path='/edit_category/:edit_id' element={<ProtectRouter element={<EditCategory />} notLoggedPath="/login" />}></Route>
                    <Route path='/sort_category' element={<ProtectRouter element={<EditCategory />} notLoggedPath="/login" />}></Route>

                    {/* Banner Management */}
                    <Route path='/add_banner' element={<ProtectRouter element={<AddBanner />} notLoggedPath="/login" />}></Route>
                    <Route path='/manage_banner' element={<ProtectRouter element={<ManageBanner />} notLoggedPath="/login" />}></Route>
                    <Route path='/edit_banner/:edit_id' element={<ProtectRouter element={<EditBanner />} notLoggedPath="/login" />}></Route>
                    <Route path='/sort_banner' element={<ProtectRouter element={<ManageBanner />} notLoggedPath="/login" />}></Route>

                    {/* Coupen Management */}
                    <Route path='/add_coupen_code' element={<ProtectRouter element={<AddCoupen />} notLoggedPath="/login" />}></Route>
                    <Route path='/edit_coupen/:coupen_id' element={<ProtectRouter element={<EditCoupen />} notLoggedPath="/login" />}></Route>
                    <Route path='/manage_coupen_code' element={<ProtectRouter element={<ManageCoupen />} notLoggedPath="/login" />}></Route>

                    {/* Sales Report */}
                    <Route path='/generate_sales_report' element={<ProtectRouter element={<GenerateSalesReport />} notLoggedPath="/login" />}></Route>
  

                </Routes>
            </Router>   
        </Fragment>
    )
}

export default RouterComponent
