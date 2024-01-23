import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdminLogin } from "../../api/api_endpoint";
import authHelper from "../../helper/AuthHelper";

export let AdminLoginPost = createAsyncThunk("admin/login", async ({ username, password }) => {
    try {
        let adminLogin = await AdminLogin(username, password);
        return adminLogin;
    } catch (e) {
        return null;
    }
})

let AdminSlicer = createSlice({
    name: "admin",
    initialState: {
        isLoading: true,
        isLogged: false,
        adminData: {
            username: null,
            first_name: null,
            last_name: null,
            isAdmin: false,
            profile: null,
            mobile: null,
            email: null
        }
    },
    reducers: {
        setAdminAsLogged: (state, action) => { 
            state.isLogged = true
            state.adminData = { ...action.payload.admin }
            state.isLoading = false;
            localStorage.setItem("adminAuth", action.payload.adminAuth);
            localStorage.setItem("adminData", action.payload.adminProfile); 
        },
        adminLogout: (state, action) => { 
            state.isLogged = false;
            state.isLoading = false;
            state.adminData = {}
            state.isLoading = false;
            localStorage.setItem("adminAuth", "{}");
            localStorage.setItem("adminData", "{}");  
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AdminLoginPost.fulfilled, (state, action) => {
            let returnData = action.payload?.data?.vendor;
            console.log(action.payload?.data)
            if (returnData) {
                if (returnData?.status) {
                    state.isLogged = true;
                    state.isLoading = false;
                    let adminData = {
                        username: returnData?.username,
                        first_name: returnData?.first_name,
                        last_name: returnData?.last_name,
                        isAdmin: returnData?.isAdmin,
                        profile: returnData?.profile,
                        mobile: returnData?.mobile,
                        email: returnData?.email
                    }

                    state.adminData = { ...adminData }
                    authHelper.setDataLocalStorage(adminData);
                    authHelper.setJwtLocalStorage(returnData?.access_token, returnData?._id);
                }  
            }

        })
    }
})


export default AdminSlicer.reducer
export let adminSlicerAction = AdminSlicer.actions;