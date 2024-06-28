import React, { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/esm/Button';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom'

const NavbarComponent = ({ user, setUser }) => {
  const isLoginPage = window.location.pathname === '/login';
  const isAdminPage = window.location.pathname === '/admin';
  const isTurnPage = window.location.pathname === '/turns';
  const isPatientPage = window.location.pathname === '/patients';
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    setUser({
      token: null,
      userInfo: null,
      logged: false,
      isAdmin: false
    })
    navigate('/login');
    enqueueSnackbar('Se cerro la sesion', { variant: 'success' })
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary ">
        <Container fluid>
          <Navbar.Brand href="#">RollingVet</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} className='link' to='/home'>Home </Nav.Link>
              <Nav.Link as={Link} className='link' to='/plans'>Planes</Nav.Link>
              <NavDropdown title="Info" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} className='link' to='/about' >Acerca de Nosotros</NavDropdown.Item>
                <NavDropdown.Item as={Link} className='link' to='/contact'>
                  Contacto
                </NavDropdown.Item>

              </NavDropdown>
              {
                user.isAdmin && !isAdminPage && !isTurnPage && !isPatientPage ? (
                  (<Nav.Link as={Link} className='link' to='/admin'>
                    Administracion
                  </Nav.Link>)

                ) :
                  null

              }
              {
                isAdminPage || isTurnPage || isPatientPage ?
                  <NavDropdown title="Administrar" id="navbarScrollingDropdown">

                    <NavDropdown.Item as={Link} className='link' to='/patients'>Pacientes</NavDropdown.Item>
                    <NavDropdown.Item as={Link} className='link' to='/turns'>
                      Turnos
                    </NavDropdown.Item>
                    {
                      isTurnPage || isPatientPage ?
                        <NavDropdown.Item as={Link} className='link' to='/admin'>
                          Administracion
                        </NavDropdown.Item> :
                        null
                    }
                  </NavDropdown> : null
              }

            </Nav>
            <Form className="d-flex">
              {
                user.logged ? (
                  <Nav.Link>
                    <Button onClick={() => handleLogOut()}>Cerrar Sesion</Button>
                  </Nav.Link>
                ) : isLoginPage ?
                  null
                  : (
                    <Nav.Link href='/login'>
                      <Button>Iniciar Sesion</Button>
                    </Nav.Link>
                  )
              }
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar >
    </>
  )
}

export default NavbarComponent;