import React  from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Login() {
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
                    <Form>
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
                            <Form.Control type="email" placeholder="lastname" />
                        </FloatingLabel>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formEmail">
                        <FloatingLabel
                            controlId="floatingEmail"
                            label="Email address"
                            className="mb-3"
                            >
                            <Form.Control type="email" placeholder="Email" />
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
                            <Form.Control type="password" placeholder="Password" />
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
                            <Form.Control type="password" placeholder="Password" />
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