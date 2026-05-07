import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { carrosService } from '@/src/api/carros.service';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GenericScreen() {
  const router = useRouter();

  const { data: carros, isLoading } = useQuery({
    queryKey: ['carros'],
    queryFn: carrosService.getAll,
  });

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 60 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        Pantalla Genérica
      </Text>

      <Text style={{ marginBottom: 10 }}>Carros en caché de TanStack:</Text>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        carros?.map((c) => (
          <Text key={c.id}>
            {c.id} - {c.marca}
          </Text>
        ))
      )}

      <Button title="Volver al Index" onPress={() => router.back()} />
    </SafeAreaView>
  );
}
