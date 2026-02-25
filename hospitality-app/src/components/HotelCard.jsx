import React from "react";
import { Paper, Typography, Button, Box } from "@mui/material";

function HotelCard({ hotel, isSelected, onSelect }) {
  const price = hotel.offers?.[0]?.price?.total || "N/A";
  const currency = hotel.offers?.[0]?.price?.currency || "";
  const hotelName = hotel.hotel?.name || "Unknown Hotel";
  const cityCode = hotel.hotel?.cityCode || "";

  return (
    <Paper
      elevation={6}
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 3,
        border: isSelected
          ? "2px solid #1976d2"
          : "1px solid rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h6" fontWeight="bold">
            {hotelName}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            City: {cityCode}
          </Typography>

          <Typography mt={1}>
            Price:{" "}
            <strong>
              {price} {currency}
            </strong>
          </Typography>
        </Box>

        <Button
          variant={isSelected ? "contained" : "outlined"}
          color={isSelected ? "error" : "primary"}
          onClick={() => onSelect(hotel)}
          sx={{ minWidth: "120px" }}
        >
          {isSelected ? "Remove" : "Compare"}
        </Button>
      </Box>
    </Paper>
  );
}

export default HotelCard;