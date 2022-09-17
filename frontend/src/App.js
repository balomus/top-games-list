// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
// import GameLookup from './components/GameLookup';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
