import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard task={item} onToggle={onToggle} onDelete={onDelete} />
      )}
      ListEmptyComponent={
        <Text style={styles.empty}>No tasks yet. Add your first task above.</Text>
      }
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}

const styles = StyleSheet.create({
  empty: { textAlign: "center", color: "#777", marginTop: 24, fontSize: 15 },
});