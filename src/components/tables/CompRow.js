import React from 'react'
import * as FaIcons from "react-icons/fa";
import Button from 'react-bootstrap/esm/Button';
// deconstructed props
function ProducerRow({company:{ID, Name, Country, Region, Address}, handleDelete, handleEdit }) {
  
  return (
        <tr key={ID}>
            <td>{ID}</td>
            <td>{Name}</td>
            <td>{Country}</td>
            <td>{Region}</td>
            <td>{Address}</td>
            <td><Button onClick={()=>handleEdit(ID)} className='edit'><FaIcons.FaPen /></Button>{'\t'}<Button onClick={()=>handleDelete(ID)} className='delete'><FaIcons.FaTrashAlt /></Button></td>
        </tr>
  )
}
export default ProducerRow;