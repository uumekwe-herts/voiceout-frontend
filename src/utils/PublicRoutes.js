import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from './Common';

// handle the public routes
function PublicRoutes() {

    return (
      !getToken() ? <Outlet /> : <Navigate to="/user/dashboard"/>
    )
  
}

export default PublicRoutes;