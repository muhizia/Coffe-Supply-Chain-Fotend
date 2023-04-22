import React from 'react';
import { Outlet } from "react-router-dom";
import '../css/sidebar.css'
import RightNav from '../components/RightNav'
import Nav from '../components/Nav'
const Layout = () => {

  return (
    <>
      <Nav />
      <div className='sidebar' style={{ display: 'flex', height: '100%' }}>
        <RightNav />
        <main >
          <Outlet />
        </main>
      </div>
    </>
  )
};

export default Layout;