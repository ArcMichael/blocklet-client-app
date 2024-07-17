import { createContext, useContext, useEffect, useState, useMemo } from 'react';

interface UserContextProps {
  nickname: string;
  setNickname: (nickname: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [nickname, setNickname] = useState<string>(() => {
    return sessionStorage.getItem('nickname') || '';
  });

  useEffect(() => {
    sessionStorage.setItem('nickname', nickname);
  }, [nickname]);

  const value = useMemo(() => ({ nickname, setNickname }), [nickname]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextProps {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
