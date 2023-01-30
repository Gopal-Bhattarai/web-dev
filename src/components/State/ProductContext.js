import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { DeliveryCharge } from "../OwnerDetail";

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
  //getting productsIDs from localstorage or init new empty
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });

  //state to store carts products details
  const [productsInfo, setProductsInfo] = useState([]);

  //fetching products details using localstorage IDs.
  const getProductsFromCart = () => {
    if (selectedProducts.length !== 0) {
      const uniqueIds = [...new Set(selectedProducts)];
      fetch("api/products?ids=" + uniqueIds.join(","))
        .then((response) => response.json())
        .then((json) => setProductsInfo(json));
    }
  };

  let delivery = DeliveryCharge;
  let subtotal = 0;

  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfo.find((p) => p._id === id)?.price;
      subtotal += price;
    }
  }
  const total = subtotal + delivery;

  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        getProductsFromCart,
        productsInfo,
        subtotal, delivery, total
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
