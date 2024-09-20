import React from 'react'
import axios from 'axios'
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// TwitterCallback Component to handle OAuth callback
const TwitterCallback = () => {
  // const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  useEffect(() => {
    if (code && state) {
      // Send code and state to the backend
      axios.get(`http://localhost:3000/twitter/callback?state=${state}&code=${code}`)
      .then(response => {
        console.log(response.data);
        alert(response.data.msg);  // Notify user token was stored

      })
      .catch(error => {
        console.error('Error storing token:', error);
        alert('Error during authentication');
      });
    
    }
    else {
      console.error("Code or state missing in the redirect URL");
    }
  }, []);

  return (
    <div>
      <h2>Redirecting...</h2>
    </div>
  );
  
};


export default TwitterCallback