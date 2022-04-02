import { createContext, ReactNode, useContext, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  admin: boolean;
}

interface UserProviderProps {
  children: ReactNode;
}

interface UserContextData {
  user: User;
  receiveUser: (user: User) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>({ id: 0, name: '', email: '', admin: false});

  async function receiveUser(user: User) {
    setUser(user);
  }

  async function logoutUser() {
    setUser({ id: 0, name: '', email: '', admin: false})
  }

  return (
    <UserContext.Provider value={{ user, receiveUser, logoutUser }}>
      { children }
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  return context;
}
