import React from 'react'
import * as FaIcons from "react-icons/fa";

// deconstructed props
function ProducerRow({company:{ID, Name, Country, Region, Address} }) {

  return (
        <tr key={ID}>
            <td>{ID}</td>
            <td>{Name}</td>
            <td>{Country}</td>
            <td>{Region}</td>
            <td>{Address}</td>
            <td><FaIcons.FaPen />{'\t'}<FaIcons.FaTrashAlt /></td>
        </tr>
  )
}
export default ProducerRow;