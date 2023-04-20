import React  from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import * as FaIcons from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Producers() {

  return (
      <Sidebar rootStyles={{ height: '100%', background: '#dfd', }}>
        <Menu>
        <MenuItem component={<Link to="/producers" />}>Producers</MenuItem>
          <MenuItem component={<Link to="/suppliers" />}>Suppliers</MenuItem>
          <MenuItem component={<Link to="/shipments" />}>Shipments</MenuItem>
          <MenuItem component={<Link to="/logout" />}>Logout</MenuItem>
        </Menu>
      </Sidebar>
  );
}