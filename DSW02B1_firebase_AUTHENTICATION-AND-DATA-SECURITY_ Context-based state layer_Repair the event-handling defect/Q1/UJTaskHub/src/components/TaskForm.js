import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const PRIORITIES = ["Low", "Medium", "High"];

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [validationError, setValidationError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const cleanTitle = title.trim();
    const cleanModule = moduleCode.trim();

    if (!cleanTitle || !cleanModule) {
      setValidationError("Please enter both a task title and a module code.");
      return;
    }

    setValidationError("");
    setSubmitting(true);
    try {
      await onAdd({ title: cleanTitle, moduleCode: cleanModule, priority });
      // Clear ONLY after the write succeeds
      setTitle("");
      setModuleCode("");
      setPriority("Medium");
    } catch (err) {
      setValidationError("Could not save the task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.heading}>Add Task</Text>

      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Module code (e.g. DSW02B1)"
        value={moduleCode}
        onChangeText={setModuleCode}
        autoCapitalize="characters"
      />

      <View style={styles.priorityRow}>
        {PRIORITIES.map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.chip, priority === p && styles.chipActive]}
            onPress={() => setPriority(p)}
          >
            <Text style={priority === p ? styles.chipTextActive : styles.chipText}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {!!validationError && <Text style={styles.error}>{validationError}</Text>}

      <TouchableOpacity
        style={[styles.addButton, submitting && styles.disabled]}
        onPress={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addText}>Add Task</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: "#fff", padding: 16, borderRadius: 12, marginBottom: 12 },
  heading: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  priorityRow: { flexDirection: "row", marginBottom: 8 },
  chip: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 3,
  },
  chipActive: { backgroundColor: "#f26522", borderColor: "#f26522" },
  chipText: { color: "#333" },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  error: { color: "#c0392b", marginBottom: 8 },
  addButton: {
    backgroundColor: "#f26522",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabled: { opacity: 0.6 },
  addText: { color: "#fff", fontWeight: "700" },
});