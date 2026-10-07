import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import useAuthUser from "./src/hooks/useAuthUser";
import AuthForm from "./src/components/AuthForm";
import ProfileScreen from "./src/screens/ProfileScreen";

export default function App() {
  const user = useAuthUser(); // undefined | null | user

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>MyUJ Secure Profile</Text>

      {user === undefined ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#f26522" />
          <Text style={styles.checking}>Checking session…</Text>
        </View>
      ) : user === null ? (
        <AuthForm />
      ) : (
        <ProfileScreen user={user} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 16, paddingTop: 50 },
  header: { fontSize: 22, fontWeight: "800", marginBottom: 16 },
  center: { alignItems: "center", marginTop: 40 },
  checking: { marginTop: 8, color: "#555" },
});