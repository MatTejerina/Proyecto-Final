import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Card, Button, Modal, Form } from 'react-bootstrap';
import PetUsersComponent from '../components/PetUsersComponent'; // Importa el componente de mascotas

const DATABASE_URL = 'http://localhost:4500';

const PatientPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPetsModal, setShowPetsModal] = useState(false);
  const [formValues, setFormValues] = useState({
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

  const getUsers = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUserClick = (user) => setSelectedUser(user);

  const handleAddUser = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      if (response.ok) {
        getUsers();
        setShowAddModal(false);
        setFormValues({ ...formValues, isAdmin: false });
      } else {
        console.error("Error adding user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/users/${selectedUser._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      if (response.ok) {
        getUsers();
        setShowEditModal(false);
        setFormValues({ ...formValues, isAdmin: false });
      } else {
        console.error("Error editing user");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${DATABASE_URL}/users/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        getUsers();
        setSelectedUser(null);
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({ ...formValues, [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <h2 className="text-center">Lista de Usuarios</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Button onClick={() => setShowAddModal(true)}>Agregar Usuario</Button>
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
                  <Button variant="info" size="sm" onClick={() => setShowPetsModal(true)}>Mascotas</Button> {/* Abre el modal de mascotas */}
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
                  <strong>Admin:</strong> {selectedUser.isAdmin ? 'Yes' : 'No'}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="warning" size="sm" onClick={() => { setSelectedUser(selectedUser); setFormValues(selectedUser); setShowEditModal(true); }} className="ms-2">Editar</Button>
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
          <Modal.Title>Agregar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="firstName" value={formValues.firstName} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="lastName" value={formValues.lastName} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formValues.email} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" name="address" value={formValues.address} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="dni" value={formValues.dni} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="phone" value={formValues.phone} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={formValues.password} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Admin" name="isAdmin" checked={formValues.isAdmin} onChange={handleFormChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleAddUser}>Agregar</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para editar usuario */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="firstName" value={formValues.firstName} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="lastName" value={formValues.lastName} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formValues.email} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" name="address" value={formValues.address} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control type="text" name="dni" value={formValues.dni} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="phone" value={formValues.phone} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={formValues.password} onChange={handleFormChange} />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="Admin" name="isAdmin" checked={formValues.isAdmin} onChange={handleFormChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleEditUser}>Guardar Cambios</Button>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Modal para mostrar las mascotas */}
      <Modal show={showPetsModal} onHide={() => setShowPetsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mascotas de {selectedUser.firstName} {selectedUser.lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {selectedUser && <PetUsersComponent userId={selectedUser._id} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default PatientPage;