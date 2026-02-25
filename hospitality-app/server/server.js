require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let accessToken = null;
let tokenExpiry = null;

// ===============================
// 🔐 Get Amadeus Access Token
// ===============================
async function getAccessToken() {
  try {
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

    // Token expires in (usually 1800 seconds = 30 min)
    tokenExpiry = Date.now() + response.data.expires_in * 1000;

    console.log("✅ New Access Token Generated");

    return accessToken;
  } catch (error) {
    console.error("❌ Token Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with Amadeus");
  }
}

// ===============================
// 🏨 Get Hotels Route
// ===============================
app.get("/api/hotels", async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate, adults } = req.query;

    if (!cityCode || !checkInDate || !checkOutDate || !adults) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    // 🔄 Refresh token if expired
    if (!accessToken || Date.now() >= tokenExpiry) {
      await getAccessToken();
    }

    // ===============================
    // STEP 1: Get Hotels By City
    // ===============================
    const hotelsList = await axios.get(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          cityCode,
        },
      }
    );

    if (!hotelsList.data.data.length) {
      return res.status(404).json({ error: "No hotels found for this city" });
    }

    const hotelIds = hotelsList.data.data
      .slice(0, 5)
      .map((hotel) => hotel.hotelId)
      .join(",");

    console.log("🏨 Hotel IDs:", hotelIds);

    // ===============================
    // STEP 2: Get Hotel Offers
    // ===============================
    const response = await axios.get(
      "https://test.api.amadeus.com/v3/shopping/hotel-offers",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          hotelIds,
          checkInDate,
          checkOutDate,
          adults: Number(adults),
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("========== FULL ERROR ==========");
    console.error("Message:", error.message);
    console.error("Status:", error.response?.status);
    console.error("Data:", JSON.stringify(error.response?.data, null, 2));

    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
});
//---------------------------------------------------------------------------
app.get("/test", async (req, res) => {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return res.status(400).json({ error });
    }

    res.json({ message: "Supabase connected successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//---------------------------------------------------------------------------

// ===============================
// 🚀 Start Server
// ===============================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});