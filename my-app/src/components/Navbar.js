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

const theme = createTheme({
  palette: {
    primary: {
      main: '#108AFC'
    }
  },
});

export default function Navbar(){

    const navigate = useNavigate();

    const handleAbout = (event) => {
        console.log("About");
        navigate("/about");
    }

    const handleHome = (event) => {
        console.log("Home");
        navigate("/home");
    }

    const handleGraphs = (event) => {
        console.log("Graph");
        navigate("/graphs");
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
                    <Box sx={{p:3, mr: 33}}>
                        <Grid item xs={12} >
                            <img src={logo} alt="logo" width="340" height="auto" /> 
                        </Grid>
                    </Box>
                    <Box sx={{p:3}}>
                        <Grid item xs={12}>
                            <ThemeProvider theme={theme}>
                            <ButtonGroup variant="contained" aria-label="outlined button group" color="primary" position='absolute'>
                                <Button variant="contained">
                                    <Typography variant="subtitle2" component="div" gutterBottom align='center'>
                                        Login
                                    </Typography>
                                </Button>
                                <Button variant="contained">
                                    <Typography variant="subtitle2" component="div" gutterBottom align='center'>
                                        Sign Up
                                    </Typography>
                                </Button>
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
                        <Button onClick={handleGraphs}>
                            <Typography sx={{ minWidth: 100 }}>Analytics</Typography>
                        </Button>
                    </ButtonGroup>
                </ThemeProvider>
            </Box>
            <Divider variant="middle" />
        </div>
    )
}


