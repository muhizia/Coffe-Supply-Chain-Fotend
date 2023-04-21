import React from 'react';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Shipment from "../components/tables/Shipment";
import useToken from '../components/useToken';

const BASE_URL = 'http://localhost:4000'
const Shipments = () => {
    const [shipments, setShipments] = useState([]);
    const { token } = useToken();
    useEffect(() => {
        fetch(BASE_URL + '/shipment', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setShipments(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    // update shipments on page after edit
    function onUpdateShipment(updatedShipment) {
        const updatedShipments = shipments.map(
            shipment => {
                if (shipment.id === updatedShipment.id) {
                    return updatedShipment
                } else { return shipment }
            }
        )
        setShipments(updatedShipments)
    }
    return (
        <>
            <div>
                {!shipments.success ? <Alert key={'danger'} variant={'danger'}>
                    {shipments.message}
                </Alert> : <Shipment
                    shipments={shipments.shipments}
                    onUpdateShipment={onUpdateShipment}
                />}
            </div>
        </>

    );
};

export default Shipments;