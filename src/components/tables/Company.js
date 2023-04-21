import React, { useState, useRef } from 'react'
import CompanyRow from './CompRow'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalComp from '../ModalComp';
import * as FaIcons from "react-icons/fa";
import '../../css/Table.css'

function Company({ companies, prod }) {
    const [show, setShow] = useState(false);
    const ref = useRef();
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)
    const handleEdit = (id) => {
        setShow(true);
        ref.current.handleEdit(id)
    }
    const handleDelete = (id) => {
        setShow(true);
        ref.current.handleDelete(id)
    }
    return (
        <div className='Table'>
            <OverlayTrigger overlay={<Tooltip key="right" placement="right" id="tooltip-right">Add a company</Tooltip>}>
                <span className="d-inline-block">
                    <Button onClick={() => handleShow()}><FaIcons.FaPlus /></Button>
                </span>
            </OverlayTrigger>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Company ID</th>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Region</th>
                        <th>Addresses</th>
                        <th>{show}</th>
                    </tr>
                </thead>
                <tbody>
                    {/* iterate through the companys array and render a unique Company component for each company object in the array */}
                    {companies.map(company => <CompanyRow handleDelete={handleDelete} handleEdit={handleEdit} key={company.ID} company={company} />)}
                </tbody>
            </Table>
            <ModalComp ref={ref} handleClose={handleClose} show={show} prod={prod} />
        </div>
    )
}

export default Company