import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container} from '@mui/material';

import Cards from './components/Cards';
import Cocina from './pages/Cocina'; 
import Peliculas from './pages/Peliculas'; 
import Series from './pages/Series'; 
import Lectura from './pages/Lectura'; 
import Videojuegos from './pages/Videojuegos'; 
import Viajes from './pages/Viajes'; 
import Navbar from './components/Navbarcomp';
import { ColorProvider } from './components/ColorContext';
import './index.css';
function App() {
  return (
    <Router>
      <ColorProvider>
    <div>
      <Navbar />
      
      <Container style={{ marginTop: '4rem' }}>
        <Routes>
          <Route path="/" element={<Cards />} />
          {/* Agrega rutas para cada categoría */}
          <Route path="/cocina" element={<Cocina />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/series" element={<Series />} />
          <Route path="/lectura" element={<Lectura />} />
          <Route path="/videojuegos" element={<Videojuegos />} />
          <Route path="/viajes" element={<Viajes />} />
        </Routes>
      </Container>
      
    </div>
    </ColorProvider>
  </Router>
  );
}

export default App;

