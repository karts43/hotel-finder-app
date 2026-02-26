import axios from "axios";

let accessToken = null;
let tokenExpiry = null;

async function getAccessToken() {
  const response = await axios.post(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET,
    }),
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return accessToken;
}

export default async function handler(req, res) {
  try {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate || !adults) {
      return res.status(400).json({ error: "Missing parameters" });
    }

    if (!accessToken || Date.now() >= tokenExpiry) {
      await getAccessToken();
    }

    const hotelsList = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { cityCode },
      }
    );

    const hotelIds = hotelsList.data.data
      .slice(0, 5)
      .map((hotel) => hotel.hotelId)
      .join(",");

    const response = await axios.get(
      "https://test.api.amadeus.com/v3/shopping/hotel-offers",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          hotelIds,
          checkInDate,
          checkOutDate,
          adults: Number(adults),
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}