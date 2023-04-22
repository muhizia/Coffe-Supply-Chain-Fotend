import React, { useState, useRef } from 'react'
import ShipmentRow from './ShipmRow'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalShip from '../ModalShip';
import * as FaIcons from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import '../../css/Table.css'

function Shipment({ shipments }) {
    const [show, setShow] = useState(false);
    const ref = useRef();
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const navigate = useNavigate();

    const handleEdit = (id) => {
        // setShow(true);
        // ref.current.handleEdit(id)
    }
    const handleDelete = (id) => {
        // setShow(true);
        // ref.current.handleDelete(id)
    }
    const handleDetails = (id) => {
        navigate(`/details/${id}`)
    }
    return (
        <div className='Table'>
            <OverlayTrigger overlay={<Tooltip key="top" placement="top" id="tooltip-top">Add a shipment</Tooltip>}>
                <span className="d-inline-block">
                    <Button onClick={() => handleShow()}><FaIcons.FaPlus /></Button>
                </span>
            </OverlayTrigger>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Shipment ID</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Quantities (KG)</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* iterate through the companys array and render a unique Shipment component for each company object in the array */}
                    {shipments.map(shipment => <ShipmentRow handleDelete={handleDelete} handleEdit={handleEdit} handleDetails={handleDetails} key={shipment.ID} shipment={shipment} />)}
                </tbody>
            </Table>
            <ModalShip ref={ref} handleClose={handleClose} show={show} />
        </div>
    )
}

export default Shipment