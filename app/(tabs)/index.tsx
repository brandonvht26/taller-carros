import { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { Carro } from '../../src/types/carro';
import { SafeAreaView } from 'react-native-safe-area-context';
import { carrosService } from '@/src/api/carros.service';

// URL base de la API, tomada de la variable de entorno de Expo
const URL = `${process.env.EXPO_PUBLIC_API_URL}/carros`

export default function App() {
  // Estado para almacenar la lista de carros obtenida del mockup api
  const [carros, setCarros] = useState<Carro[]>([])
  // Estado para manejar el texto ingresado en el input (Marca del carro)
  const [marca, setMarca] = useState('')

  // GET: Consume carrosService para obtener la lista de carros
  useEffect(() => {
    console.log('GET: Solicitando carros a la red (AXIOS)')
    carrosService.getAll().then(setCarros)
  }, [])

  // POST: Consume carrosService para agregar un nuevo carro
  const agregar = async () => {
    console.log('POST: Enviando nuevo carro a la red (AXIOS)')
    const nuevo = await carrosService.add(marca)
    setCarros(prev => [...prev, nuevo])
    setMarca('')
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
      <TextInput
        value={marca}
        onChangeText={setMarca}
        style={{ borderWidth: 3 }}
      />
      <Button title="Agregar" onPress={agregar} />
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