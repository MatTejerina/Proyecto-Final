import React, { useState, useEffect } from 'react';
import { Button, Alert, Table } from 'react-bootstrap';
import AppointmentFormModal from '../components/AppointmentFormModal';
import AppointmentTable from '../components/AppointmentTable';
import VeterinarianFormModal from '../components/VeterinarianFormModal';

const DATABASE_URL = 'http://localhost:4500';

function AppointmentsPage() {
  // Estados para manejo de turnos
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsUpdated, setAppointmentsUpdated] = useState(false);

  // Estados para manejo de veterinarios
  const [showVeterinarianModal, setShowVeterinarianModal] = useState(false);
  const [veterinarians, setVeterinarians] = useState([]);

  // Manejo de modal de turnos
  const handleShowAppointmentModal = () => setShowAppointmentModal(true);
  const handleCloseAppointmentModal = () => setShowAppointmentModal(false);

  const handleSaveAppointment = async (newAppointment) => {
    try {
      const response = await fetch(`${DATABASE_URL}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        const createdAppointment = await response.json();
        setAppointments((prevAppointments) => [...prevAppointments, createdAppointment]);
        setShowAlert(true);
      } else {
        console.error('Error creating appointment:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
    }

    setShowAppointmentModal(false);

    setTimeout(() => {
      setAppointmentsUpdated(false);
    }, 500);
  };

  // Manejo de veterinarios
  useEffect(() => {
    fetchAppointments();
    fetchVeterinarians();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/appointments`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchVeterinarians = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`);
      const data = await response.json();
      setVeterinarians(data);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  const handleShowVeterinarianModal = () => setShowVeterinarianModal(true);
  const handleCloseVeterinarianModal = () => setShowVeterinarianModal(false);

  const handleSaveVeterinarian = async (newVeterinarian) => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVeterinarian),
      });

      if (response.ok) {
        const createdVeterinarian = await response.json();
        setVeterinarians((prevVeterinarians) => [...prevVeterinarians, createdVeterinarian]);
      } else {
        console.error('Error creating veterinarian:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating veterinarian:', error);
    }

    setShowVeterinarianModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="mb-5">
        <h1>Turnos</h1>
        <Button variant="primary" onClick={handleShowAppointmentModal} className="mb-3">
          <i className="bi bi-plus"></i> Agregar Turno
        </Button>
        <AppointmentFormModal
          show={showAppointmentModal}
          handleClose={handleCloseAppointmentModal}
          onSave={handleSaveAppointment}
          veterinarians={veterinarians} // Pasar veterinarios al formulario de citas
        />
        <AppointmentTable appointments={appointments} />
        <Alert
          variant="success"
          show={showAlert}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Cita creada exitosamente.
        </Alert>
      </div>

      <div>
        <h1>Veterinarios</h1>
        <Button variant="primary" onClick={handleShowVeterinarianModal} className="mb-3">
          <i className="bi bi-plus"></i> Agregar Veterinario
        </Button>
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
          show={showVeterinarianModal}
          handleClose={handleCloseVeterinarianModal}
          onSave={handleSaveVeterinarian}
        />
      </div>
    </div>
  );
}

export default AppointmentsPage;