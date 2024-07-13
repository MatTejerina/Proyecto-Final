import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { enqueueSnackbar } from 'notistack';

const pages = [
  { name: 'Nosotros', path: '/aboutPage' },
  { name: 'Contacto', path: '/contactPage' },
  { name: 'Planes', path: '/plansPage' },
];
const settings = [
  { name: 'Administración', path: '/adminPage' },
  { name: 'Pacientes', path: '/patientPage' },
  { name: 'Turnos', path: '/appointmentPage' },
  { name: 'Iniciar Sesión', path: '/loginPage' },
];

function NavbarComponent({ user, setUser }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setUser({
      token: null,
      userInfo: null,
      logged: false,
      isAdmin: false
    });
    navigate('/loginPage');
    enqueueSnackbar('Se cerró la sesión', { variant: 'success' });
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgb(8, 39, 66)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {page.name}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center' }}>
            <Box component={Link}
                to="/homePage" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/homePage"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  mr: 0,
                }}
              >
                Rolling
              </Typography>
              <Box
                component={Link}
                to="/homePage"
                sx={{
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  mx: 1,
                }}
              >
                <Box component="img" src={Logo} sx={{ width: 'auto', height: '40px' }} />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/homePage"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'lightblue', // Cambiar al color del navbar
                  textDecoration: 'none',
                  ml: 0,
                }}
              >
                Vet
              </Typography>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/homePage"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                  mr: 0.5,
                }}
              >
                Rolling
              </Typography>
              <Box
                component={Link}
                to="/homePage"
                sx={{
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  mx: 0.5,
                }}
              >
                <Box component="img" src={Logo} sx={{ width: 'auto', height: '30px' }} />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/homePage"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: 'blue',
                  textDecoration: 'none',
                  ml: 0.5,
                }}
              >
                Vet
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', pr: 2 }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user.logged ? [
                ...settings
                  .filter(setting => setting.name !== 'Iniciar Sesión' && (user.isAdmin || (!user.isAdmin && setting.name !== 'Administración' && setting.name !== 'Pacientes' && setting.name !== 'Turnos')))
                  .map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {setting.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  )),
                <MenuItem key="Cerrar Sesión" onClick={handleLogOut}>
                  <Typography textAlign="center">
                    Cerrar Sesión
                  </Typography>
                </MenuItem>
              ] : [
                <MenuItem key="Iniciar Sesión" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/loginPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Iniciar Sesión
                    </Link>
                  </Typography>
                </MenuItem>
              ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent;