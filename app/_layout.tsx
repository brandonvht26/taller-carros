// Importar Stack desde expo-router que define la navegación
// Importar el QueryClient y QueryClientProvider desde TanStack
// Con esto podemos configurar y proveer el cliente de querys y hooks dentro de toda la app

import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Creamos una instancia de QueryClient, y un objeto que administre la caché y el ciclo de vida de las querys/mutation

const qc = new QueryClient()

// Componente Layout, envolver la navegación (Stack) dentro del Provider
// Con esto, todos los componentes hijos pueden usar useQuery y useMutation, es el punto de integración entre TanStack y la navegación con EXPO

export default function Layout() {
  return(
    <QueryClientProvider client = {qc}>
      <Stack/>
    </QueryClientProvider>
  )
}