import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    // Trim inputs to avoid spaces-only values
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // 🔹 Frontend validation
    if (!trimmedEmail || !trimmedPassword) {
      setError("Please fill in all fields");
      return;
    }

    // 🔹 Optional: password length check
    if (trimmedPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email: trimmedEmail,
        password: trimmedPassword,
      });

      // 🔹 Supabase validation errors
      if (signupError) {
        setError(signupError.message);
        return;
      }

      // 🔹 Success
      navigate("/login", { replace: true });

    } catch (err) {
      // 🔹 Network / unexpected error
      console.error("Signup Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141e30, #243b55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={12}
          sx={{
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSignup();
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Create Account
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 4, opacity: 0.8 }}
            >
              Sign up to access hotel search dashboard
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && !email}
              sx={{
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#888" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
              }}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && !password}
              sx={{
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#888" },
                  "&:hover fieldset": { borderColor: "#fff" },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 3,
                background: "linear-gradient(90deg, #00c6ff, #0072ff)",
                "&:hover": {
                  background: "linear-gradient(90deg, #0072ff, #00c6ff)",
                  transform: "scale(1.02)",
                },
                transition: "all 0.3s ease",
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Signup"}
            </Button>
          </form>

          <Button
            variant="text"
            fullWidth
            sx={{
              mt: 3,
              color: "#fff",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Signup;