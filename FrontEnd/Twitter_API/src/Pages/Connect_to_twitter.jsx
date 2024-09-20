import React from 'react'

const Connect_to_twitter = () => {

  const handleTwitterLogin = () => {
        // Redirect to the backend route that starts the Twitter OAuth process
        const userId = 'user_' + Math.random().toString(36).substr(2, 9);
        console.log(userId);
        window.location.href = `http://localhost:3000/connect-to-twitter?userId=${userId}`;
      };
    
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <button onClick={handleTwitterLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
            Connect to Twitter
          </button>
        </div>
      );
}

export default Connect_to_twitter

