import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState(null);

  const handleAuthedUser = (loggedInUser) => {
    setAuthedUser(loggedInUser);
  };

  return (
    <UserContext.Provider value={{ authedUser, handleAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};