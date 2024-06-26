import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import UpdateAppointmentModal from './UpdateAppointmentModal'; // Importa el nuevo modal combinado

function AppointmentTable({ appointmentsUpdated }) {
  const [appointments, setAppointments] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Estado para controlar el modal combinado
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = () => {
    axios.get('/appointments').then((response) => {
      setAppointments(response.data);
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    if (appointmentsUpdated) {
      fetchAppointments();
    }
  }, [appointmentsUpdated]);

  const handleDeleteAppointment = (appointmentId) => {
    axios.delete(`/appointments/${appointmentId}`).then(() => {
      fetchAppointments();
    });
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
        <td>{appointment._id}</td>
        <td>{appointment.pet ? appointment.pet.name : 'Unknown'}</td>
        <td>{appointment.pet && appointment.pet.owner ? appointment.pet.owner.name : 'Unknown'}</td>
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
            <th>ID</th>
            <th>Mascota</th>
            <th>Dueño</th>
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

      {/* Modal combinado */}
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


