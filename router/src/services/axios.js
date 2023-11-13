// api.js
import axios from 'axios';

const apiUrl = 'http://localhost:3030';

export const updateBookUpdate = async (serverType, bookId, updatedBook) => {
  const url = `${apiUrl}/${serverType}/${bookId}`;

  const response = await axios.put(url, updatedBook);
    if (response.status === 200) {
        return response.data;
    } else {
        throw new Error('Error al modificar el libro');
    }
};

export const addBookToServer = async (serverType, newBook) => {
  const url = `${apiUrl}/${serverType}`;

  const response = await axios.post(url, newBook);
    if (response.status === 201) {
        return response.data;
    } else {
        throw new Error('Error al agregar el libro');
    }
};

export const handleDeleteBook = async (id, libros, setLibros) => {
  const serverType = 'lectura';

  try {
        const response = await axios
            .delete(`${apiUrl}/${serverType}/${id}`);
        if (response.status === 200) {
            // Si la eliminación en el servidor es exitosa, actualiza el estado de libros
            const updatedLibros = libros.lectura.filter((libro) => libro.id !== id);
            setLibros({ ...libros, lectura: updatedLibros });
        }
    } catch (error) {
        console.error(error);
    }
};
