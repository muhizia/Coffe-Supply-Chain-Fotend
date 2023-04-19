import React, { useState } from 'react';
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'

export default function Login() {
    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
        {
            username: "user1@admin.com",
            password: "pass1"
        },
        {
            username: "user2@admin.com",
            password: "pass2"
        }
    ];

    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find((user) => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: "pass", message: errors.pass });
            } else {
                navigate('/register');
            }
        } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
        }
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );
    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <div className="border border-3 border-primary"></div>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3 mt-md-4">
                                    <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center align-items-center">Login</h2>
                                    <p className="d-flex justify-content-center align-items-center mb-5">Please enter your login and password!</p>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <FloatingLabel controlId="floatingEmail" label="Email address">
                                                    <Form.Control type="email" name="uname" placeholder="Enter email" />
                                                </FloatingLabel>
                                                {renderErrorMessage("uname")}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                <FloatingLabel controlId="floatingPassword" label="Password">
                                                    <Form.Control type="password" name="pass" placeholder="Password" />
                                                </FloatingLabel>
                                                {renderErrorMessage("pass")}
                                            </Form.Group>
                                            
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <p className="small">
                                                    <a className="text-primary" href="/forgot">
                                                        Forgot password?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0  text-center">
                                                Don't have an account?{" "}
                                                <a href="/register" className="text-primary fw-bold">
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}