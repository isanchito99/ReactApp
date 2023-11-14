import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged  } from "firebase/auth";

function Videojuegos() {
  useEffect(() => {
    const videojuegosRef = collection(db, "videojuegos");

    // Asegurarse de que el usuario esté autenticado antes de realizar la consulta a Firestore
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // El usuario ya está autenticado, puedes realizar la consulta a Firestore
        getDocs(videojuegosRef).then((resp) => {
          console.log(resp);
        }).catch((error) => {
          console.error("Error al obtener documentos de Firestore:", error);
        });
      } 
    });


  }, []);


  return <h1></h1>;
}

export default Videojuegos;
