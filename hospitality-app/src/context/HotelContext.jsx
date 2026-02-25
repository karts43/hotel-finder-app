import { createContext, useContext, useState, useEffect } from "react";

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [selectedHotels, setSelectedHotels] = useState(() => {
    try {
      const storedHotels = localStorage.getItem("selectedHotels");
      return storedHotels ? JSON.parse(storedHotels) : [];
    } catch (err) {
      console.error("Error parsing localStorage:", err);
      return [];
    }
  });

  const [compareError, setCompareError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "selectedHotels",
      JSON.stringify(selectedHotels)
    );
  }, [selectedHotels]);

  const addHotel = (hotel) => {
    setCompareError("");

    setSelectedHotels((prev) => {
      if (prev.length >= 3) {
        setCompareError("You can compare up to 3 hotels only");
        return prev;
      }

      const exists = prev.find(
        (h) => h.hotel.hotelId === hotel.hotel.hotelId
      );

      if (exists) return prev;

      return [...prev, hotel];
    });
  };

  const removeHotel = (hotelId) => {
    setSelectedHotels((prev) =>
      prev.filter((h) => h.hotel.hotelId !== hotelId)
    );
  };

  const clearHotels = () => {
    setSelectedHotels([]);
    setCompareError("");
  };

  return (
    <HotelContext.Provider
      value={{
        selectedHotels,
        addHotel,
        removeHotel,
        clearHotels,
        compareError,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => {
  return useContext(HotelContext);
};