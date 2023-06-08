import React, { createContext, useState } from 'react';

export const OffersContext = createContext();

export const OfferListProvider = ({ children }) => {
  const [offersList, setOffersList] = useState([]);

  const populateOfferList = (list) => {
    setOffersList(list);
  };

  return (
    <OffersContext.Provider value={{ offersList, populateOfferList }}>
      {children}
    </OffersContext.Provider>
  );
};