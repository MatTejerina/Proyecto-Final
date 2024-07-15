import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Card, Button, Modal, Form } from 'react-bootstrap';
import PetUsersComponent from '../components/PetUsersComponent';

const DATABASE_URL = 'https://proyecto-final-backend-tn7e.onrender.com';

const PatientPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPetsModal, setShowPetsModal] = useState(false);
  const [addFormValues, setAddFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dni: '',
    phone: '',
    password: '',
    isAdmin: false
  });
  const [editFormValues, setEditFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    dni: '',
    phone: '',
    password: '',
    isAdmin: false
  });

  useEffect(() => {
    getUsers();
  }, []);
  //traer lista de ususarios
  const getUsers = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error al recuperar el usuario:", error);
    }
  };

  const handleUserClick = (user) => setSelectedUser(user);
  //agregar usuarios
  const handleAddUser = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addFormValues)
      });
      if (response.ok) {
        getUsers();
        setShowAddModal(false);
        setAddFormValues({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          dni: '',
          phone: '',
          password: '',
          isAdmin: false
        });
      } else {
        console.error("Error al agregar usuario");
      }
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };
  //editar ususarios
  const handleEditUser = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/users/${selectedUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormValues)
      });
      if (response.ok) {
        getUsers();
        setShowEditModal(false);
        setEditFormValues({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          dni: '',
          phone: '',
          password: '',
          isAdmin: false
        });
      } else {
        console.error("Error al editar usuario");
      }
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };
  //eliminar usuarios
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${DATABASE_URL}/users/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        getUsers();
        setSelectedUser(null);
      } else {
        console.error("Error al eliminar usuario:", error);
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleFormChange = (event, setFormValues) => {
    const { name, value, type, checked } = event.target;
    setFormValues(prevValues => ({ ...prevValues, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleShowPetsModal = (user) => {
    setSelectedUser(user);
    setShowPetsModal(true);
  };

  return (
    <Container className='mb-3'>
      <Row className="mt-3">
        <Col>
          <h2 className="text-center">Lista de Dueños y Mascotas</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Button onClick={() => setShowAddModal(true)}>Agregar Dueño</Button>
        </Col>
      </Row>
      <Row className="mt-3 justify-content-center">
        <Col sm={10} md={4} lg={4} className="ms-1">
          <ListGroup className=' d-flex justify-content-between'>
            {users.map((user) => (
              <ListGroup.Item key={user._id} onClick={() => handleUserClick(user)} className="d-flex justify-content-between align-items-center">
                <div>
                  {user.firstName} {user.lastName}
                </div>
                <div>
                  <Button variant="info" size="sm" onClick={() => handleShowPetsModal(user)}>Mascotas</Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        {selectedUser && (
          <Col sm={10} md={4} lg={4} className="ms-1">
            <Card>
              <Card.Body>
                <Card.Title className='text-center'>{selectedUser.firstName} {selectedUser.lastName}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {selectedUser.email}<br />
                  <strong>Address:</strong> {selectedUser.address}<br />
                  <strong>DNI:</strong> {selectedUser.dni}<br />
                  <strong>Phone:</strong> {selectedUser.phone}<br />
                  <strong>Admin:</strong> {selectedUser.isAdmin ? 'Si' : 'No'}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="warning" size="sm" onClick={() => { setEditFormValues(selectedUser); setShowEditModal(true); }} className="ms-2">Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteUser(selectedUser._id)} className="ms-2">Eliminar</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>

      {/* Modal para agregar usuario */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Dueño</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="firstName" value={addFormValues.firstName} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="lastName" value={addFormValues.lastName} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={addFormValues.email} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" name="address" value={addFormValues.address} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="dni" value={addFormValues.dni} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="phone" value={addFormValues.phone} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={addFormValues.password} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Admin" name="isAdmin" checked={addFormValues.isAdmin} onChange={(e) => handleFormChange(e, setAddFormValues)} />
            </Form.Group>
            <Button variant="primary" onClick={handleAddUser}>Agregar</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Dueño</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="firstName" value={editFormValues.firstName} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="lastName" value={editFormValues.lastName} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={editFormValues.email} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" name="address" value={editFormValues.address} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="dni" value={editFormValues.dni} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="phone" value={editFormValues.phone} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={editFormValues.password} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group> */}
            <Form.Group>
              <Form.Check type="checkbox" label="Admin" name="isAdmin" checked={editFormValues.isAdmin} onChange={(e) => handleFormChange(e, setEditFormValues)} />
            </Form.Group>
            <Button variant="primary" onClick={handleEditUser}>Guardar Cambios</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para mostrar las mascotas */}
      <Modal show={showPetsModal} onHide={() => setShowPetsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mascotas de {selectedUser?.firstName} {selectedUser?.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && <PetUsersComponent userId={selectedUser._id} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PatientPage;
