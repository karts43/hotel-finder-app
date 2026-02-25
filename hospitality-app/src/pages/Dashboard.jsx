
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHotels } from "../context/HotelContext";
import { Navigate } from "react-router-dom";
import { fetchHotels } from "../services/hotelService";
import HotelCard from "../components/HotelCard";
import CompareChart from "../components/CompareChart";

import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";

function Dashboard() {
  const { user } = useAuth();
  const { selectedHotels, addHotel, removeHotel } = useHotels();

  const [cityCode, setCityCode] = useState("PAR");
  const [checkInDate, setCheckInDate] = useState("2026-03-01");
  const [checkOutDate, setCheckOutDate] = useState("2026-03-05");
  const [adults, setAdults] = useState(2);
  const [error, setError] = useState("");

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  const [visibleCount, setVisibleCount] = useState(5);
  const ITEMS_PER_PAGE = 5;

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleSearch = async () => {
    // 🔹 Basic validation
    if (!cityCode.trim()) {
      setError("City code is required");
      return;
    }

    setError("");
    setLoading(true);
    setVisibleCount(ITEMS_PER_PAGE);

    try {
      const data = await fetchHotels({
        cityCode: cityCode.trim(),
        checkInDate,
        checkOutDate,
        adults,
      });

      if (!data || data.length === 0) {
        setError("No hotels found for selected criteria");
        setHotels([]);
        return;
      }

      setHotels(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSelectHotel = (hotel) => {
    const exists = selectedHotels.find(
      (h) => h.hotel.hotelId === hotel.hotel.hotelId
    );

    if (exists) {
      removeHotel(hotel.hotel.hotelId);
    } else {
      addHotel(hotel);
    }
  };

  const displayedHotels = hotels.slice(0, visibleCount);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            fontWeight="bold"
            color="#fff"
            gutterBottom
          >
            Hotel Search Dashboard
          </Typography>
          <Typography color="rgba(255,255,255,0.7)">
            Search, compare and find the best hotel deals
          </Typography>
        </Box>

        {/* Search Form */}
        <Paper
          sx={{
            p: 4,
            mb: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                label="City Code"
                fullWidth
                value={cityCode}
                onChange={(e) =>
                  setCityCode(e.target.value.toUpperCase())
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Check-In"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                label="Check-Out"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={2}>
              <TextField
                label="Adults"
                type="number"
                fullWidth
                value={adults}
                onChange={(e) =>
                  setAdults(Number(e.target.value))
                }
              />
            </Grid>

            <Grid item xs={12} md={1}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: "56px",
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Loading */}
        {loading && (
          <Box textAlign="center" mt={5}>
            <CircularProgress />
            <Typography mt={2} color="#fff">
              Searching hotels...
            </Typography>
          </Box>
        )}

        {/* Empty State */}
        {!loading && hotels.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              color: "#fff",
            }}
          >
            <Typography variant="h6">
              Start by searching hotels above
            </Typography>
          </Paper>
        )}

        {/* Hotel Cards */}
        {!loading &&
          displayedHotels.map((hotel) => (
            <HotelCard
              key={hotel.hotel.hotelId}
              hotel={hotel}
              isSelected={selectedHotels.some(
                (h) =>
                  h.hotel.hotelId === hotel.hotel.hotelId
              )}
              onSelect={handleSelectHotel}
            />
          ))}

        {/* Load More */}
        {!loading && visibleCount < hotels.length && (
          <Box textAlign="center" mt={4}>
            <Button
              variant="outlined"
              sx={{
                borderRadius: 3,
                px: 4,
                color: "#fff",
                borderColor: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          </Box>
        )}

        {/* Comparison Chart */}
        {selectedHotels.length >= 2 && (
          <Box mt={6}>
            <CompareChart selectedHotels={selectedHotels} />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default Dashboard;