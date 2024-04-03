import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './user/Login'
import Appointment from './user/Appointment'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return( 
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/appointments" element={<Appointment/>}/>
      </Routes>
    </Router>
    </>
    
  )
}

export default App
