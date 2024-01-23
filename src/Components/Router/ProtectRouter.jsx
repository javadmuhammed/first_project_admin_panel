import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

function ProtectRouter({ element, notLoggedPath }) {


    const [isLoading, setIsLoading] = useState(true);

    const adminAuth = useSelector((state) => state.adminAuth); 
    let navigate = useNavigate()

    useEffect(() => {
        if (!adminAuth.isLoading) {
            setIsLoading(false);

            if (!adminAuth.isLogged) { 
                navigate('/login', { replace: true });
            } 
        }
    }, [adminAuth.isLoading, adminAuth.isLogged]);

    


    if (isLoading) {
        return null;
    }else{
        return element;
    }

    

}

export default ProtectRouter
