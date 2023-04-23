import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import backgroundImg from '../img/background_login.jpeg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OpacityIcon from '@mui/icons-material/Opacity';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

const theme = createTheme({
    palette: {
      primary: {
        main: '#108AFC'
      }
    },
  });

  export default function Goals() {

    const [goalOunce, setGoalOunce] = React.useState(0);

    const handleFormSubmit = (event) => {
        console.log("Submit");
      };

        return (
            <div style={{ backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: ' 100 00',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw', 
            }} className='Page-cover'>
                <Box sx={{p:5}}>
                    <Typography variant="h2" component="div" gutterBottom align='center'>
                        Hydration Goals
                    </Typography>
                    <TextField
                        sx={{ mb: "20px" }}
                        type="number"
                        label="Ounces Per Day"
                        variant="outlined"
                        value={goalOunce}
                        onChange={(e) => setGoalOunce(e.target.value)}
                    />
                    <Button
                    variant="contained"
                    type="submit"
                    sx={{ ml: "20px", p: "2px" }}
                    onClick={handleFormSubmit}
                    >
                        SignUp
                    </Button>
                </Box>
            </div>
        )
}