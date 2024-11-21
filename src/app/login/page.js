
'use client'

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useState} from 'react';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Select } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
export default function MyApp() {

  // variables needed to allow to show or hide the password
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // we must restrict the user to 2 choices either a customer or manager
  const [acc_type, setAcc_type] = React.useState('');
  const handleChange = (event) => {
    setAcc_type(event.target.value);
  }

  const handleSubmit = (event) => {

    console.log("handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('username')
    let pass = data.get('password')
    let acc_type = data.get('acc_type')
    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)
    console.log("Sent acc_type:" + acc_type)

    runDBCallAsync(`http://localhost:3000/api/login?username=${email}&password=${pass}&acc_type=${acc_type}`)
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
  
    // Check if the response is OK (status 2xx)
    if (!res.ok) {
      console.error("Login failed with status:", res.status);
      alert("Login failed. Please check your credentials.");
      return;
    }
  
    try {
      // Attempt to parse the response as JSON
      const data = await res.json();
  
      if (data.success) {
        // If login is successful, redirect to the corresponding page
        console.log("Login is valid!");
        window.location.href = data.redirectUrl;
      } else {
        // If login is invalid, show error message
        console.log("Login is invalid:", data.message);
        alert(data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      alert("Unexpected error occurred. Please try again later.");
    }
  }

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
            Krispy Kreme
          </Typography>

          <Button color="inherit" href='/login'>Login</Button>
          <Button color="inherit" href='/register'>Register</Button>

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
          <InputLabel htmlFor="pass">Password</InputLabel>
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

        <FormControl width="ld">
        <InputLabel id="acc_type">What Are You?</InputLabel>
          <Select
          labelId="acc_type"
          name="acc_type"
          id="acc_type"
          value={acc_type}
          label="Account Type"
          onChange={handleChange}
          >
          <MenuItem value={'customer'}>Customer</MenuItem>
          <MenuItem value={'manager'}>Manager</MenuItem>
        </Select>
        </FormControl>

          <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          />
          <Button id="sign-in"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          >
          Sign In
          </Button>
        </Box>
      </Box>
    </Container>
    ); // end return
}