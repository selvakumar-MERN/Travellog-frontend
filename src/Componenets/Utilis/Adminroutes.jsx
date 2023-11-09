import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Adminroutes(props) {
    const tokenvalue = window.localStorage.getItem("siteadmin-token")
    return (
        <div>
             {tokenvalue ? <Outlet/> : <Navigate to={'/'}/> }
        </div>
    );
}

export default Adminroutes;