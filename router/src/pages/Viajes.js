import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Modal, Button, Box, TextField } from '@mui/material';
import LoadingScreen from '../components/LoadingScreen';
import Rating from '../components/Rating'; // Ajusta la ruta al componente Rating
import { addBookToServer } from '../services/axios';
import viajesData from '../data/db.json';

class Viajes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: null,
      isLoading: false,
      trips: [],
      isAddTripModalOpen: false,
      newTrip: {
        destino: '',
        pais: '',
        descripcion: '',
        valoracion: 0,
        imagenes: '',
      },
    };
  }

  handleTripClick = (trip) => {
    this.setState({ selectedTrip: trip });
  };

  handleCloseModal = () => {
    this.setState({ selectedTrip: null });
  };

  handleOpenAddTripModal = () => {
    this.setState({ isAddTripModalOpen: true });
  };

  handleCloseAddTripModal = () => {
    this.setState({ isAddTripModalOpen: false, newTrip: {} });
  };

  handleUpdateNewTrip = (field, value) => {
    if (field === 'valoracion') {
      this.setState((prevState) => ({
        newTrip: {
          ...prevState.newTrip,
          [field]: value,
        },
      }));
    } else {
      this.setState((prevState) => ({
        newTrip: {
          ...prevState.newTrip,
          [field]: value,
        },
      }));
    }
  };

  handleAddToLocalStorageAndServer = async (trip) => {
    const currentTrips = [...this.state.trips, trip];
    localStorage.setItem('viajes', JSON.stringify(currentTrips));

    try {
      await addBookToServer('viajes', trip);
      alert('Viaje agregado a localStorage y al servidor');
    } catch (error) {
      console.error('Error al agregar el viaje al servidor:', error);
    }
  };

  componentDidMount() {
    setTimeout(() => {
      const storedTrips = JSON.parse(localStorage.getItem('viajes')) || [];
      const allTrips = viajesData.viajes;
      const newTrips = allTrips.filter((trip) => !storedTrips.some((storedTrip) => storedTrip.id === trip.id));
      storedTrips.push(...newTrips);

      localStorage.setItem('viajes', JSON.stringify(storedTrips));

      this.setState({ isLoading: true, trips: storedTrips });
    }, 2000);
  }

  render() {
    const { selectedTrip, isLoading, trips, isAddTripModalOpen, newTrip } = this.state;

    return (
      <div>
        {!isLoading ? (
          <LoadingScreen />
        ) : (
          <Grid container spacing={2}>
            {trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <Card
                  className="trip-card"
                  onClick={() => {
                    this.handleTripClick(trip);
                    this.handleAddToLocalStorageAndServer(trip);
                  }}
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardActionArea sx={{ flex: 1 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={trip.imagenes}
                      alt={trip.destino}
                      sx={{ width: '100%', objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography gutterBottom variant="h5" component="div" className="trip-title">
                        {trip.destino}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="trip-country">
                        País: {trip.pais}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" className="trip-rating">
                        Valoración: {trip.valoracion}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Modal
          open={selectedTrip !== null}
          onClose={this.handleCloseModal}
          aria-labelledby="trip-modal"
          aria-describedby="trip-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: 600,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            {selectedTrip && (
              <div>
                <h2>{selectedTrip.destino}</h2>
                <img
                  src={selectedTrip.imagenes}
                  alt={selectedTrip.destino}
                  style={{ width: '100%', height: 'auto' }}
                />
                <p>
                  <strong>País:</strong> {selectedTrip.pais}
                </p>
                <p>
                  <strong>Descripción:</strong> {selectedTrip.descripcion}
                </p>
                <Button onClick={this.handleCloseModal} variant="outlined" color="error">
                  Cerrar
                </Button>
              </div>
            )}
          </Box>
        </Modal>
        <Modal
  open={isAddTripModalOpen}
  onClose={this.handleCloseAddTripModal}
  aria-labelledby="add-trip-modal"
  aria-describedby="add-trip-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'white',
      boxShadow: 24,
      p: 4,
    }}
  >
    <div className="trip-modal">
      <div className="trip-details">
        <h2>Agregar Nuevo Viaje</h2>
        <form>
          <TextField
            label="Destino"
            variant="outlined"
            margin="normal"
            fullWidth
            value={newTrip.destino || ''}
            onChange={(e) => this.handleUpdateNewTrip('destino', e.target.value)}
            required
          />
          <TextField
            label="País"
            variant="outlined"
            margin="normal"
            fullWidth
            value={newTrip.pais || ''}
            onChange={(e) => this.handleUpdateNewTrip('pais', e.target.value)}
            required
          />
          <TextField
            label="Descripción"
            variant="outlined"
            margin="normal"
            fullWidth
            multiline
            rows={4}
            value={newTrip.descripcion || ''}
            onChange={(e) => this.handleUpdateNewTrip('descripcion', e.target.value)}
            required
          />
          <div className="form-field">
            <label>Valoración:</label>
            <Rating
              rating={newTrip.valoracion}
              onChange={(value) => this.handleUpdateNewTrip('valoracion', value)}
            />
          </div>
          <TextField
            label="Imagen URL"
            variant="outlined"
            margin="normal"
            fullWidth
            value={newTrip.imagenes || ''}
            onChange={(e) => this.handleUpdateNewTrip('imagenes', e.target.value)}
            required
          />
          <Button
            onClick={() => {
              this.handleAddToLocalStorageAndServer(newTrip);
              this.handleCloseAddTripModal();
            }}
            variant="contained"
            color="primary"
            disabled={!newTrip.destino || !newTrip.pais}
          >
            Agregar
          </Button>
          <Button
            onClick={this.handleCloseAddTripModal}
            variant="outlined"
            color="error"
          >
            Cancelar
          </Button>
        </form>
      </div>
    </div>
  </Box>
</Modal>
        <Button
          onClick={this.handleOpenAddTripModal}
          variant="contained"
          color="primary"
        >
          Agregar Viaje
        </Button>
      </div>
    );
  }
}

export default Viajes;
