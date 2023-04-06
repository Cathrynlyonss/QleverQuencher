import logo from './logo.svg';
import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from './pages/about';
import Home from './pages/home';

class App extends React.Component{
  render(){
    return(
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    )
  }
}

export default App;
