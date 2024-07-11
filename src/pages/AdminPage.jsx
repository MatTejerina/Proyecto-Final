import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import VeterinarianList from '../components/VeterinarianList';

const DATABASE_URL = 'http://localhost:4500';

const AdminPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [veterinarians, setVeterinarians] = useState([]);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/appointments`);
      let data = await response.json();
      
      // Ordenar los turnos por fecha y hora
      data.sort((a, b) => {
        // Primero por fecha
        const dateComparison = new Date(a.date) - new Date(b.date);
        if (dateComparison !== 0) {
          return dateComparison;
        }
        // Luego por hora
        return a.timeSlot.localeCompare(b.timeSlot);
      });
      
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchVeterinarians = async () => {
    try {
      const response = await fetch(`${DATABASE_URL}/veterinarians`);
      let data = await response.json();
      setVeterinarians(data);
    } catch (error) {
      console.error('Error fetching veterinarians:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchVeterinarians();
  }, []);

  const updateAppointments = async () => {
    // Llamar a fetchAppointments para actualizar los turnos después de eliminar un veterinario
    await fetchAppointments();
  };

  const renderTableRows = () => {
    if (!appointments || appointments.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">No hay citas disponibles</td>
        </tr>
      );
    }

    return appointments.map(appointment => (
      <tr key={appointment._id}>
        <td>{appointment.pet.owner.firstName} {appointment.pet.owner.lastName}</td>
        <td>{appointment.pet.name}</td>
        <td>{appointment.pet.type} - {appointment.pet.race}</td>
        <td>{appointment.veterinarian.name}</td>
        <td>{appointment.date}</td>
        <td>{appointment.timeSlot}</td>
      </tr>
    ));
  };

  return (
    <Container>
      <div className='text-center'>
        <h1>Página de Administración</h1>
        <p className="lead">Bienvenido, Administrador</p>
        <p>Versión del Sistema: 1.0.0</p>

        <h2>Turnos Asignados</h2>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Dueño</th>
              <th>Mascota</th>
              <th>Tipo y Raza</th>
              <th>Veterinario</th>
              <th>Fecha</th>
              <th>Horario</th>
            </tr>
          </thead>
          <tbody className=' text-center'>
            {renderTableRows()}
          </tbody>
        </Table>
      </div>

      <h2>Veterinarios</h2>
      <VeterinarianList onUpdateAppointments={updateAppointments} />
    </Container>
  );
};

export default AdminPage;
