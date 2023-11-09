import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Protectedroute(props) {
    const tokenvalue = window.localStorage.getItem("sitetoken")
    return (
        <div>
             {tokenvalue ? <Outlet/> : <Navigate to='/login'/> }
        </div>
    );
}

export default Protectedroute;