
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

  const [showLogin, setShowLogin] = useState(false);
  const [showDash, setShowDash] = useState(false);
  const [showFirstPage, setShowFirstPage] = useState(true);
  
  // Weather API initialiastion 
  const [weather, setWeatherData] = useState([])

  // This is for getting the products
  const [data, setData] = useState([])
 
    useEffect(() => {
      fetch('http://localhost:3000/api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })


        // call the api for getting weather
        fetch('http://localhost:3000/api/getWeather')
          .then((res) => res.json()) 
          .then((weather) => {
            setWeatherData(weather)
        })
}, [])

  function putInCart(pname, price){
    console.log("Item %s Price %f added to cart", pname, price)
    fetch(`http://localhost:3000/api/putInCart?pname=${encodeURIComponent(pname)}&price=${price}`)
  }

  function runShowLogin(){
      setShowFirstPage(false)
      setShowLogin(true);
      setShowDash(false)
  }

  function runShowDash(){
    setShowFirstPage(false);
    setShowLogin(false);
    setShowDash(true)
}

function runShowFirst(){
  setShowFirstPage(true);
  setShowLogin(false);
  setShowDash(false)
}

  return (

    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
      
        <Toolbar>
        <img src="Images/logo.png" width="64px" height="64px"></img>
        <Button color="inherit" href='../dashboard'>Home</Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Krispy Kreme
          </Typography>

          <Button color="inherit" onClick={runShowFirst}>Products</Button>
          <Button color="inherit" onClick={runShowDash}>Weather</Button>
          <Button color="inherit" onClick={runShowLogin}>Login</Button>

        </Toolbar>
      </AppBar>



      {showFirstPage &&
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <div style={{ fontSize: '40px' }}> Finest Doughnuts</div>
      <div>
        {data.map((item, i) => (
          <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }} key={i}>
            {/* Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.pname}
                style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }}
              />
            )}
            {/* Text Content */}
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.pname}</div>
              <div style={{ fontSize: '13px'}}>{item.pdesc}</div>
              <div>&euro;{item.price}</div>
              <Button onClick={() => putInCart(item.pname, item.price)} variant="outlined">
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Box>

      }

      {showLogin &&

          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
          This box is hidden until you click the button! Imagine this is one page in your app!
          </Box>

      }

    {showDash &&

          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
     
          Today's temperature: {JSON.stringify(weather.temp)}°C

          </Box>
      }
    </Box>
  );

}