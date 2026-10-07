import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const PRIORITY_COLORS = { Low: "#27ae60", Medium: "#f39c12", High: "#c0392b" };

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.cardDone]}>
      <View style={styles.info}>
        <Text style={[styles.title, task.completed && styles.titleDone]}>
          {task.title}
        </Text>
        <Text style={styles.meta}>{task.moduleCode}</Text>
        <Text style={[styles.priority, { color: PRIORITY_COLORS[task.priority] }]}>
          {task.priority} priority
        </Text>
        <Text style={styles.status}>
          {task.completed ? "✓ Completed" : "○ Incomplete"}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => onToggle(task.id, !task.completed)}
        >
          <Text style={styles.btnText}>
            {task.completed ? "Re-open" : "Complete"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#f26522",
  },
  cardDone: { backgroundColor: "#e8f6ec", borderLeftColor: "#27ae60", opacity: 0.85 },
  info: { flex: 1 },
  title: { fontSize: 16, fontWeight: "700" },
  titleDone: { textDecorationLine: "line-through", color: "#777" },
  meta: { color: "#555", marginTop: 2 },
  priority: { fontWeight: "600", marginTop: 2 },
  status: { marginTop: 4, fontStyle: "italic" },
  actions: { justifyContent: "space-between" },
  toggleBtn: {
    backgroundColor: "#2980b9",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  deleteBtn: {
    backgroundColor: "#c0392b",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "600", textAlign: "center" },
});