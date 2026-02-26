// import axios from "axios";
// const BASE_URL = "http://localhost:5000/api";
import axios from "axios";

const BASE_URL = "/api/hotels";

export const fetchHotels = async (filters) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        cityCode: filters.cityCode,
        checkInDate: filters.checkInDate,
        checkOutDate: filters.checkOutDate,
        adults: Number(filters.adults),
      },
    });

    return response.data.data;
  } catch (error) {
    console.error(
      "Frontend Hotel Fetch Error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};