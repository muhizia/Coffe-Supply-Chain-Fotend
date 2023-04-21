import React from 'react';
import { useEffect, useState } from 'react';
import Company from "./tables/Company";


const Producers = ({ prod }) => {
    const [producers, setProducers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/producer')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducers(data.producers);
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
                <Company
                    prod={prod}
                    companies={producers}
                    onUpdateProducer={onUpdateProducer}
                />
            </div>
        </>
    );
};

export default Producers;