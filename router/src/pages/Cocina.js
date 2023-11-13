import { useEffect, useState }  from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import recetasData from '../data/db.json';
import LoadingScreen from '../components/LoadingScreen';
function Cocina() {
  const [selectedReceipe, setSelectedReceipe] = useState(null);

  const [isLoading, setIsLoading] = useState (false)
  const handleBookClick = (receta) => {
    setSelectedReceipe(receta);
  };

  const handleCloseModal = () => {
    setSelectedReceipe(null);
  };

  useEffect(() => {
    setTimeout(() => {

        setIsLoading(true);

    }, 2000);

}, []);
  return (
    <div>
      {!isLoading ?<LoadingScreen/> :(
      <Grid container spacing={2}>
        {recetasData.cocina.map((receta) => (
          <Grid item xs={12} sm={6} md={4} key={receta.id}>
            <Card className="lectura-card" onClick={() => handleBookClick(receta)}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200" // Establece una altura fija para todas las tarjetas
                  image={receta.imagenes}
                  alt={receta.nombre_receta}
                  sx={{ width: '100%' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="lectura-title">
                    {receta.nombre_receta}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="lectura-genre">
                    Tipo: {receta.tipo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="lectura-author">
                    Descripción: {receta.descripcion}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" className="lectura-rating">
                    Valoración: {receta.valoracion}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
       )}
      <Modal
        open={selectedReceipe !== null}
        onClose={handleCloseModal}
        aria-labelledby="book-modal"
        aria-describedby="book-description"
      >
        <div className="book-modal">
          {selectedReceipe && (
            <div className="book-details">
              <h2>{selectedReceipe.nombre_receta}</h2>
              <img
                src={selectedReceipe.imagenes}
                alt={selectedReceipe.nombre_receta} // Usa "nombre_receta" en lugar de "nombre_libro"
                style={{ width: '300px', height: '400px' }}
              />
              <p>{selectedReceipe.preparado}</p>
              <Button onClick={handleCloseModal} variant="outlined" color="error">
                Cerrar
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Cocina;
