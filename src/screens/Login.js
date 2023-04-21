import React, { useState } from 'react';
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../css/login.css'
const BASE_URL = 'http://localhost:4000';
export default function Login({ setToken }) {
    // const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState({});
    const [message, setMessage] = useState("");

    const errors = {
        email: "invalid username",
        password: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var { email, password } = document.forms[0];
        // Find user login info
        // const userData = database.find((user) => user.username === uname.value);
        fetch(BASE_URL + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email.value, password: password.value }),
        }).then((res) => {
            console.log(res.status); // Will show you the status

            if (res.status === 401) setErrorMessages({ name: "password", message: errors.password });
            else if (res.status === 400) setErrorMessages({ name: "email", message: errors.email });
            return res.json();

        }).then((data) => {
            if (data.success) {
                // navigate('/dashboard');
                setToken(data.token);
                // console.log(data)
            } else {
                setMessage(data.message)
            }
        }).catch((err) => {
            console.log(err.message);
        });
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
                                    <div className="error d-flex justify-content-center align-items-center">{message}</div>
                                    <div className="mb-3">
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <FloatingLabel controlId="floatingEmail" label="Email address">
                                                    <Form.Control type="email" name="email" placeholder="Enter email" />
                                                </FloatingLabel>
                                                {renderErrorMessage("email")}
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword" >
                                                <FloatingLabel controlId="floatingPassword" label="Password">
                                                    <Form.Control type="password" name="password" placeholder="Password" />
                                                </FloatingLabel>
                                                {renderErrorMessage("password")}
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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};