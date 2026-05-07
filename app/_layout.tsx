import { Stack, useRouter, useSegments } from 'expo-router';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { AuthProvider, useAuth } from "@/src/features/auth/ui/AuthContext";

const qc = new QueryClient();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const onLoginScreen = segments[0] === "login";

    if (!session && !onLoginScreen) {
      router.replace("/login");
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

export default function Layout() {
  return (
    <QueryClientProvider client={qc}>
      <AuthProvider>
        <AuthGate>
          <Stack />
        </AuthGate>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});