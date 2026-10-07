import { useEffect, useState } from "react";
import { subscribeToTasks } from "../services/taskService";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeToTasks(
      (data) => {
        setTasks(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.warn("Firestore listener error:", err);
        setError("Could not load tasks. Check your connection and try again.");
        setLoading(false);
      }
    );

    // Cleanup on unmount
    return unsubscribe;
  }, []);

  return { tasks, loading, error };
}