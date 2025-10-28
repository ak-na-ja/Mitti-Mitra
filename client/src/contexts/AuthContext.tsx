import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserData {
  email: string;
  name: string;
  picture: string;
  token: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => {
    const storedUser = localStorage.getItem('farmer-app-auth');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = user !== null;

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('farmer-app-auth', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmer-app-auth');
    localStorage.removeItem('filtered-tips');
    localStorage.removeItem('translation-cache');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
