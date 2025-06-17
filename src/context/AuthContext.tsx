'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  auth: Record<string, any> | null;
  setAuth: React.Dispatch<React.SetStateAction<Record<string, any> | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<Record<string, any> | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
