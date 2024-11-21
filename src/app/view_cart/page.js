
'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useState, useEffect} from 'react';

export default function MyApp() {

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchSession() {
      const response = await fetch('/api/getSession');
      if (response.ok) {
        const data = await response.json();
        console.log('Session Data:', data);
      } else {
        console.log('No session found.');
      }
    }
    fetchSession();
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/getCart')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (

    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">

        <Toolbar>
          <img src="Images/logo.png" width="64px" height="64px"></img>
          <Button color="inherit" href='../dashboard'>Home</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme
          </Typography>
          <Button color="inherit" href='/customer'>Forgot Something?</Button>
        </Toolbar>
      </AppBar>

      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <div style={{ fontSize: '40px' }}> Finest Doughnuts</div>
      <div>
        {data.map((item, i) => (
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }} key={i}>
            {/* Text Content */}
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.pname}</div>
              <div style={{ fontSize: '13px'}}>{item.pdesc}</div>
              <div>&euro;{item.price}</div>
            </div>
          </div>
        ))}
      </div>
      <Button color="green" href='/checkout'>Checkout</Button>

    </Box>
    </Box>
  );

}