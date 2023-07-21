/* eslint-disable no-undef */
import React from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import MainPage from './Pages/MainPage';
import { useSelector } from 'react-redux';

const PrivatePage = () => {
  const { username } = useSelector((state) => state.user);
  const location = useLocation();
  return (
    username ? <MainPage /> : <Navigate to="/profile" state={{ from: location }} />
  )
};

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/profile' element={<PrivatePage />} />
    </Routes>
    </BrowserRouter>
  )
};

export default App;