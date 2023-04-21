import React from 'react';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Company from "./tables/Company";
import useToken from './useToken';

const BASE_URL = 'http://localhost:4000'
const Producers = ({ prod }) => {
    const [producers, setProducers] = useState([]);
    const { token } = useToken();
    useEffect(() => {
        fetch(BASE_URL + '/producer', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    // update producers on page after edit
    function onUpdateProducer(updatedProducer) {
        const updatedProducers = producers.map(
            producer => {
                if (producer.id === updatedProducer.id) {
                    return updatedProducer
                } else { return producer }
            }
        )
        setProducers(updatedProducers)
    }
    return (
        <>
            <div>
                {!producers.success ? <Alert key={'danger'} variant={'danger'}>
                    {producers.message}
                </Alert> : <Company
                    prod={prod}
                    companies={producers.producers}
                    onUpdateProducer={onUpdateProducer}
                />}
            </div>
        </>

    );
};

export default Producers;