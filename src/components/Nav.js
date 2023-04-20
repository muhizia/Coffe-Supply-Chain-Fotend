import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'
import * as FaIcons from "react-icons/fa";
import { useProSidebar } from 'react-pro-sidebar';

function NavBar() {
    const { collapseSidebar } = useProSidebar();
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="#home"><FaIcons.FaStream onClick={() => collapseSidebar()}/>{'\t'}CSC</Navbar.Brand>
                    {/* <Nav className="me-auto">
                        <Nav.Link href="/producers">Producer</Nav.Link>
                        <Nav.Link href="#features">Supplier</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav> */}
                    <Navbar.Toggle />
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Aristide M.</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default NavBar;