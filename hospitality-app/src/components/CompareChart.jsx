import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

function CompareChart({ selectedHotels }) {
  const chartData = selectedHotels.map((hotel) => ({
    name: hotel.hotel.name,
    price: Number(hotel.offers?.[0]?.price?.total) || 0,
  }));

  return (
    <Paper
      elevation={6}
      sx={{
        p: 4,
        borderRadius: 4,
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
      >
        Hotel Price Comparison
      </Typography>

      <Box sx={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="price" fill="#1976d2" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default CompareChart;