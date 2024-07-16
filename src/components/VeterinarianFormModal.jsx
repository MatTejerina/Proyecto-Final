import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DATABASE_URL = 'https://proyecto-final-backend-tn7e.onrender.com';

const VeterinarianFormModal = ({ show, handleClose, onSave }) => {
  const [prefix, setPrefix] = useState('Dr.');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSave = async () => {
    const veterinarianData = {
      name: `${prefix} ${firstName} ${lastName}`,
    };

    console.log('Sending veterinarian data:', veterinarianData);

    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(veterinarianData),
      });
      const data = await response.json();
      console.log('Veterinarian created:', data);
      onSave();
      handleCloseModal();
    } catch (error) {
      console.error('Error creating veterinarian:', error);
      alert(`Error al guardar el veterinario: ${error.message}`);
    }
  };

  const resetForm = () => {
    setPrefix('Dr.');
    setFirstName('');
    setLastName('');
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Veterinario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              as="select"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
            >
              <option value="Dr.">Dr.</option>
              <option value="Dra.">Dra.</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!firstName || !lastName}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VeterinarianFormModal;