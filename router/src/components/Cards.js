import * as React from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Image from './Image';


const cardData = [
  {
    title: "Cocina",
    image: "./img/cocina.jpg",
    alt: "Cocina",
    description: "Todas las recetas familiares con su elaboración paso a paso guiada. Se proporciona imágenes, cantidades y métodos de elaboración.",
  },
  {
    title: "Peliculas",
    image: "./img/peliculas.jpg",
    alt: "Peliculas",
    description: "Descripción de películas, reseñas y recomendaciones. ¡Descubre las mejores películas de todos los tiempos por generos y plataformas!",
  },
  {
    title: "Series",
    image: "./img/series.jpg",
    alt: "Series",
    description: "Descripción de series, reseñas y recomendaciones. ¡Explora las mejores series de todos los géneros y plataformas!",
  },
  {
    title: "Lectura",
    image: "./img/lectura.jpg",
    alt: "Series",
    description: "Descripción de lectura, reseñas y recomendaciones. ¡Si eres un amante de la lectura, aqui podrás explorar todos los generos y autores!",
  },
  {
    title: "Videojuegos",
    image: "./img/videojuegos.jpg",
    alt: "Series",
    description: "Descripción de videojuegos, reseñas y recomendaciones. ¡Explora los mejores videojuegos de la historia, divididos por generos y plataforma!",
  },
  {
    title: "Viajes",
    image: "./img/viajes.jpg",
    alt: "Series",
    description: "Valoraciones de viajes y destinos. ¡Si necesitas información acerca de un destino antes de iniciar tu proxima aventura, este es tu sitio! ",
  },
];

function AppCards() {
    return (
      <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {cardData.map((data, index) => (
          <Grid item key={index} xs={6} sm={4} md={4} sx={{ marginBottom: '40px' }}>
            <Card sx={{ width: '100%', maxWidth: '100%' }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.title}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="140"
                    image={data.image}
                    alt={data.alt}
                    sx={{ width: '100%' }} // Ajusta el ancho de la imagen
                  />
                  <Typography variant="body2" color="text.secondary">
                    {data.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button component={Link} to={`/${data.title.toLowerCase()}`} size="small" color="primary">
                  Ir a {data.title}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
  
export default AppCards;

