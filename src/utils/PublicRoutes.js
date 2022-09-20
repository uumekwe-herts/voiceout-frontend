
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken, getUserType } from './Common';
import configData from "../config.json";
// handle the public routes
function PublicRoutes() {
  let renderedRoute;
  if( !getToken() ){
     renderedRoute = <Outlet />;
  }else if(getToken() && getUserType() === configData.ADMIN_USER){
    renderedRoute = <Navigate to="/admin/dashboard"/>
  }else if(getToken()){
<Navigate to="/user/dashboard"/>
  }
    return (
      <div>
  {renderedRoute}
      </div>
    
    )
  
}

export default PublicRoutes;