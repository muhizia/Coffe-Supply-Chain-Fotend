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
import Shipments from './screens/Shipments';
import Details from './screens/Details';
import Auth from './screens/Auth';

import useToken from './components/useToken';

export default function App() {
  
  const { token, setToken } = useToken();

  if(!token) {
    return <Auth setToken={setToken} />
  }

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />} />
        <Route path="forgot" element={<Forgot />} /> */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="producers" element={<Producers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="shipments" element={<Shipments />} />
          <Route path="details/:shipment_id" element={<Details />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};


