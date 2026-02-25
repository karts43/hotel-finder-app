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

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // 🔹 Frontend validation
    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter email and password");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword,
        });

      // 🔹 Supabase error
      if (loginError) {
        setError(loginError.message);
        return;
      }

      // 🔹 Success
      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again.");
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
              handleLogin();
            }}
          >
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              Welcome Back
            </Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ mb: 4, opacity: 0.8 }}
            >
              Login to access your hotel dashboard
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
              {loading ? <CircularProgress size={24} /> : "Login"}
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
            onClick={() => navigate("/signup")}
          >
            Don't have an account? Signup
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;