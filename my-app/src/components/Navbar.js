import React from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../img/logo.png';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { getAuth, signOut } from "firebase/auth";

const theme = createTheme({
  palette: {
    primary: {
      main: '#108AFC'
    }
  },
});

export default function Navbar(){

    const navigate = useNavigate();

    const logout = () => {
        console.log("Logout");
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logout successful")
            console.log(getAuth())
        }).catch((error) => {
        // An error happened.
        console.log("Error: " + error)
        });
        navigate("/home");
    }

    const handleAbout = (event) => {
        console.log("About");
        navigate("/about");
    }

    const handleHome = (event) => {
        console.log("Home");
        navigate("/home");
    }

    const handleDaily = (event) => {
        console.log("Daily");
        navigate("/daily");
    }

    const handleWeekly = (event) => {
        console.log("Weekly");
        navigate("/weekly");
    }

    const handleLogin = (event) => {
        console.log("Login");
        navigate("/login");
    }

    const handleSignUp = (event) => {
        console.log("Sign Up");
        navigate("/signup");
    }

    const handleGoals = (event) => {
        console.log("Goals");
        navigate("/goals");
    }

    const handleLogout = (event) => {
        console.log("Logout");
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logout successful")
            console.log(getAuth().currentUser)
            navigate("/login")
        }).catch((error) => {
            // An error happened.
            console.log("Error: " + error)
        });
        navigate("/home");
    }


    return(
        <div>
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '& > *': {
                m: 1,
                },
                }}
             >
                <Grid container spacing={2} justifyContent="flex-end">
                    <Box sx={{p:3, mr: 44}}>
                        <Grid item xs={12} >
                            <img src={logo} alt="logo" width="340" height="auto" /> 
                        </Grid>
                    </Box>
                    <Box sx={{p:3}}>
                        <Grid item xs={12}>
                            <ThemeProvider theme={theme}>
                            <ButtonGroup variant="contained" aria-label="outlined button group" color="primary" position='absolute'>
                            {(getAuth().currentUser == null) && <Button variant="contained" onClick={handleLogin}>
                                    <Typography variant="subtitle2" component="div" gutterBottom align='center'>
                                        Login
                                    </Typography>
                                </Button>}
                                {(getAuth().currentUser == null) && <Button variant="contained" onClick={handleSignUp}>
                                    <Typography variant="subtitle2" component="div" gutterBottom align='center'>
                                        Sign Up
                                    </Typography>
                                </Button>}
                                {(getAuth().currentUser != null) && <Button variant="contained" onClick={handleLogout}>
                                    <Typography variant="subtitle2" component="div" gutterBottom align='center'>
                                        Logout
                                    </Typography>
                                </Button>}
                            </ButtonGroup>
                        </ ThemeProvider>
                        </Grid>
                    </Box>
                    
                </Grid>
                <ThemeProvider theme={theme}>
                    <ButtonGroup color= "primary" variant="text" aria-label="text button group">
                        <Button onClick={handleHome}>
                            <Typography sx={{ minWidth: 100 }}>Home</Typography>
                        </Button>
                        <Button onClick={handleAbout} >
                            <Typography sx={{ minWidth: 100 }}>About</Typography>
                        </Button>
                        <Button onClick={handleDaily}>
                            <Typography sx={{ minWidth: 100 }}>Daily Statistics</Typography>
                        </Button>
                        <Button onClick={handleWeekly}>
                            <Typography sx={{ minWidth: 100 }}>Weekly Statistics</Typography>
                        </Button>
                        <Button onClick={handleGoals}>
                            <Typography sx={{ minWidth: 100 }}>Set Hydration Goals</Typography>
                        </Button>
                    </ButtonGroup>
                </ThemeProvider>
            </Box>
            <Divider variant="middle" />
        </div>
    )
}


