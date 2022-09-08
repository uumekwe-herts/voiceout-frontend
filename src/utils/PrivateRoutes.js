import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from './Common';
 
function PrivateRoutes() {
  return (
    getToken() ? <Outlet /> : <Navigate to="/"/>
  )
}
 
export default PrivateRoutes;