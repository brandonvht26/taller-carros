import axios from 'axios'

// Creamos un cliente de axios configurado con:
// -baseURL: La URL de la API, tomada de las variables de entorno de EXPO
// -headers: Indicar que el contenido será json

export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL, 
    headers: {'Content-Type': 'application/json'},
})