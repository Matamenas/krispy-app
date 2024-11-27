'use client';

import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function MyApp() {
  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const response = await fetch('/api/getSession');
      if (response.ok) {
        const data = await response.json();
        console.log('Session Data:', data);
        setSession(data);
      } else {
        console.log('No session found.');
      }
    }
  
    fetchSession();
  }, []);

  useEffect(() => {
    fetch('/api/getCart')
      .then((res) => res.json())
      .then((data) => {
        console.log('Data from getCart:', data);
        setData(data);

        // Calculate the total price
        const total = data.reduce((sum, item) => {
          const price = parseFloat(item.price) || 0;
          return sum + price;
        }, 0);

        setTotalPrice(total);

        const count = data.length;
        setItemCount(count);
      })
      .catch((error) => console.error('Error fetching getCart:', error));
  }, []);

  function placeOrder(itemCount, totalPrice) {
    console.log('Placing order:', { itemCount, totalPrice });
    fetch(`/api/checkOut?itemCount=${itemCount}&totalPrice=${totalPrice}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('Order response', data);
      })
      .catch((error) => console.error('Error placing order', error));
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://smtpjs.com/v3/smtp.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  function sendEmail(){
    if(!session || !session.email) {
      alert("Session not found or email is missing, please log in");
      return;
    }
    if(typeof Email === "undefined") {
      alert ("No Bueno on the email, try again.");
      return;
    }

    Email.send({
      Host: "smtp.gmail.com",
      Username: "matasbagdonas@gmail.com",
      Password: "Mb022889",
      To: session.email,
      From: "Krispy-Kreme@Official.ie",
      Subject: "Order Confirmed",
      Body: `Your order of ${itemCount} items with the total price of €${totalPrice.toFixed(2)} has been placed.`,
    })
      .then(function (message){
        alert("Order Placed. Email Sent.")
      })
      .catch(function (error) {
        console.error("Error sending email:", error)
      });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <img src="Images/logo.png" width="64px" height="64px" alt="Logo" />
          <Button color="inherit" href="../dashboard">Home</Button>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Krispy Kreme Checkout</Typography>
          <Button color="inherit" href="/customer">Forgot Something?</Button>
        </Toolbar>
      </AppBar>

      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <div style={{ fontSize: '40px' }}>Finest Doughnuts</div>
        <div>
          {Array.isArray(data) && data.map((item, i) => (
            <div style={{ padding: '20px', display: 'flex', alignItems: 'center' }} key={i}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.pname}</div>
                <div style={{ fontSize: '13px' }}>{item.pdesc}</div>
                <div>&euro;{parseFloat(item.price).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '20px' }}>
          Total Price: &euro;{totalPrice.toFixed(2)}
        </div>

        {/* Checkout Button */}
        <Button
          variant="contained"
          color="success"
          onClick={() =>{ 
            placeOrder(itemCount, totalPrice); 
            sendEmail();
          }}
          style={{ marginTop: '20px' }}
        >
          Place Order
        </Button>
      </Box>
    </Box>
  );
}
