import React from 'react';

function App() {
  const handleTwitterLogin = () => {
    // Redirect to the backend route that starts the Twitter OAuth process
    window.location.href = 'http://localhost:5000/connect-to-twitter';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={handleTwitterLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Connect to Twitter
      </button>
    </div>
  );
}

export default App;
