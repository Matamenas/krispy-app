'use client'

import * as React from 'react';
import { useState } from 'react';
import { Button, TextField, AppBar, Box, Toolbar, Typography, IconButton, Container, Alert } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MyApp() {
  const [message, setMessage] = useState(null); // To store success or error messages
  const [messageType, setMessageType] = useState("success"); // "success" or "error"

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    const accType = "customer"; // Hardcoded account type

    console.log("Registering user:", { email, password, accType });

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, accType }),
    });

    const result = await response.json();
    if (result.success) {
      setMessage("Registration successful! You can now log in.");
      setMessageType("success");
    } else {
      setMessage(result.message || "Registration failed. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <Container maxWidth="ld">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Krispy Kreme
            </Typography>
            <Button color="inherit" href='/login'>Login</Button>
            <Button color="inherit" href='/register'>Register</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button>
        </Box>

        {/* Display success or error message */}
        {message && (
          <Alert severity={messageType} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
      </Box>
    </Container>
  );
}
