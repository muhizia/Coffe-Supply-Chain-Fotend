import React, { useState, useEffect } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from "react-icons/fa";
// import  URLS  from './Vars';

const ModalComp = ({ show, handleClose }) => {
    const [countries, setCountries] = useState(undefined)
    const [regions, setRegions] = useState(undefined)
    const [countryValue, setCountryValue] = useState(0)
    const [regionValue, setRegionValue] = useState(0)
    const changeCountry = event => {
        console.log(event.target.value);
        setCountryValue(event.target.value);
        fetchRegions(event.target.value)
    }
    const changeRegion = event => {
        setRegionValue(event.target.value);
    };
    const fetchRegions = (value) => {
        fetch('http://localhost:4000/region/country/' + value)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setRegions(data.region);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(() => {
        fetch('http://localhost:4000/country')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCountries(data.countries);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    return (
        <Modal show={show}>
            <Modal.Body>
                <Button onClick={handleClose} variant="secondary">
                    <FaIcons.FaTimes />
                </Button>
                <Row className="vh-50 d-flex justify-content-center align-items-center">
                    <Col md={12} lg={12} xs={12}>
                        <div className="mb-3 mt-md-4">
                            <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center align-items-center">Register</h2>
                            <p className="d-flex justify-content-center align-items-center mb-5">Please enter the details</p>
                            <div className="mb-3">
                                <Form>
                                    <Form.Group className="mb-3" controlId="formFirstName">
                                        <FloatingLabel
                                            controlId="floatingFirstname"
                                            label="Enter company name"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="Enter " />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formLastName">
                                        <FloatingLabel
                                            controlId="floatingLastname"
                                            label="Country"
                                            className="mb-3"
                                        >
                                            {/* <Form.Control type="text" placeholder="country" /> */}
                                            <Form.Select onChange={changeCountry} value={countryValue}>
                                                <option value="0">Select a country</option>
                                                {countries && countries.map((country) =>
                                                    <option key={country.id} value={country.id}>{country.names}</option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Region"
                                            className="mb-3"
                                        >
                                            <Form.Select onChange={changeRegion} value={regionValue}>
                                                <option value="0">Select a region</option>
                                                {regions && regions.map((region) =>
                                                    <option key={region.id} value={region.id}>{region.names}</option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formPassword"
                                    >
                                        <FloatingLabel
                                            controlId="floatingPassword"
                                            label="Enter Addresses"
                                            className="mb-3"
                                        >
                                            <Form.Control type="text" placeholder="Address" />
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
                            </div>
                        </div>

                    </Col>
                </Row>
                {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
            </Modal.Body>


        </Modal>
    )
}

export default ModalComp;