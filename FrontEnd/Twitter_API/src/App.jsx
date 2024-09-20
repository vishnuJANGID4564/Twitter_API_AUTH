import React from 'react';  
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Connect_to_twitter from "./Pages/Connect_to_twitter"
import TwitterCallback from "./Pages/TwitterCallback"

function App() {
  
  return (
    <>
    
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Connect_to_twitter />} />
          <Route path="/redirect" element={<TwitterCallback />} />
      </Routes>
    </BrowserRouter>
    </>
    
  )
}


export default App;

