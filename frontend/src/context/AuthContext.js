import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", data.role);
    localStorage.setItem("username", data.username);
  };

  const logout = () => {
  setUser(null);
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  window.location = "/";  // Redirect to login
};


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
