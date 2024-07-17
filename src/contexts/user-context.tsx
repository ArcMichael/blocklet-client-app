import { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface UserContextProps {
  username: string;
  setUsername: (username: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string>(() => {
    return sessionStorage.getItem('username') || '';
  });

  useEffect(() => {
    sessionStorage.setItem('username', username);
  }, [username]);

  const value = useMemo(() => ({ username, setUsername }), [username]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextProps {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
