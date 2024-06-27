import React, { useState, useEffect } from 'react';
import { ListGroup, Button, Modal, Form } from 'react-bootstrap';

const DATABASE_URL = 'http://localhost:4500';

const PetUsersComponent = ({ userId }) => {
  const [userPets, setUserPets] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [formValues, setFormValues] = useState({
    name: '',
    type: '',
    race: '',
    age: '',
  });

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const response = await fetch(`${DATABASE_URL}/pets/owner/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las mascotas del usuario');
        }
        const petsData = await response.json();
        setUserPets(petsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPets();
  }, [userId]);

  const handleFormChange = (data) => {
    const { name, value } = data.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddPet = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/pets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, ownerId: userId })
      });
      if (!response.ok) {
        throw new Error('Error al agregar la mascota');
      }
      const newPet = await response.json();
      setUserPets([...userPets, newPet]);
      setShowAddModal(false);
      setFormValues({ name: '', type: '', age: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPet = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/pets/${selectedPet._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formValues, ownerId: userId })
      });
      if (!response.ok) {
        throw new Error('Error al editar la mascota');
      }
      const updatedPet = await response.json();
      setUserPets(userPets.map(pet => (pet._id === updatedPet._id ? updatedPet : pet)));
      setShowEditModal(false);
      if (selectedPet) {
        setSelectedPet(null);
        setFormValues({ name: '', type: '', age: '', race:'' });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleDeletePet = async (petId) => {
    try {
      const response = await fetch(`${DATABASE_URL}/pets/${petId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la mascota');
      }
      setUserPets(userPets.filter(pet => pet._id !== petId));
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (pet) => {
    setSelectedPet(pet);
    setFormValues({ name: pet.name, type: pet.type, race: pet.race, age: pet.age });
    setShowEditModal(true);
  };

  return (
    <div>
      <Button variant="primary" size='sm' className=' mb-1' onClick={() => setShowAddModal(true)}>Agregar Mascota</Button>
      <ListGroup>
        {userPets.map(pet => (
          <ListGroup.Item className='' key={pet._id}>
            <strong>Nombre:</strong> {pet.name}<br />
            <strong>Tipo:</strong> {pet.type}<br />
            <strong>Raza:</strong> {pet.race}<br />
            <strong>Edad:</strong> {pet.age}
            <div className=' d-flex justify-content-end'>
              <Button variant="warning" size='sm' onClick={() => openEditModal(pet)} className=' ms-2'>Editar</Button>
              <Button variant="danger" size='sm' onClick={() => handleDeletePet(pet._id)} className=' ms-2'>Eliminar</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Modal para agregar mascota */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={formValues.name} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" name="type" value={formValues.type} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Raza</Form.Label>
              <Form.Control type="text" name="race" value={formValues.race} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Edad</Form.Label>
              <Form.Control type="number" name="age" value={formValues.age} onChange={handleFormChange} />
            </Form.Group>
            <Button variant="primary" className=' mt-2' onClick={handleAddPet}>Agregar</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para editar mascota */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Mascota</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="name" value={formValues.name} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" name="type" value={formValues.type} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Raza</Form.Label>
              <Form.Control type="text" name="race" value={formValues.race} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Edad</Form.Label>
              <Form.Control type="number" name="age" value={formValues.age} onChange={handleFormChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleEditPet}>Guardar Cambios</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PetUsersComponent;