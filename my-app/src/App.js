import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from './pages/about';
import Home from './pages/home';
import Graphs from './pages/graphs';
import Navbar from './components/Navbar';

class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/graphs" element={<Graphs />} />
        </Routes>
      </div>
    )
  }
}

export default App;
