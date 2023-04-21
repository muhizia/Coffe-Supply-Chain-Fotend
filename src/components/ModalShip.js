import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import * as FaIcons from "react-icons/fa";
import Alert from 'react-bootstrap/Alert';
import useToken from './useToken';
import jwt from 'jwt-decode';

const BASE_URL = 'http://localhost:4000';
const ModalShip = forwardRef(({ show, handleClose }, ref) => {
    const [producers, setProducers] = useState(undefined)
    const [suppliers, setSuppliers] = useState(undefined)
    const [countryValue, setCountryValue] = useState(0)
    const [supplierValue, setSupplierValue] = useState(0)
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("")
    const [edit, setEdit] = useState(false)
    const [statusValue, setStatusValue] = useState(false)
    const { token } = useToken();
    const formRef = useRef(null);
    // Form fields
    // const [countryIsInvalid, setCountryIsInvalid] = useState(false)
    // const [regionIsInvalid, setRegionIsInvalid] = useState(false)
    const [validated, setValidated] = useState(false);


    useImperativeHandle(ref, () => ({
        handleEdit(id) {
            setEdit(true)
            getCompbyID(id)
            const user = jwt(token);
            console.log(user)
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
            
            create({
                "origin_id": event.target[0].value,
                "destination_id": event.target[1].value,
                "quantity": event.target[2].value,
                "status": event.target[3].value
              });
        }

    };

    const handleReset = () => {
        formRef.current.reset();
        setValidated(false);
    };

    const changeProducer = event => {
        setCountryValue(event.target.value);
        // fetchSuppliers(event.target.value)
    }
    const changeSupplier = event => {
        setSupplierValue(event.target.value);

    };
    const changeStatus = event => {
        setStatusValue(event.target.value);
    }
    const fetchProducers = () => {
        fetch(BASE_URL + '/producer', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducers(data.producers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const fetchSuppliers = () => {
        fetch(BASE_URL + '/supplier', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSuppliers(data.suppliers);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    const getCompbyID = (id) => {
        const path = '/shipment/';
        fetch(BASE_URL + path + id, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            }
        }).then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    // TODO: set form
                    setForm(data.shipments)
                } else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
    useEffect(() => {
        fetchProducers();
        fetchSuppliers();
    }, []);


        const create = (data = {}) => {
        const path = '/shipment';
        fetch(BASE_URL + path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
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
    const setForm = (shipment) => {
        console.log(shipment)
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
                            <h2 className="fw-bold mb-2 text-uppercase d-flex justify-content-center align-items-center">Add a shipment</h2>
                            <p className="d-flex justify-content-center align-items-center mb-5">Please enter the details</p>
                            {error && <Alert key="danger" variant="danger">
                                {message}
                            </Alert>}
                            {success && <Alert key="success" variant="success">
                                A Shipment successfully added.
                            </Alert>}
                            <div className="mb-3">
                                <Form ref={formRef} noValidate validated={validated} onSubmit={handleSubmit}>
                                    

                                    <Form.Group className="mb-3" controlId="formCountry">
                                        <FloatingLabel
                                            controlId="floatingLastname"
                                            label="Origin"
                                            className="mb-3"
                                        >
                                            {/* <Form.Control type="text" placeholder="country" /> */}
                                            <Form.Select onChange={changeProducer} value={countryValue} required>
                                                <option value="">Select a producer</option>
                                                {producers && producers.map((producer) =>
                                                    <option key={producer.ID} value={producer.ID}>{producer.Name}</option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formRegion">
                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Destination"
                                            className="mb-3"
                                        >
                                            <Form.Select onChange={changeSupplier} value={supplierValue} required>
                                                <option value="">Select a destination</option>
                                                {suppliers && suppliers.map((supplier) =>
                                                    <option key={supplier.ID} value={supplier.ID}>{supplier.Name}</option>
                                                )}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formCompanyName">
                                        <FloatingLabel
                                            controlId="floatingFirstname"
                                            label="Quantities (KG)"
                                            className="mb-3"
                                        >
                                            <Form.Control required type="number" placeholder="Enter " />
                                            <Form.Control.Feedback type="invalid">
                                                Please provide a shipment name.
                                            </Form.Control.Feedback>
                                        </FloatingLabel>

                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formRegion">
                                        <FloatingLabel
                                            controlId="floatingEmail"
                                            label="Destination"
                                            className="mb-3"
                                        >
                                            <Form.Select onChange={changeStatus} value={statusValue} required>
                                                <option value="">Select a status</option>
                                                <option key="1" value="Pending">Pending</option>
                                                <option key="2" value="In transit">In transit</option>
                                                <option key="3" value="Delivered">Delivered</option>
                                                
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group
                                        className="mb-3"
                                        controlId="formBasicCheckbox"
                                    >
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            Add a shipment
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

export default ModalShip;