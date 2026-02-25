import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchHotels = async (filters) => {
  console.log(filters);

  try {
    const response = await axios.get(`${BASE_URL}/hotels`, {
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