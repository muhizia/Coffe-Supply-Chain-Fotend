import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Forgot from './ForgotPassword';
import NoPage from './NoPage';


export default function Auth({ setToken }) {
    return (
        <BrowserRouter>
            {/* <Navbar /> */}
            <Routes>
                <Route path='*' element={<Login setToken={setToken} />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot" element={<Forgot />} />
            </Routes>
        </BrowserRouter>
    );
};


