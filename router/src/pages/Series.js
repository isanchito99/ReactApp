import React, { useEffect, useState } from 'react';
import Image from '../components/Image';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MovieIcon from '@mui/icons-material/Movie';
import LoadingScreen from '../components/LoadingScreen';


function CustomRating({ value }) {
  if (value === 0) {

    return (

      <Typography variant="body2" color="textSecondary">

        Película por estrenar
      </Typography>
    );
  }
  // Convierte la valoración en un valor de 0 a 5 (0.5 estrellas)
  const convertedValue = Math.round(value / 2);


  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>

      <Typography variant="body2" color="textSecondary">
        {value}
      </Typography>
      {Array.from({ length: 5 }, (_, index) => (
        <MovieIcon
          key={index}
          sx={{
            fontSize: 20,
            color: index < convertedValue ? 'gold' : 'grey',
          }}
        />
      ))}
    </div>
  );
}

function MovieItem({ item }) {
  const imageSRC = `https://image.tmdb.org/t/p/w300/${item.poster_path}`;
  return (
    <div className="movie_item">
      <div className="movie_name">
        {item.original_title ? item.original_title : item.original_name}
      </div>
      <div className="release_date">
        {item.first_air_date ? item.first_air_date : item.first_air_date}
      </div>
      <Image url={imageSRC} title="Movie Poster" />
      <div className="vote_average">
        {item.vote_average ? <CustomRating value={item.vote_average} /> : "*PROXIMAMENTE*"}
      </div>
    </div>
  );
}

function Series() {
  const [movieData, setMovieData] = useState([]);
  const numMovies = 18; // Establecer el número predeterminado en 21 películas
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {

      setIsLoading(true);
      getTrendingMovieData("tv");

    }, 2000);

  }, []);

  async function getTrendingMovieData(type) {
    try {
      const apiKey = "7fdb863b8d99f28cdfd207bc0329f5fd";
      //  const apiKey = process.env.REACT_APP_API_KEY;
      const resp = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=${apiKey}&media_type=movie`);
      setMovieData(resp.data.results.slice(0, numMovies)); // Limitar películas a 21
      console.log('Datos de las series:', resp.data.results)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="background_container">
      {!isLoading ? <LoadingScreen /> : (
        <Grid container spacing={4}>

          {movieData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MovieItem item={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default Series;
