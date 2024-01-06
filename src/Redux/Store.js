import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import AdminSlicer from "./Slicer/AdminSlicer";



let AdminStore = configureStore({
    reducer: {
        adminAuth: AdminSlicer
    }
})


export default AdminStore;
