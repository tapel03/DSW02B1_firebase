import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { logoutStudent } from "../services/authService";

export default function ProfileScreen({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // The ID comes from the authenticated user, never from the UI
    const profileRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      profileRef,
      (snapshot) => {
        setProfile(snapshot.exists() ? snapshot.data() : null);
        setError("");
        setLoading(false);
      },
      (err) => {
        console.warn("Profile error:", err.code);
        setError("Could not load your profile.");
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [user.uid]);

  const handleLogout = async () => {
    try {
      await logoutStudent();
    } catch (err) {
      setError("Could not sign out. Please try again.");
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>My Profile</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#f26522" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : profile ? (
        <>
          <Text style={styles.label}>Student name</Text>
          <Text style={styles.value}>{profile.studentName}</Text>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{profile.email}</Text>
        </>
      ) : (
        <Text style={styles.value}>Setting up your profile…</Text>
      )}

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 14 },
  title: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  label: { color: "#777", marginTop: 8 },
  value: { fontSize: 17, fontWeight: "600" },
  error: { color: "#c0392b" },
  logout: {
    backgroundColor: "#c0392b",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  logoutText: { color: "#fff", fontWeight: "700" },
});