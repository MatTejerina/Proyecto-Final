import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const DATABASE_URL = 'http://localhost:4500';

const VeterinarianFormModal = ({ show, handleClose, onSave }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = async () => {
    const veterinarianData = {
      name,
      email,
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
    setName('');
    setEmail('');
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
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!name || !email}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VeterinarianFormModal;