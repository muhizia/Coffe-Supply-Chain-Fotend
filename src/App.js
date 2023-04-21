import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Layout from "./screens/Layout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NoPage from "./screens/NoPage";
import Forgot from './screens/ForgotPassword';
import Dashboard from './screens/Dashboard';
import Producers from './screens/Producers';
import Suppliers from './screens/Suppliers';
import useToken from './components/useToken';
import Shipments from './screens/Shipments';
import Details from './screens/Details'

export default function App() {
  
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="producers" element={<Producers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="shipments" element={<Shipments />} />
          <Details path="details" element={<Details />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


