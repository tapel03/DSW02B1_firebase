import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import {
  registerStudent,
  loginStudent,
  friendlyAuthError,
} from "../services/authService";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isRegister = mode === "register";

  const handleSubmit = async () => {
    if (submitting) return;

    const cleanEmail = email.trim();
    const cleanName = studentName.trim();

    if (!cleanEmail || !password || (isRegister && !cleanName)) {
      setError(
        isRegister
          ? "Please enter your name, email and password."
          : "Please enter your email and password."
      );
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      if (isRegister) {
        await registerStudent({
          studentName: cleanName,
          email: cleanEmail,
          password,
        });
      } else {
        await loginStudent({ email: cleanEmail, password });
      }
      // No navigation here: the root reacts to auth state by itself
    } catch (err) {
      setError(friendlyAuthError(err));
      setSubmitting(false);
    }
  };

  const switchMode = () => {
    setMode(isRegister ? "login" : "register");
    setError("");
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{isRegister ? "Create Account" : "Sign In"}</Text>

      {isRegister && (
        <TextInput
          style={styles.input}
          placeholder="Student display name"
          value={studentName}
          onChangeText={setStudentName}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, submitting && styles.disabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isRegister ? "Register" : "Login"}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={switchMode} disabled={submitting}>
        <Text style={styles.link}>
          {isRegister
            ? "Already have an account? Sign in"
            : "No account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 14 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  error: { color: "#c0392b", marginBottom: 10 },
  button: {
    backgroundColor: "#f26522",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabled: { opacity: 0.6 },
  buttonText: { color: "#fff", fontWeight: "700" },
  link: { color: "#2980b9", textAlign: "center", marginTop: 14 },
});