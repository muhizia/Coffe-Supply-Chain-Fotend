import React from 'react'
import * as FaIcons from "react-icons/fa";
import Button from 'react-bootstrap/esm/Button';
// deconstructed props
function ShipmentRow({ shipment: { ID, shipment_ID, origin, destination, quantities, status }, handleDelete, handleEdit, handleDetails }) {

    return (
        <tr key={ID}>
            <td>{ID}</td>
            <td>{shipment_ID}</td>
            <td>{origin}</td>
            <td>{destination}</td>
            <td>{quantities}</td>
            <td>{status}</td>
            <td><Button onClick={() => handleEdit(ID)} className='edit'><FaIcons.FaPen /></Button>{'\t'}<Button onClick={() => handleDelete(ID)} className='delete'><FaIcons.FaTrashAlt /></Button>{'\t'}<Button onClick={() => handleDetails(ID)} className='details'><FaIcons.FaRegListAlt /></Button></td>
        </tr>
    )
}
export default ShipmentRow;