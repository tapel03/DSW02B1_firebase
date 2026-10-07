import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

const tasksRef = collection(db, "tasks");

// Real-time listener. Returns the unsubscribe function.
export function subscribeToTasks(onData, onError) {
  const q = query(tasksRef, orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const tasks = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onData(tasks);
    },
    onError
  );
}

export function addTask({ title, moduleCode, priority }) {
  return addDoc(tasksRef, {
    title,
    moduleCode,
    priority,
    completed: false,
    createdAt: serverTimestamp(),
  });
}

export function setTaskCompleted(id, completed) {
  return updateDoc(doc(db, "tasks", id), { completed });
}

export function removeTask(id) {
  return deleteDoc(doc(db, "tasks", id));
}