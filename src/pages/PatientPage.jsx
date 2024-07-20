import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Card, Button, Modal, Form } from 'react-bootstrap';
import PetUsersComponent from '../components/PetUsersComponent';
import { useSnackbar } from 'notistack';

const DATABASE_URL = 'https://proyecto-final-backend-tn7e.onrender.com';

const PatientPage = () => {
  const { enqueueSnackbar } = useSnackbar();
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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

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

  const handleAddUser = async () => {
    if (validateForm(addFormValues)) {
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
          enqueueSnackbar('Usuario creado con éxito', { variant: 'success' });
        } else {
          console.error("Error al agregar usuario");
        }
      } catch (error) {
        console.error("Error al agregar usuario:", error);
      }
    }
  };

  const handleEditUser = async () => {
    if (validateForm(editFormValues)) {
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
    }
  };

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

  const validateForm = (values) => {
    let errors = {};
    if (!values.firstName) {
      errors.firstName = "El nombre es obligatorio";
    } else if (!/^[a-zA-Z\s]+$/.test(values.firstName)) {
      errors.firstName = "El nombre solo puede contener letras";
    }
    if (!values.lastName) {
      errors.lastName = "El apellido es obligatorio";
    } else if (!/^[a-zA-Z\s]+$/.test(values.lastName)) {
      errors.lastName = "El apellido solo puede contener letras";
    }
    if (!values.email) {
      errors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email no es válido";
    }
    if (!values.dni) {
      errors.dni = "El DNI es obligatorio";
    } else if (!/^\d+$/.test(values.dni)) {
      errors.dni = "El DNI solo puede contener números";
    }
    if (!values.phone) {
      errors.phone = "El teléfono es obligatorio";
    } else if (!/^\d+$/.test(values.phone)) {
      errors.phone = "El teléfono solo puede contener números";
    }
    if (!values.password) {
      errors.password = "La contraseña es obligatoria";
    } else if (values.password.length < 6 || values.password.length > 20) {
      errors.password = "La contraseña debe tener entre 6 y 20 caracteres";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Dueño</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="firstName" 
                value={addFormValues.firstName} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                isInvalid={!!formErrors.firstName} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                name="lastName" 
                value={addFormValues.lastName} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                isInvalid={!!formErrors.lastName} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={addFormValues.email} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                isInvalid={!!formErrors.email} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control 
                type="text" 
                name="address" 
                value={addFormValues.address} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                required 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control 
                type="text" 
                name="dni" 
                value={addFormValues.dni} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                isInvalid={!!formErrors.dni} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.dni}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={addFormValues.phone} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                isInvalid={!!formErrors.phone} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                value={addFormValues.password} 
                onChange={(e) => handleFormChange(e, setAddFormValues)} 
                isInvalid={!!formErrors.password} 
                required 
                minLength="6" 
                maxLength="20"
              />
              <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" onClick={handleAddUser} className='mt-2'>Agregar</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Dueño</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                name="firstName" 
                value={editFormValues.firstName} 
                onChange={(e) => handleFormChange(e, setEditFormValues)} 
                isInvalid={!!formErrors.firstName} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control 
                type="text" 
                name="lastName" 
                value={editFormValues.lastName} 
                onChange={(e) => handleFormChange(e, setEditFormValues)} 
                isInvalid={!!formErrors.lastName} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={editFormValues.email} 
                onChange={(e) => handleFormChange(e, setEditFormValues)} 
                isInvalid={!!formErrors.email} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control 
                type="text" 
                name="address" 
                value={editFormValues.address} 
                onChange={(e) => handleFormChange(e, setEditFormValues)} 
                required 
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>DNI</Form.Label>
              <Form.Control 
                type="text" 
                name="dni" 
                value={editFormValues.dni} 
                onChange={(e) => handleFormChange(e, setEditFormValues)} 
                isInvalid={!!formErrors.dni} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.dni}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Telefono</Form.Label>
              <Form.Control 
                type="text" 
                name="phone" 
                value={editFormValues.phone} 
                onChange={(e) => handleFormChange(e, setEditFormValues)} 
                isInvalid={!!formErrors.phone} 
                required 
              />
              <Form.Control.Feedback type="invalid">{formErrors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" onClick={handleEditUser} className='mt-2'>Guardar Cambios</Button>
          </Form>
        </Modal.Body>
      </Modal>

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