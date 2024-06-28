import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import UpdateAppointmentModal from './UpdateAppointmentModal';

const DATABASE_URL = 'http://localhost:4500';

function AppointmentTable({ appointmentsUpdated }) {
  const [appointments, setAppointments] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/appointments`);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointmentsUpdated) {
      fetchAppointments();
    }
  }, [appointmentsUpdated]);

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      await fetch(`${DATABASE_URL}/appointments/${appointmentId}`, {
        method: 'DELETE',
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const handleShowUpdateModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowUpdateModal(true);
  };

  const handleUpdateAppointment = () => {
    fetchAppointments();
    setShowUpdateModal(false);
  };

  const renderTableRows = () => {
    if (!appointments || appointments.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">No hay citas disponibles</td>
        </tr>
      );
    }

    return appointments.map((appointment) => (
      <tr key={appointment._id}>
        <td>{appointment.pet.owner ? appointment.pet.owner.dni : 'Unknown'}</td>
        <td>{appointment.pet.owner ? `${appointment.pet.owner.firstName} ${appointment.pet.owner.lastName}` : 'Unknown'}</td>
        <td>{appointment.pet ? appointment.pet.name : 'Unknown'}</td>
        <td>{appointment.veterinarian ? appointment.veterinarian.name : 'Unknown'}</td>
        <td onClick={() => handleShowUpdateModal(appointment)}>{appointment.date}</td>
        <td onClick={() => handleShowUpdateModal(appointment)}>{appointment.timeSlot}</td>
        <td>
          <Button variant="danger" onClick={() => handleDeleteAppointment(appointment._id)}>Eliminar</Button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>DNI</th>
            <th>Dueño</th>
            <th>Mascota</th>
            <th>Veterinario</th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </Table>

      <UpdateAppointmentModal
        show={showUpdateModal}
        handleClose={() => setShowUpdateModal(false)}
        appointment={selectedAppointment}
        onUpdate={handleUpdateAppointment}
      />
    </div>
  );
}

export default AppointmentTable;