import { Container, Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();   // ✅ use it

  // 🔐 Redirect logged-in users to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 4,
            backdropFilter: "blur(12px)",
            background: "rgba(255, 255, 255, 0.1)",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Hotel Finder
          </Typography>

          <Typography variant="body1" sx={{ mb: 5, opacity: 0.85 }}>
            Discover and compare the best hotel deals worldwide
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              mb: 2,
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #00c6ff, #0072ff)",
              borderRadius: 3,
              "&:hover": {
                background: "linear-gradient(90deg, #0072ff, #00c6ff)",
                transform: "scale(1.02)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderRadius: 3,
              borderColor: "#fff",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
                transform: "scale(1.02)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;