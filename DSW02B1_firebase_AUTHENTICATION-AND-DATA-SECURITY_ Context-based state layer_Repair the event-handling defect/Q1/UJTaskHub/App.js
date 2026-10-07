import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from "react-native";
import useTasks from "./src/hooks/useTasks";
import {
  addTask,
  setTaskCompleted,
  removeTask,
} from "./src/services/taskService";
import TaskForm from "./src/components/TaskForm";
import TaskList from "./src/components/TaskList";

export default function App() {
  const { tasks, loading, error } = useTasks();
  const [actionError, setActionError] = useState("");

  const handleToggle = async (id, completed) => {
    try {
      setActionError("");
      await setTaskCompleted(id, completed);
    } catch (err) {
      setActionError("Could not update the task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionError("");
      await removeTask(id);
    } catch (err) {
      setActionError("Could not delete the task. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.header}>UJ Student Task Hub</Text>

      <TaskForm onAdd={addTask} />

      {!!actionError && <Text style={styles.error}>{actionError}</Text>}

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#f26522" />
          <Text style={styles.loadingText}>Loading tasks…</Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4", padding: 16, paddingTop: 40 },
  header: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  center: { alignItems: "center", marginTop: 32 },
  loadingText: { marginTop: 8, color: "#555" },
  error: { color: "#c0392b", textAlign: "center", marginVertical: 8 },
});