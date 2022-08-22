
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import React from 'react'
import Login from './components/Login';
import LoginAnon from './pages/login-anon';
import RegisterAnon from './pages/register-anon';
import Register from './pages/register';
import UserDashboard from './pages/user-dashboard';
import PrivateRoutes from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute';

function App() {


  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact="true" path="/register/anonymous" element={<RegisterAnon/>} />
        <Route exact path="/login/anonymous" element={<LoginAnon/>} /> 
        <Route exact path="/register" element={<Register/>} /> 
        <Route element={<PrivateRoutes/>}>
        <Route exact path="/user/dashboard" element={<UserDashboard />} />  
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
