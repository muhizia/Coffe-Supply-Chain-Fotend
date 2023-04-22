import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import * as FaIcons from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

export default function RightNav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload(false)
  }
  return (
    <Sidebar rootStyles={{ height: '100%', background: '#dfd', }}>
      <Menu>
        <MenuItem component={<Link to="/producers" />}>Producers</MenuItem>
        <MenuItem component={<Link to="/suppliers" />}>Suppliers</MenuItem>
        <MenuItem component={<Link to="/shipments" />}>Shipments</MenuItem>
        <MenuItem component={<Link onClick={handleLogout} />}>Logout</MenuItem>
      </Menu>
    </Sidebar>
  );
}