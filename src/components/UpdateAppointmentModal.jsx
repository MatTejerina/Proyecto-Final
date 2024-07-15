import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

const DATABASE_URL = 'https://proyecto-final-backend-tn7e.onrender.com';

function UpdateAppointmentModal({ show, handleClose, appointment, onUpdate }) {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (appointment) {
      setDate(formatDateForInput(appointment.date));
      setTimeSlot(appointment.timeSlot);
      fetchAvailableTimeSlots(appointment.veterinarian._id, appointment.date);
    }
  }, [appointment]);

  const fetchAvailableTimeSlots = async (vetId, selectedDate) => {
    try {
      const response = await fetch(`${DATABASE_URL}/appointments/${vetId}/${selectedDate}`);
      const appointments = await response.json();
      const occupiedTimeSlots = appointments.map(appointment => appointment.timeSlot);
      setAvailableTimeSlots(getAvailableTimeSlots(occupiedTimeSlots));
    } catch (error) {
      console.error('Error fetching appointments for selected veterinarian and date:', error);
    }
  };

  const getAvailableTimeSlots = (occupiedTimeSlots) => {
    const allTimeSlots = [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
    ];

    return allTimeSlots.filter(slot => !occupiedTimeSlots.includes(slot));
  };

  const handleSave = async () => {
    if (!appointment || !appointment._id) {
      console.error('Datos de la cita son inválidos:', appointment);
      return;
    }

    try {
      const response = await fetch(`${DATABASE_URL}/appointments/${appointment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, timeSlot }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la cita');
      }

      const updatedAppointment = await response.json();
      onUpdate(updatedAppointment);
      handleClose();
    } catch (error) {
      console.error('Error al actualizar la cita:', error.message);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';

    const dateObj = new Date(dateString);
    return dateObj.toISOString().split('T')[0];
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    if (selectedDate) {
      fetchAvailableTimeSlots(appointment.veterinarian._id, selectedDate);
    }
  };

  const handleTimeSlotChange = (e) => {
    setTimeSlot(e.target.value);
  };

  const renderTimeSlotOptions = () => {
    return availableTimeSlots.map(slot => (
      <option key={slot} value={slot}>{slot}</option>
    ));
  };

  const getTodayDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modificar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Nueva Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={handleDateChange}
              min={getTodayDateString()}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nuevo Horario</Form.Label>
            <Form.Control
              as="select"
              value={timeSlot}
              onChange={handleTimeSlotChange}
            >
              <option value="">Seleccionar</option>
              {renderTimeSlotOptions()}
            </Form.Control>
          </Form.Group>
        </Form>
        {availableTimeSlots.length === 0 && (
          <Alert variant="danger">
            No hay horarios disponibles para la fecha seleccionada.
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!timeSlot}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateAppointmentModal;