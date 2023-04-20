import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import About from './pages/About/About'
import Episodes from './pages/Episodes/Episodes'
import HomePage from './pages/HomePage/HomePage'


function App() {
 

  return (
    
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<About />} />
          <Route path='/episodes' element={<Episodes />} />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    
  )
}

export default App
