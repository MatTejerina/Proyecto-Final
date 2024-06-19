import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Inicio de sesion</Button>
        <Typography variant="h6" style={{ flexGrow: 1 }} className=' text-center'>
          Administración
        </Typography>
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/patientPage">Administrar Pacientes</Button>
        <Button color="inherit" component={Link} to="/turnPage">Administrar Turnos</Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavbarComponent;