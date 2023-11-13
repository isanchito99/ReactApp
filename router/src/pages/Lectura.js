
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import librosData from '../data/db.json';
import Rating from '../components/Rating';
import { updateBookUpdate, addBookToServer, handleDeleteBook } from '../services/axios';
import LoadingScreen from '../components/LoadingScreen';

function Lectura() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [libros, setLibros] = useState(librosData);
  const [isAddBookModalOpen, setAddBookModalOpen] = useState(false);
  const [modifiedBook, setModifiedBook] = useState(null);

  const [isLoading, setIsLoading] = useState (false)

  const images = [
    'https://imagessl3.casadellibro.com/a/l/s7/23/9788419260123.webp',
    'https://imagessl7.casadellibro.com/a/l/s7/07/9788478889907.webp',
    'https://imagessl2.casadellibro.com/a/l/s7/52/9788445012352.webp',
    'https://imagessl6.casadellibro.com/a/l/s7/76/9788424939076.webp',
    'https://imagessl0.casadellibro.com/a/l/s7/30/9788401030130.webp',
    'https://imagessl9.casadellibro.com/a/l/s7/09/9788437605609.webp'
  ];

  const [newBook, setNewBook] = useState({
    nombre_libro: '',
    autor: '',
    descripcion: '',
    genero: '',
    valoracion: '',
    imagenes: '', 
  });

  const [modificationFormData, setModificationFormData] = useState({
    nombre_libro: '',
    autor: '',
    descripcion: '',
    genero: '',
    valoracion: '',
    imagenes: '',
  });
  

  
  const handleBookClick = (book) => {
    setModifiedBook(book);
    setSelectedBook(book);
    setModificationFormData({
      nombre_libro: book.nombre_libro,
      autor: book.autor,
      descripcion: book.descripcion,
      genero: book.genero,
      valoracion: book.valoracion,
      imagenes: book.imagenes,
    });
  };
  

  const handleOpenAddBookModal = () => {
    setAddBookModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setAddBookModalOpen(false);
  };

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleAddBook = () => {
    const newBookCopy = { ...newBook, id: libros.lectura.length + 1 };
    const serverType = 'lectura';

    newBookCopy.imagenes = getRandomImage();

    addBookToServer(serverType, newBookCopy)
      .then((updatedData) => {
        setLibros(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });

    setNewBook({
      nombre_libro: '',
      autor: '',
      descripcion: '',
      genero: '',
      valoracion: '',
      imagenes: '',
    });

    setAddBookModalOpen(false);
  };
  const handleModifyBook = () => {
    const updatedBookDetails = {
      nombre_libro: modificationFormData.nombre_libro,
      autor: modificationFormData.autor,
      descripcion: modificationFormData.descripcion,
      genero: modificationFormData.genero,
      valoracion: modificationFormData.valoracion,
      imagenes: modificationFormData.imagenes,
    };
  
    updateBookUpdate('lectura', modifiedBook.id, updatedBookDetails)
      .then((updatedData) => {
        setLibros(updatedData);
        handleCloseModal(); // Close the modal after modification
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleDeleteBookAsync = async (id) => {
    await handleDeleteBook(id, libros, setLibros);
  };

  useEffect(() => {
    setTimeout(() => {

        setIsLoading(true);

    }, 2000);

}, []);
  return (
    <div className="lectura-container">
      {/* <Loading/> */}
      {!isLoading ?<LoadingScreen/> :(
      <Grid container spacing={2}>
        {console.log(libros)}
        {libros?.lectura.map((libro) => (
          <Grid item xs={12} sm={6} md={4} key={libro.id}>
            <Card className="lectura-card">
              <CardActionArea onClick={() => handleBookClick(libro)}>
                <CardMedia
                  component="img"
                  height="500"
                  image={libro.imagenes}
                  sx={{ width: '100%' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" className="lectura-title">
                    {libro.nombre_libro}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="lectura-genre">
                    Género: {libro.genero}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="lectura-author">
                    Autor: {libro.autor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" className="lectura-rating">
                    Valoración: {libro.valoracion}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBookAsync(libro.id);
                  }}
                >
                  X
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      )}
      <Modal
        open={selectedBook !== null}
        onClose={handleCloseModal}
        aria-labelledby="book-modal"
        aria-describedby="book-description"
      >
        <div className="book-modal">
          {selectedBook && (
            <div className="book-details">
              <h2>{selectedBook.nombre_libro}</h2>
              <img
                src={selectedBook.imagenes}
                alt={selectedBook.nombre_libro}
                style={{ width: '300px', height: '400px' }}
              />
              <p>{selectedBook.descripcion}</p>
  
              {/* Modification Form */}
              <form>
                <div className="form-field">
                  <label>Nombre del libro:</label>
                  <input
                    type="text"
                    placeholder="Nombre del libro"
                    value={modificationFormData.nombre_libro}
                    onChange={(e) =>
                      setModificationFormData({
                        ...modificationFormData,
                        nombre_libro: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Género:</label>
                  <input
                    type="text"
                    placeholder="Género"
                    value={modificationFormData.genero}
                    onChange={(e) =>
                      setModificationFormData({
                        ...modificationFormData,
                        genero: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Autor:</label>
                  <input
                    type="text"
                    placeholder="Autor"
                    value={modificationFormData.autor}
                    onChange={(e) =>
                      setModificationFormData({
                        ...modificationFormData,
                        autor: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Descripción:</label>
                  <textarea
                    placeholder="Descripción"
                    value={modificationFormData.descripcion}
                    onChange={(e) =>
                      setModificationFormData({
                        ...modificationFormData,
                        descripcion: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Valoración:</label>
                  {/* Assume Rating component is used here */}
                  <Rating
                    rating={modificationFormData.valoracion}
                    onChange={(rating) =>
                      setModificationFormData({
                        ...modificationFormData,
                        valoracion: rating,
                      })
                    }
                  />
                </div>
              </form>
  
              <Button onClick={handleCloseModal} variant="outlined" color="error">
                Cerrar
              </Button>
              <Button onClick={handleModifyBook} variant="outlined">
                Modificar
              </Button>
            </div>
          )}
        </div>
      </Modal>
  
      <Modal
        open={isAddBookModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="add-book-modal"
        aria-describedby="add-book-dscription"
      >
        <div className="book-modal">
          <div className="book-details">
            <h2>Agregar Nuevo Libro</h2>
            <form>
              <div className="form-field">
                <label>Nombre del libro:</label>
                <input
                  type="text"
                  placeholder="Nombre del libro"
                  value={newBook.nombre_libro}
                  onChange={(e) =>
                    setNewBook({ ...newBook, nombre_libro: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label>Género:</label>
                <input
                  type="text"
                  placeholder="Género"
                  value={newBook.genero}
                  onChange={(e) =>
                    setNewBook({ ...newBook, genero: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label>Autor:</label>
                <input
                  type="text"
                  placeholder="Autor"
                  value={newBook.autor}
                  onChange={(e) =>
                    setNewBook({ ...newBook, autor: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label>Descripción:</label>
                <textarea
                  placeholder="Descripción"
                  value={newBook.descripcion}
                  onChange={(e) =>
                    setNewBook({ ...newBook, descripcion: e.target.value })
                  }
                />
              </div>
              <div className="form-field">
                <label>Valoración:</label>
                <Rating
                  rating={newBook.valoracion}
                  onChange={(rating) =>
                    setNewBook({ ...newBook, valoracion: rating })
                  }
                />
              </div>

              <Button
                onClick={handleAddBook}
                variant="contained"
                color="primary"
                disabled={
                  !newBook.nombre_libro ||
                  !newBook.genero ||
                  !newBook.autor ||
                  !newBook.descripcion ||
                  newBook.valoracion === 0
                }
              >
                Agregar
              </Button>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                color="error"
              >
                Cancelar
              </Button>
            </form>
          </div>
        </div>
      </Modal>
     
    </div>
  );
  
}

export default Lectura;
