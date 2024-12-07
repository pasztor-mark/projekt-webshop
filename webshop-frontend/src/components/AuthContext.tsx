import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  id: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication...');
        const response = await fetchWithTimeout("http://localhost:3000/auth/check-auth", {
          method: "GET",
          credentials: 'include',
        }, 1000);
        console.log('Response:');
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser({ email: data.email, id: data.id });
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = async () => {
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
      window.location.href = '/authorize';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
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


const fetchWithTimeout = (url: string, options: RequestInit, timeout: number): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    )
  ]);
};