import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from './pages/about';
import Home from './pages/home';
import Graphs from './pages/graphs';
import Navbar from './components/Navbar';
import Login from './pages/login';
import SignUp from './pages/signup';
import Daily from './pages/daily';

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
          <Route path="/daily" element={<Daily />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    )
  }
}

export default App;
