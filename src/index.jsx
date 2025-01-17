import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import  About from './components/About';
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
        </Routes>
    </BrowserRouter>
  )
}


  

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);