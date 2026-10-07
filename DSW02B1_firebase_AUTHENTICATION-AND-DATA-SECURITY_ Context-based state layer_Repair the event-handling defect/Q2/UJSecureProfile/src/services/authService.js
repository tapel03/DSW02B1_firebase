import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

export async function registerStudent({ studentName, email, password }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = credential.user.uid;

  // Profile document ID is the Firebase UID, never the email
  await setDoc(doc(db, "users", uid), {
    studentName,
    email: credential.user.email,
    createdAt: serverTimestamp(),
  });
  return credential.user;
}

export function loginStudent({ email, password }) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutStudent() {
  return signOut(auth);
}

// Turn Firebase error codes into short user-facing messages
export function friendlyAuthError(error) {
  switch (error?.code) {
    case "auth/invalid-email":
      return "That email address is not valid.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password must be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Something went wrong. Please try again.";
  }
}