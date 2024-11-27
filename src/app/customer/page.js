
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

  const [showWeather, setShowWeather] = useState(false);
  const [showProducts, setShowProducts] = useState(true);
  
  // Weather API initialiastion 
  const [weather, setWeatherData] = useState([])

  // This is for getting the products
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
      fetch('/api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })

        // call the api for getting weather
        fetch('/api/getWeather')
          .then((res) => res.json()) 
          .then((weather) => {
            setWeatherData(weather)
        })
    }, [])

  function putInCart(pname, price){
    console.log("Item %s Price %f added to cart", pname, price)
    fetch(`/api/putInCart?pname=${pname}&price=${price}`)
  }

  function runShowWeather(){
    setShowProducts(false);
    setShowWeather(true)
}

function runShowProducts(){
  setShowProducts(true);
  setShowWeather(false)
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

          <Button color="inherit" onClick={runShowProducts}><img src='Images/products_image.png'></img>Products</Button>
          <Button color="inherit" onClick={runShowWeather}><img src='Images/cloudy.png'></img>Weather</Button>
          <Button color="inherit" href='/view_cart'><img src='Images/shopping-cart.png' alt='Basket'></img>&nbsp;Basket</Button>

        </Toolbar>
      </AppBar>

    {showProducts &&
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
              {/* Text Content and Button to add to cart */}
              <div> 
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.pname}</div>
                <div style={{ fontSize: '13px'}}>{item.pdesc}</div>
                <div>&euro;{item.price}</div>

                <Button onClick={() => putInCart(item.pname, item.price)} variant="outlined" color='secondary'>
                  Add to cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Box>
      }

    {showWeather &&

          <Box component="section" sx={{ p: 2, border: '1px dashed grey'}}>
          Today's temperature: {JSON.stringify(weather.temp)}°C
          </Box>
      }
    </Box>
  );

}