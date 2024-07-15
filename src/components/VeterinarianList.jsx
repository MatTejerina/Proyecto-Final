import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import VeterinarianFormModal from './VeterinarianFormModal';
import ConfirmationModal from './ConfirmationModal';

const DATABASE_URL = 'http://localhost:4500';

const VeterinarianList = ({ onUpdateAppointments }) => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedVeterinarian, setSelectedVeterinarian] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVeterinarians(data);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  const handleSave = () => {
    fetchData();
  };

  const handleDeleteVeterinarian = (vetId) => {
    setSelectedVeterinarian(vetId);
    setShowConfirmationModal(true);
  };

  const confirmDeleteVeterinarian = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians/${selectedVeterinarian}`, { method: 'DELETE' });
      if (response.ok) {
        fetchData();
        onUpdateAppointments(); // Notificar a AdminPage que se ha actualizado la lista de veterinarios
      } else {
        const errorData = await response.json();
        console.error('Error eliminando el veterinario:', errorData.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error eliminando el veterinario:', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setShowModal(true)} className='mb-2'>Agregar Veterinario</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre y Apellido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {veterinarians.map((vet) => (
            <tr key={vet._id}>
              <td>{vet.name} {vet.lastName}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteVeterinarian(vet._id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <VeterinarianFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleSave}
      />

      <ConfirmationModal
        show={showConfirmationModal}
        handleClose={() => setShowConfirmationModal(false)}
        handleConfirm={confirmDeleteVeterinarian}
        message="¿Estás seguro de que deseas eliminar este veterinario y todos sus turnos asociados?"
      />
    </div>
  );
};

export default VeterinarianList;

