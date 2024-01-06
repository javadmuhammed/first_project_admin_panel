import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom'

function ProtectRouter({ element, notLoggedPath }) {

    const isLogged = useSelector((state) => state.adminAuth.isLogged);
 
    if (isLogged) {
       
        return element;
    } else {
        return <Navigate to={notLoggedPath} />;
    }
}

export default ProtectRouter
