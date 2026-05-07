// Importar los hooks de tanstack query.
// -useQuery: para consultas GET.
// -useMutation: para operaciones POST/PUT/UPDATE/DELETE.
// -useQueryClient: para interactuar con la caché.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// Importar el servicio que contiene las funciones de API.
import { carrosService } from "../api/carros.service";

// Definir una constate Key --> Como identificador único para todas las Querys relacionadas con el recurso carros.
const KEY = ['carros']

// Hook Personalizado: useCarros para encapsular la lógica de obtener carros desde la API.
// Se usa useQuery que reeemplaza al useEffect y el useState con queryKey 'carros'.
// -queryFin: ejecuta carrosService.getAll() y muestra un console.log.
// -staleTime: definir que los datos se mantengan en caché por 'n' minutos.

export function useCarros() {
    return useQuery({
        queryKey: ['carros'],
        queryFn: () => {
            console.log('🎃 GET Ejecutado - Se fue a Red')
            return carrosService.getAll()
        },
        staleTime: (1000*60)*5 // Caché válido de 5 min --> La nomeclatura original va en milisegundos.
    })
}

// Hook Personalizado: Encapsular la lógica de agregar un carro nuevo.
// Usar useMutation para llamar a carrosService.add().
// onSuccess: invalidar la query 'carros' para refrescar la lista al haber cambios de forma automática.
export function useAgregarCarro() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (marca:string) => carrosService.add(marca),
        onSuccess: () => qc.invalidateQueries({queryKey: KEY}),
    })
}