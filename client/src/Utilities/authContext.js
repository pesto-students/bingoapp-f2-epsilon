import React, { useContext, useState, useEffect } from "react";
import { auth, googleProvider } from "../firebaseConfig";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    localStorage.removeItem("auth_token");
    return auth.signOut();
  }

  function signInWithGoogle() {
    auth
      .signInWithPopup(googleProvider)
      .then((res) => {
        localStorage.setItem("auth_token", res.user.ya);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  if (currentUser) {
    localStorage.setItem("auth_token", currentUser.ya);
  }
  const value = {
    currentUser,
    login,
    signup,
    signInWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
