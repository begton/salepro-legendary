import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username, token });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const res = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', res.data.username);
    setUser({ username: res.data.username, token: res.data.token });
    return res.data;
  };

  const register = async (username, password) => {
    const res = await axios.post('/api/auth/register', { username, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('username', res.data.username);
    setUser({ username: res.data.username, token: res.data.token });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
