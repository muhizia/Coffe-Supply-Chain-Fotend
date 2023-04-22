import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import * as FaIcons from "react-icons/fa";
import { useProSidebar } from 'react-pro-sidebar';
import useToken from './useToken';
import jwt from 'jwt-decode'

function NavBar() {
    const { token } = useToken();
    const { collapseSidebar } = useProSidebar();
    const user = jwt(token);
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home"><FaIcons.FaStream onClick={() => collapseSidebar()}/>{'\t'}CSC</Navbar.Brand>
                    
                    <Navbar.Toggle />
                    
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">{user.firstname + " " + user.lastname}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;