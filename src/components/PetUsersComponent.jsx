import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

const DATABASE_URL = 'http://localhost:4500';

const PetUsersComponent = ({ userId }) => {
  const [userPets, setUserPets] = useState([]);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const response = await fetch(`${DATABASE_URL}/pets/owner/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las mascotas del usuario');
        }
        const petsData = await response.json();
        setUserPets(petsData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPets();
  }, [userId]);

  return (
    <div>
      <ul>
        {userPets.map(pet => (
        <ListGroup
            key={pet._id}
        >
            <strong>Nombre:</strong> {pet.name}
            <strong>Tipo:</strong> {pet.type}
            <strong>Edad:</strong> {pet.age}
        
        </ListGroup> 
        ))}
      </ul>
    </div>
  );
};

export default PetUsersComponent;