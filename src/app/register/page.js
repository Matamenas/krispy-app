'use client'

import * as React from 'react';
import { useState } from 'react';
import {FormControlLabel, Checkbox} from '@mui/material';
import { Button, TextField, AppBar, Box, Toolbar, Typography, IconButton, Alert } from '@mui/material';import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function MyApp() {
  const [message, setMessage] = useState(null); // To store success or error messages
  const [messageType, setMessageType] = useState("success"); // "success" or "error"

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')?.trim();
    const password = data.get('password')?.trim();

    const acc_type = "customer"; // Hardcoded account type. every user that registers is a customer

    console.log("Registering user:", { username, acc_type, password});

    
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, acc_type, password}),
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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (

    
    <Container maxWidth="x1">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <img src="Images/logo.png" width="64px" height="64px"></img>
        <Button color="inherit" href='../dashboard'>Home</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme Register
          </Typography>
          &nbsp; Have An Account?: 
          <Button color="inherit" href='/login'>Login</Button>

        </Toolbar>
      </AppBar>

    </Box>
      <Box sx={{ height: 'x1' }} >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Email Address"
          name="username"
          autoComplete="email"
          autoFocus
          />

        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="I AM NOT A ROBOT" required
          />

          <Button id="register"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Register
          </Button>
        </Box>
      </Box>

      {message && (
          <Alert severity={messageType} sx={{ mt: 2 }}>
            {message}
          </Alert>
        )}
    </Container>
    ); // end return
}
