import React, { useState } from 'react';
import { Button, Alert } from 'react-bootstrap';
import AppointmentFormModal from '../components/AppointmentFormModal';
import AppointmentTable from '../components/AppointmentTable';

function AppointmentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [appointmentsUpdated, setAppointmentsUpdated] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSave = (newAppointment) => {
    setAppointmentsUpdated(true);
    setShowAlert(true);
    setShowModal(false);

    // Restablecer el estado después de un breve tiempo para permitir la actualización
    setTimeout(() => {
      setAppointmentsUpdated(false);
    }, 500);
  };

  return (
    <div className="container mt-5">
      <h1>Turnos</h1>
      <Button variant="primary" onClick={handleShowModal} className=' mb-2'>
        <i className="bi bi-plus"></i> Agregar Turno
      </Button>
      <AppointmentFormModal
        show={showModal}
        handleClose={handleCloseModal}
        onSave={handleSave}
      />
      <AppointmentTable appointmentsUpdated={appointmentsUpdated} />
      
      {/* Alerta de cita creada */}
      <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
        Cita creada exitosamente.
      </Alert>
    </div>
  );
}

export default AppointmentsPage;