import React from "react";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//import logo from '../Images/logo.png';
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: '#336FF9'
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
                {/* <img src={logo} alt="logo" width="200" height="auto" /> */}
                <ThemeProvider theme={theme}>
                    <ButtonGroup color= "primary" variant="text" aria-label="text button group">
                        <Button onClick={handleHome}>
                            <Typography sx={{ minWidth: 100 }}>Home</Typography>
                        </Button>
                        <Button onClick={handleAbout} >
                            <Typography sx={{ minWidth: 100 }}>About QleverQuencher</Typography>
                        </Button>
                        <Button onClick={handleGraphs}>
                            <Typography sx={{ minWidth: 100 }}>Graphs</Typography>
                        </Button>
                    </ButtonGroup>
                </ThemeProvider>
            </Box>
            <Divider variant="middle" />
        </div>
    )
}


