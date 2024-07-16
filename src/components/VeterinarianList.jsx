import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import VeterinarianFormModal from './VeterinarianFormModal';
import ConfirmationModal from './ConfirmationModal'; // Importa el nuevo componente

const DATABASE_URL = 'https://proyecto-final-backend-tn7e.onrender.com';

const VeterinarianList = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Estado para el modal de confirmación
  const [selectedVeterinarian, setSelectedVeterinarian] = useState(null); // Veterinario seleccionado para eliminación

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`);
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
      } else {
        console.error('Error eliminando el veterinario');
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