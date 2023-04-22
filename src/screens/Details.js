import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import useToken from '../components/useToken';
import { useParams } from 'react-router-dom'

const BASE_URL = 'http://localhost:4000'
function BasicExample() {
  const [shipments, setShipments] = useState([]);
  const { token } = useToken();
  const { shipment_id } = useParams()
  useEffect(() => {
    fetch(BASE_URL + `/shipment/details/${shipment_id}`, {
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
  return (
    <Container>
      <br />
      <Row>
        {!shipments.success ? <Alert key={'danger'} variant={'danger'}>
          {shipments.message}
        </Alert> :
          shipments.shipments.map(shipment => <Col>
            <Card border={shipment.status === "Pending" ? "danger": shipment.status === "Delivered" ? "success": "info"} style={{ width: '18rem' }}>
              <Card.Header>{shipment.status}</Card.Header>
              <Card.Body>
                <Card.Title>{shipment.stages}</Card.Title>
                <Card.Text>
                  {shipment.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>)}
      </Row>
    </Container>
  );
}

export default BasicExample;