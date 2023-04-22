import React, { useState } from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';

const BASE_URL = 'http://localhost:4000'
export default function Register() {
  const [errorMessages, setErrorMessages] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const errors = {
    email: "invalid username",
    password: "invalid password",
    re_type: "Password does not match"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { email, password, re_type } = document.forms[0];
    // Find user login info
    // const userData = database.find((user) => user.username === uname.value);
    fetch(BASE_URL + '/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value, re_type: re_type.value }),
    }).then((res) => {
      console.log(res.status); // Will show you the status

      if (res.status === 401) {
        setIsError(true)
        setMessage(res.message);
      }
      else if (res.status === 400) {
        setIsError(true)
        setMessage(res.message);
       }
      return res.json();

    }).then((data) => {
      if (data.success) {
        // navigate('/dashboard');
        setSuccess(true)
        window.location.reload(false)
        setIsError(false)
      } else {
        setMessage(data.message)
        setIsError(true)
      }
    }).catch((err) => {
      console.log(err.message);
      setIsError(false)
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
                  <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center align-items-center">Register</h2>
                  <p className="d-flex justify-content-center align-items-center mb-5">Please enter the details</p>
                  <div className="mb-3">
                  {
                      success && <Alert key="success" variant="success">
                        A User successfully added.
                      </Alert>
                    }
                    {
                      isError && <Alert key="danger" variant="danger">
                        {message}
                      </Alert>
                    }
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formFirstName">
                        <FloatingLabel
                          controlId="floatingFirstname"
                          label="Enter firstname"
                          className="mb-3"
                        >
                          <Form.Control type="text" placeholder="Enter firstname" />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formLastName">
                        <FloatingLabel
                          controlId="floatingLastname"
                          label="Enter lastname"
                          className="mb-3"
                        >
                          <Form.Control type="text" placeholder="lastname" />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <FloatingLabel
                          controlId="floatingEmail"
                          label="Email address"
                          className="mb-3"
                        >
                          <Form.Control type="email" name="email" placeholder="Email" />
                          {renderErrorMessage("email")}
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formPassword"
                      >
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Enter password"
                          className="mb-3"
                        >
                          <Form.Control type="password" name="password" placeholder="Password" />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formRetypePassword"
                      >
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Retype password"
                          className="mb-3"
                        >
                          <Form.Control type="password" name="re_type" placeholder="Password" />
                        </FloatingLabel>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Register
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Login
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