import React, { Dispatch, SetStateAction, createContext, useState } from "react";

export type User = {
  email: string;
};

export interface UserInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  user: {
    email: "",
  },
  setUser: (user: User) => {},
} as UserInterface;

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserInterface>(defaultState);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({ email: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
