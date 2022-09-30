import { createContext, useState } from "react";
import PRODUCTS from "../shop-data.json";

// Actual value you want to access
export const ProductsContext = createContext({
  Products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
