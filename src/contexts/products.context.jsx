import { createContext, useEffect, useState } from "react";

import PRODUCTS from "../shop-data.json";

export const ProductContext = createContext({
  products: [],
  setCurrentProd: () => null,
});

export const ProductProvider = ({ children }) => {
  const [products, setCurrentProd] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
