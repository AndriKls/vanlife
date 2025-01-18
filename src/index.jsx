import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import  About from './pages/About';
import Header from './components/Header';
import Vans from './pages/Vans';
import "./server"

function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vans" element={<Vans />} />
        </Routes>
    </BrowserRouter>
  )
}


  

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);