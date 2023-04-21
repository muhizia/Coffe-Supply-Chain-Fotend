import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';

const BASE_URL = 'http://localhost:4000';

const ModalComp = forwardRef(({ show, handleClose, prod }, ref) => {
    const [countries, setCountries] = useState(undefined)
    const [regions, setRegions] = useState(undefined)
    const [countryValue, setCountryValue] = useState(0)
    const [regionValue, setRegionValue] = useState(0)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const [edit, setEdit] = useState(false)
    const [del, setDel] = useState(false)

    const formRef = useRef(null);
    // Form fields
    // const [countryIsInvalid, setCountryIsInvalid] = useState(false)
    // const [regionIsInvalid, setRegionIsInvalid] = useState(false)
    const [validated, setValidated] = useState(false);


    useImperativeHandle(ref, () => ({
        handleEdit(id) {
            setEdit(true)
            getCompbyID(id)
        },
        handleDelete(id) {
            console.log("Aristide", id)
        }
    }));

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false || event.target[1].value === "0" || event.target[2].value === "0") {
            event.stopPropagation();
            setValidated(true);
        }
        else {
            console.log({ name: event.target[0].value, address: event.target[3].value, region_id: event.target[2].value })
            create({ name: event.target[0].value, address: event.target[3].value, region_id: event.target[2].value }, prod)
        }

    };

    const handleReset = () => {
        formRef.current.reset();
        setValidated(false);
    };

    const changeCountry = event => {
        console.log(typeof event.target.value);
        setCountryValue(event.target.value);
        fetchRegions(event.target.value)
    }
    const changeRegion = event => {
        setRegionValue(event.target.value);

    };
    const fetchRegions = (value) => {
        fetch(BASE_URL + '/region/country/' + value)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setRegions(data.region);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const getCompbyID = (id) => {
        const path = prod ? '/producer/' : '/supplier/';
        fetch(BASE_URL + path + id)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // TODO: set form
                    setForm(data.producer)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(() => {
        fetch(BASE_URL + '/country')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setCountries(data.countries);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);


    // Example POST method implementation:
    const create = (data = {}, prod) => {
        const path = prod ? '/producer' : '/supplier';
        fetch(BASE_URL + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setValidated(false);
                    handleReset();
                    setError(false)
                    setSuccess(true)
                    // set
                } else {
                    setError(true)
                    setSuccess(false)
                    setMessage(data.message)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const setForm = (producer) => {
        console.log(producer)
    }


    return (
        <Modal show={show}>
            <Modal.Body>
                <Button style={{ backgroundColor: 'white', borderColor: 'white', color: 'brown' }} onClick={handleClose} variant="secondary">
                    <FaIcons.FaTimes />
                </Button>
                <Row className="vh-50 d-flex justify-content-center align-items-center">
                    <Col md={12} lg={12} xs={12}>
                        <div className="mb-3 mt-md-4">
                            <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center align-items-center">{prod ? "Add a producer" : "Add a supplier"}</h2>
                            <p className="d-flex justify-content-center align-items-center mb-5">Please enter the details</p>
                            {error && <Alert key="danger" variant="danger">
                                {message}
                            </Alert>}
                            {success && <Alert key="success" variant="success">
                                A{prod ? " producer" : " supplier"} successfully added.
                            </Alert>}
                            <div className="mb-3">
                                <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formCompanyName">
                                        <FloatingLabel
                                            controlId="floatingFirstname"
                                            label="Enter company name"
                                            className="mb-3"
                                        >
                                            <Form.Control required type="text" placeholder="Enter " />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a {prod ? "Producer " : "Supplier "} name.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>

                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formCountry">
                                        <FloatingLabel
                                            controlId="floatingLastname"
                                            label="Country"
                                            className="mb-3"
                                        >
                                            {/* <Form.Control type="text" placeholder="country" /> */}
                                            <Form.Select onChange={changeCountry} value={countryValue} required>
                                                <option value="">Select a country</option>
                                                {countries && countries.map((country) =>
                                                    <option key={country.id} value={country.id}>{country.names}</option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formRegion">
                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Region"
                                            className="mb-3"
                                        >
                                            <Form.Select onChange={changeRegion} value={regionValue} required>
                                                <option value="">Select a region</option>
                                                {regions && regions.map((region) =>
                                                    <option key={region.id} value={region.id}>{region.names}</option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formAddress"
                                    >
                                        <FloatingLabel
                                            controlId="floatingPassword"
                                            label="Enter Addresses"
                                            className="mb-3"
                                        >
                                            <Form.Control required type="text" placeholder="Address" />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide an address.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    >
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            {prod ? "Add a producer" : "Add a supplier"}
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
});

export default ModalComp;