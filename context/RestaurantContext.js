import { createContext, useContext, useState } from "react";

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  const [restaurant1, setRestaurant1] = useState([]);
  const [restaurant2, setRestaurant2] = useState([]);

  return (
    <RestaurantContext.Provider
      value={{ restaurant1, setRestaurant1, restaurant2, setRestaurant2 }}
    >
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurantData() {
  const context = useContext(RestaurantContext);
  if (!context)
    return {
      restaurant1: [],
      setRestaurant1: () => {},
      restaurant2: [],
      setRestaurant2: () => {},
    };
  return context;
}
