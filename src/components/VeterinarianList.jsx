import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import VeterinarianFormModal from './VeterinarianFormModal';

const DATABASE_URL = 'http://localhost:4500';

const VeterinarianList = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${DATABASE_URL}/veterinarians`);
        const data = await response.json();
        setVeterinarians(data);
      } catch (error) {
        console.error('Error fetching veterinarians:', error);
      }
    };
    fetchData();
  }, []);

  const handleSave = () => {
    fetchData();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`);
      const data = await response.json();
      setVeterinarians(data);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Agregar Veterinario</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {veterinarians.map((vet) => (
            <tr key={vet._id}>
              <td>{vet.name}</td>
              <td>{vet.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <VeterinarianFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </div>
  );
};

export default VeterinarianList;