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

const pages = [{ name: 'Inicio', path: '/homePage' }];
const settings = [{ name: 'Iniciar Sesión', path: '/loginPage' }];

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Box
            component="img"
            src={Logo}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, width: 'auto', height: '40px' }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
          {/* Logo for smaller screens */}
          <Box
            component="img"
            src={Logo}
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, width: 'auto', height: '40px' }}
          />
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
                  .filter(setting => setting.name !== 'Iniciar Sesión')
                  .map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link to={setting.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                          {setting.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  )),
                ...(user.isAdmin ? [
                  <MenuItem key="adminPage" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/adminPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Administración
                      </Link>
                    </Typography>
                  </MenuItem>,
                  <MenuItem key="patientPage" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/patientPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Pacientes
                      </Link>
                    </Typography>
                  </MenuItem>,
                  <MenuItem key="appointmentPage" onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/appointmentPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Turnos
                      </Link>
                    </Typography>
                  </MenuItem>
                ] : []),
                <MenuItem key="logout" onClick={handleLogOut}>
                  <Typography textAlign="center">
                    Cerrar Sesión
                  </Typography>
                </MenuItem>
              ] : (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    <Link to="/loginPage" style={{ textDecoration: 'none', color: 'inherit' }}>
                      Iniciar Sesión
                    </Link>
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavbarComponent;