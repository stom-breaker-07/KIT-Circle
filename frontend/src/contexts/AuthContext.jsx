import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProviderInner({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lecturer, setLecturer] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const lecturerData = localStorage.getItem("lecturer");

    if (token && lecturerData) {
      try {
        const parsedLecturer = JSON.parse(lecturerData);
        setLecturer(parsedLecturer);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error parsing lecturer data:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("lecturer");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("lecturer", JSON.stringify(data.lecturer));
      setLecturer(data.lecturer);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("lecturer", JSON.stringify(data.lecturer));
      setLecturer(data.lecturer);
      setIsAuthenticated(true);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("lecturer");
    setLecturer(null);
    setIsAuthenticated(false);
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        lecturer,
        loading,
        login,
        register,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  return <AuthProviderInner>{children}</AuthProviderInner>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
