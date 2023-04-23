import './App.css';
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from './pages/about';
import Home from './pages/home';
import Weekly from './pages/weekly';
import Navbar from './components/Navbar';
import Login from './pages/login';
import SignUp from './pages/signup';
import Daily from './pages/daily';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedRoutes1 from './ProtectedRoutes1';
import ProtectedRoutes2 from './ProtectedRoutes2';
import Footer from './components/Footer';
import Goals from './pages/goals';
import { getAuth, signOut } from "firebase/auth";


// const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
//   return (
//     <Route
//       path={path}
//       {...rest}
//       render={(props) => {
//         return loggedIn ? <Comp {...props} /> : <Navigate to="/" />;
//       }}
//     />
//   );
// };

class App extends React.Component {
  render(){
    return(
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/home' />} />
          <Route path="/about" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route element = {<ProtectedRoutes/>}> 
            <Route path="/weekly" element={<Weekly />} />
          </Route>
          <Route element = {<ProtectedRoutes1/>}> 
            <Route path="/daily" element={<Daily />} />
          </Route>
          <Route element = {<ProtectedRoutes2/>}>
            <Route path="/goals" element={<Goals />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    )
  }
}

export default App;
