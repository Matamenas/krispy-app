
'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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



          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
          Lets put Login fun stuff here in!
          </Box>
    </Box>
  
}