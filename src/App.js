
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './components/Login';
import LoginAnon from './pages/login-anon';
import RegisterAnon from './pages/register-anon';
import Register from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register-anon" element={<RegisterAnon/>} />
        <Route path="/login-anon" element={<LoginAnon/>} /> 
        <Route path="/register" element={<Register/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
