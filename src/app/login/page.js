
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

export default function MyApp() {

  const handleSubmit = (event) => {

    console.log("handling submit");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get('email')
    let pass = data.get('pass')
    let acc_type = data.get('acc_type')
    console.log("Sent email:" + email)
    console.log("Sent pass:" + pass)
    console.log("Sent acc_type:" + acc_type)

    runDBCallAsync(`http://localhost:3000/api/login?email=${email}&pass=${pass}&acc_type=${acc_type}`)
  };

  async function runDBCallAsync(url) {
    const res = await fetch(url);
    const data = await res.json();
    if(data.data== true){
        console.log("login is valid!")
     } else {
         console.log("not valid ")
        }
    }

  return (

    
    <Container maxWidth="x1">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
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
      <Box sx={{ height: 'x1' }} >
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
          name="pass"
          label="Password"
          type="pass"
          id="pass"
          autoComplete="current-password"
          />
        
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