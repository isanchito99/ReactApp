import React, { useContext, useEffect } from 'react';
import { Link,useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useColor } from './ColorContext';
const pages = ['Cocina', 'Peliculas','Series', 'Lectura','Videojuegos','Viajes'];
const settings = ['Profile','Logout'];

const categoryColors = {
  Cocina: '#f47373',
  Series: '#4dd0e1',
  Peliculas: '#4db6ac', // Puedes agregar más colores y categorías según sea necesario
  Lectura: '#ffb74d',
  Videojuegos: '#9575cd',
  Viajes: '#4caf50',
};
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation(); //usado para saber la localizacion del Navbar
  const { backgroundColor, setBackgroundColor } = useColor();
  //Son funciones que se llaman cuando se hace clic en los íconos de menú de navegación y usuario. 
  //Estas funciones actualizan los estados anchorElNav y anchorElUser, lo que hace que los menús desplegables se muestren en la interfaz.

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Estas funciones se utilizan para cerrar los menús desplegables cuando el usuario hace clic en un elemento del menú o en otra área de la interfaz. 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    // Obtén la categoría actual a partir de la ubicación
    const currentCategory = pages.find((page) => location.pathname.startsWith(`/${page.toLowerCase()}`));
    
    // Modifica el color de fondo en función de la categoría actual o establece un color predeterminado para la página de inicio
    if (currentCategory) {
      setBackgroundColor(categoryColors[currentCategory]);
    } else {
      // Establece un color predeterminado para la página de inicio
      setBackgroundColor(categoryColors['MAIN']); // Puedes elegir cualquier categoría para la página de inicio
    }
  }, [location.pathname, setBackgroundColor]);
  return (
    //Los Backgronund se modifican aqui en el AppBar
    
    <AppBar position="static" style={{ backgroundColor }}>
      <Container>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            IVAN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
         
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
          
             
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase()}`} // Esto generará rutas como "/cocina", "/peliculas", etc.
                onClick={handleCloseNavMenu}
               
                sx={{
                  my: 2,
                  mx: 3,
                  color: 'white',
                  display: 'block',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="./img/foto_personal.jpg" />
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;