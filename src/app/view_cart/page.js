
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

  return (

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



          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
          Lets put Login fun stuff here in!
          </Box>
    </Box>
  );

}