import React  from 'react';
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import Layout from "./screens/Layout";
import Login from "./screens/Login";
import Register from "./screens/Register";
import NoPage from "./screens/NoPage";
import Forgot from './screens/ForgotPassword';
import Dashboard from './screens/Dashboard';
import Producers from './screens/Producers';
import Suppliers from './screens/Suppliers';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



export default function App() {
  return (
      <BrowserRouter>
        {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="login" element={<Login/>} />
              <Route path="register" element={<Register />} />
              <Route path="forgot" element={<Forgot />} />
              <Route path="producers" element={<Producers />} />
              <Route path="suppliers" element={<Suppliers />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
      </BrowserRouter>
  );
};


