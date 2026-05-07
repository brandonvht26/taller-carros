import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Carro } from '../../src/types/carro';
import { SafeAreaView } from 'react-native-safe-area-context';
import { carrosService } from '@/src/api/carros.service';
import { useCarros, useAgregarCarro } from '../../src/hooks/useCarros'
import { useRouter } from 'expo-router';

// URL base de la API, tomada de la variable de entorno de Expo
const URL = `${process.env.EXPO_PUBLIC_API_URL}/carros`

// Componente Principal de la APP
// Maneje el input de la marca con el estado local
// Obtener la lista de carros usando el hook useCarros
// Define la función para agregar carros que usa el hook useAgregarCarro

export default function App() {
  const router = useRouter()
  // Estado local para controla el valor del input de la marca
  const [marca, setMarca] = useState('')
  // Hook useCarros: obtiene la lista de carros desde la API
  const {data:carros} = useCarros()
  // Hook useAgregarCarro: prepara la mutación para agregar un carro
  const agregarMutation = useAgregarCarro()

  // Función agregar: Ejecuta la mutación con la marca actual
  // Al terminar exitosamente, limpia el input
  
  const agregar = () => {
    agregarMutation.mutate(marca, {onSuccess: () => setMarca('')})
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
      <TextInput
        value={marca}
        onChangeText={setMarca}
        style={{ borderWidth: 3 }}
      />
      <Button title="Agregar" onPress={agregar} />
      <Button title="Ir a Pantalla Genérica" onPress={() => router.push('/generic')} />
      <FlatList 
        // Fuente de Datos
        data = {carros}
        // Clave única por cada carro
        keyExtractor = {item => item.id}
        renderItem = {({item}) =>
          <Text>{item.id} - {item.marca}</Text>
        }
      />
    </SafeAreaView>
  )
}