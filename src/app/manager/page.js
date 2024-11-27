
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

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/getOrders')
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


        </Toolbar>
      </AppBar>
      
          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
                <div style={{ fontSize: '40px' }}>Managers Review Of Orders</div>
                <div>
                    {console.log(data)}
                    {data.map((item, i) => (
                        <div style={{ padding: '20px' }} key={i}>
                          ______________________________________________________________________________________________________________
                          <br></br>
                            Unique ID: {item._id}
                            <br />
                            Amount Ordered: {item.itemCount}
                            <br></br>
                            Total Price: &euro;{parseFloat((item.totalPrice).toFixed(2))}
                            <br />
                            Ordered by: {item.username}
                            <br></br>
                            At: {item.Timestamp}
                            <br></br>
                          _______________________________________________________________________________________________________________
                        </div>
                    ))}
                </div>
          </Box>
    </Box>
  );

}