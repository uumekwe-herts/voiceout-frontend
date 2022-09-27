
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import React from 'react'
import Login from './components/Login';
import LoginAnon from './pages/login-anon';
import RegisterAnon from './pages/register-anon';
import Register from './pages/register';
import UserDashboard from './pages/user-dashboard';
import AdminLogin from './pages/admin-login';
import AdminDashboard from './pages/admin-dashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import Anonymous from './components/ReportCase/Anonymous';
import CaseDetails from './components/CaseDetails';
import Regular from './components/ReportCase/Regular';

function App() {


  return (
  
    <Router>
      <Routes>

        <Route element={<PublicRoutes/>}>
        <Route exact path="/" element={<Login/>} />
          <Route exact="true" path="/register/anonymous" element={<RegisterAnon/>} />
          <Route exact path="/login/anonymous" element={<LoginAnon/>} /> 
          <Route exact path="/register" element={<Register/>} /> 
          <Route exact path="/admin/login" element={<AdminLogin/>} /> 
        </Route>
      
        <Route element={<PrivateRoutes/>}>
        <Route exact path="/user/dashboard" element={<UserDashboard />} />  
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />  
        <Route exact path="/user/reportcase/anonymous" element={<Anonymous />} />  
        <Route exact path="/user/reportcase" element={<Regular />} />  
        <Route path="user/case/:id" element={<CaseDetails />}/>
        </Route>
      </Routes>
    </Router>
   
  );
}


export default App;
