import React, { createContext, useState } from 'react';

export const OffersContext = createContext();

export const OfferListProvider = ({ children }) => {
  const [offersList, setOffersList] = useState({});

  const populateOfferList = (offers) => {
    setOffersList(offers);
  };

  return (
    <OffersContext.Provider value={{ offersList, populateOfferList }}>
      {children}
    </OffersContext.Provider>
  );
};