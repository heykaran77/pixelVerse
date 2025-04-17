import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage on initial load
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // In a real app, you would make an API call here
    // For now, we'll simulate a successful login if credentials match
    // In a production app, this would use JWT tokens, OAuth, etc.

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation - in a real app this would be server-side
        if (email && password) {
          // Create a user object
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            displayName: email.split("@")[0],
          };

          // Store user in localStorage
          localStorage.setItem("user", JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 500); // Simulate network delay
    });
  };

  const signup = (email, password, confirmPassword) => {
    // In a real app, this would create a new user on the server

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation
        if (!email || !password) {
          reject(new Error("Email and password are required"));
          return;
        }

        if (password !== confirmPassword) {
          reject(new Error("Passwords do not match"));
          return;
        }

        if (password.length < 6) {
          reject(new Error("Password must be at least 6 characters"));
          return;
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          reject(new Error("Invalid email format"));
          return;
        }

        // Create a user object
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          displayName: email.split("@")[0],
        };

        // Store user in localStorage
        localStorage.setItem("user", JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
