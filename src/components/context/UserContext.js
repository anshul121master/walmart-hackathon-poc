import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authedUser, setAuthedUser] = useState({
    data: {
      isSuccess: true,
      email: "anshula128@gmail.com",
      userName: "Anshul Agarwal",
      isMember: true
    },
    error: null
  });

  const handleAuthedUser = (loggedInUser) => {
    setAuthedUser(loggedInUser);
  };

  return (
    <UserContext.Provider value={{ authedUser, handleAuthedUser }}>
      {children}
    </UserContext.Provider>
  );
};