import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn'
import { AuthProvider } from './Auth/auth'
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import Dashboard from './pages/Dashboard'
import UploadImages from './pages/UploadImages'

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={"sign-in"} element={<SignIn/>}/>
        <Route path={"dashboard"} element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}/>
        <Route path={"upload-images"} element={<ProtectedRoute> <UploadImages/> </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);