import React from 'react'
import * as FaIcons from "react-icons/fa";
import Button from 'react-bootstrap/esm/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

// deconstructed props
function ShipmentRow({ shipment: { ID, shipment_ID, origin, destination, quantities, status }, handleDelete, handleEdit, handleDetails }) {
    return (
        <tr key={ID}>
            <td>{shipment_ID}</td>
            <td>{origin}</td>
            <td>{destination}</td>
            <td>{quantities}</td>
            <td>{status}</td>
            <td>
                <OverlayTrigger overlay={<Tooltip key="top-1" placement="right" id="tooltip-right">Edit details</Tooltip>}>
                    <Button onClick={() => handleEdit(ID)} className='edit'><FaIcons.FaPen /></Button>
                </OverlayTrigger>{'\t'}
                <OverlayTrigger overlay={<Tooltip key="top-2" placement="right" id="tooltip-right">Check details</Tooltip>}>
                    <Button onClick={() => handleDetails(shipment_ID)} className='details'><FaIcons.FaRegListAlt /></Button>
                </OverlayTrigger>{'\t'}
                <OverlayTrigger overlay={<Tooltip key="top-3" placement="right" id="tooltip-right">Delete details</Tooltip>}>
                    <Button onClick={() => handleDelete(ID)} className='delete'><FaIcons.FaTrashAlt /></Button>
                </OverlayTrigger>{'\t'}
            </td>
        </tr>
    )
}
export default ShipmentRow;