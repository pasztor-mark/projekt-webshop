import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/check-auth", {
          method: "GET",
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser({ email: data.email, id: data.id });
        }
      } catch (error) {
        console.error('Failed to check authentication:', error);
      }
    };
    checkAuth();
  }, []);

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
    const navigate = useNavigate();
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      setIsAuthenticated(false);
      setUser(null);
      navigate('/authorize');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};