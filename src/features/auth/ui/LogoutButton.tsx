import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useAuth } from "./AuthContext";
import { useRouter } from "expo-router";

export default function LogoutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handlePress = async () => {
    await signOut();
    router.replace("/login");
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.text}>Cerrar sesión</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
  },
  text: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "600",
  },
});
