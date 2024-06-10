import React, { useState, useEffect } from 'react';

const PatientPage = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        const response = await fetch(`http://localhost:4500/users/6665f0723ba3062229635502`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUserById();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>DNI: {user.dni}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientPage;

// Pagina de paciente
// La ficha de los pacientes deberá contener toda la información necesaria del mismo, para ello se sugiere las
// siguientes:
// Información de dueños
//  Nombre
//  Apellido
//  Email
//  Teléfono
// Información de mascota
//  Nombre
//  Especie
//  Raza
// Nota: Si los desarrolladores lo consideran pueden agregar más datos