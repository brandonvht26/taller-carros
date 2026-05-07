// Importar el cliente axios configurado en cliente.ts
// Importar el tipo Carro para tipar la respuesta de la API

import { client } from './client'; // ./ --> En este mismo directorio
import { Carro } from '../types/carro' // ../ --> Del directorio anterior

// Definimos un servicio carroService
// Este servicio va a centralizar las operaciones relacionadas con la entidad Carro
// Contendrá métodos asincrónicos para interactuar con la API

export const carrosService = {
    // Método GET: obtiene todos los carros del backend
    // Retorna una promesa con un arreglo de objetos Carro
    getAll: async (): Promise<Carro[]> => {
        const{data} = await client.get<Carro[]>('/carros')
        return data
    },

    // Método POST: agregar un nuevo carro envialo la marca al backend
    // Retorna una promesa con el objeto de carro recién creado

    add: async(marca:string): Promise<Carro> => {
        const{data} = await client.post<Carro>('/carros',{marca})
        return data
    }
}