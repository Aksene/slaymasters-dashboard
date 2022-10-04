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
import AppChat from './pages/AppChat'
import AppChatList from './pages/AppChatList'
import SupabaseChat from './pages/SupabaseChat'
import UploadToVimeo from './pages/UploadToVimeo';
import ManageAssignments from './pages/ManageAssignments';
import Playground from './pages/Playground'
import PopUp from './components/Popup'


ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path={"sign-in"} element={<SignIn/>}/>
        <Route path={"dashboard"} element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute> }/>
        {/* <Route path={"manage-assignments"} element={ <ManageAssignments/> }/> */}
        <Route path={"manage-assignments"} element={ <AdminProtectedRoute> <ManageAssignments/> </AdminProtectedRoute> }/>
        {/* <Route path={"manage-assignments"} element={ <ProtectedRoute> <PopUp/> </ProtectedRoute> }/> */}
        <Route path={"playground"} element={ <AdminProtectedRoute> <Playground/> </AdminProtectedRoute> }/>
        <Route path={"chat"} element={ <AppChat/> }/>
        <Route path={"testing"} element={ <SupabaseChat/> }/>
        <Route path={"chat-list"} element={ <AppChatList/> }/>
        <Route path={"upload-images"} element={ <UploadImages/>}/>
        <Route path={"upload-to-vimeo"} element={ <UploadToVimeo/>}/>
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);