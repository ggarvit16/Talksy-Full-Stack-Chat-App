import React, { useEffect, useState } from 'react'
import Signup from './pages/Signup'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Signin from './pages/Login';

import { Toaster } from "react-hot-toast"

import { useAuthStore } from './store/useAuthStore';
import { Loader } from "lucide-react";
import ProfilePage from './pages/Profile';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './pages/Login';



const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();


  console.log({ onlineUsers });

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
};
export default App;