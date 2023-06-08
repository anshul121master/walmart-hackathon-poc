import React, { createContext, useState } from 'react';

export const SignInContext = createContext();

export const SignInProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const signIn = () => {
    setIsSignedIn(true);
  };

  const signOut = () => {
    setIsSignedIn(false);
  };

  return (
    <SignInContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </SignInContext.Provider>
  );
};