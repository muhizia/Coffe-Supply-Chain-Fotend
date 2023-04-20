import React from 'react';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Company from "./tables/Company";


const Suppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/supplier')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setSuppliers(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);
    // update suppliers on page after edit
    function onUpdateSupplier(updatedSupplier) {
        const updatedSuppliers = suppliers.map(
            supplier => {
                if (supplier.id === updatedSupplier.id) {
                    return updatedSupplier
                } else { return supplier }
            }
        )
        setSuppliers(updatedSuppliers)
    }
    return (
        <>
            <div>
      {!suppliers.success ? <Alert key={'danger'} variant={'danger'}>
                                {suppliers.message}
                            </Alert> :
        <Company companies={suppliers.suppliers} onUpdateSupplier={onUpdateSupplier}
      />}
    </div>
        </>
    );
};

export default Suppliers;