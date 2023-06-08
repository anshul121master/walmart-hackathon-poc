import React, { createContext, useState } from 'react';

export const ProductListContext = createContext();

export const ProductListProvider = ({ children }) => {
  const [productList, setProductList] = useState({});

  const populateProductList = (list) => {
    setProductList(list);
  };

  return (
    <ProductListContext.Provider value={{ productList, populateProductList }}>
      {children}
    </ProductListContext.Provider>
  );
};