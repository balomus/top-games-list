// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import GameList from './pages/GameList';

function App() {
  return (
    <>
      <Router>
        <div className='app-container' id='root'>
          <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/gamelist' element={<GameList />} />
            </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
