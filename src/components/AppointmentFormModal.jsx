import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function AppointmentFormModal({ show, handleClose, onSave }) {
  const [veterinarians, setVeterinarians] = useState([]);
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);
  const [selectedVet, setSelectedVet] = useState('');
  const [selectedOwner, setSelectedOwner] = useState('');
  const [selectedPet, setSelectedPet] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    axios.get('/veterinarians').then((response) => {
      setVeterinarians(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedVet) {
      axios.get(`/users`).then((response) => {
        setOwners(response.data);
      });
    }
  }, [selectedVet]);

  useEffect(() => {
    if (selectedOwner) {
      axios.get(`/pets/${selectedOwner}`).then((response) => {
        setPets(response.data);
      });
    }
  }, [selectedOwner]);

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);

    if (selectedVet && selectedDate) {
      try {
        const response = await axios.get(`/appointments/${selectedVet}/${selectedDate}`);
        const appointments = response.data;
        const occupiedTimeSlots = appointments.map(appointment => appointment.timeSlot);
        setAvailableTimeSlots(getAvailableTimeSlots(occupiedTimeSlots));
      } catch (error) {
        console.error('Error fetching appointments for selected veterinarian and date:', error);
      }
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

  const handleSave = () => {
    const formattedDate = formatDateForServer(date); // Formatear la fecha antes de enviarla al servidor
  
    const appointmentData = {
      pet: selectedPet,
      veterinarian: selectedVet,
      date: formattedDate,
      timeSlot: timeSlot,
    };
  
    console.log('Sending appointment data:', appointmentData);
  
    axios.post('/appointments', appointmentData)
      .then((response) => {
        console.log('Appointment created:', response.data);
        onSave(); // Actualiza la lista de turnos después de crear uno nuevo
        handleCloseModal(); // Cierra el modal o realiza otras acciones necesarias
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
        alert(`Error al guardar la cita: ${error.message}`);
      });
  };
  
  const formatDateForServer = (dateString) => {
    if (!dateString) return null;
  
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}T00:00:00.000Z`; // Formato ISO 8601 para asegurar consistencia
  };

  const resetForm = () => {
    setSelectedVet('');
    setSelectedOwner('');
    setSelectedPet('');
    setDate('');
    setTimeSlot('');
    setAvailableTimeSlots([]);
  };

  const handleCloseModal = () => {
    resetForm();
    handleClose();
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Veterinario</Form.Label>
            <Form.Control
              as="select"
              value={selectedVet}
              onChange={(e) => setSelectedVet(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {veterinarians.map((vet) => (
                <option key={vet._id} value={vet._id}>
                  {vet.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Dueño</Form.Label>
            <Form.Control
              as="select"
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {owners.map((owner) => (
                <option key={owner._id} value={owner._id}>
                  {owner.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Mascota</Form.Label>
            <Form.Control
              as="select"
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              disabled={!selectedOwner}
            >
              <option value="">Seleccionar</option>
              {pets.map((pet) => (
                <option key={pet._id} value={pet._id} disabled={pet.appointment}>
                  {pet.name} {pet.appointment && '(Ya tiene turno)'}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={handleDateChange}
              min={getCurrentDate()}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Horario</Form.Label>
            <Form.Control
              as="select"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="">Seleccionar</option>
              {availableTimeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!timeSlot}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AppointmentFormModal;