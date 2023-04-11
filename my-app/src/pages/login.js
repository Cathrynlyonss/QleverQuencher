import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import backgroundImg from '../img/background_login.jpeg';
import {useState} from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#108AFC'
    }
  },
});

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleFormSubmit = (event) => {
        console.log("Form submitted");
    }

        return (
            <div style={{ backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: ' 100 00',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw', 
            }} className='Page-cover'>
                <ThemeProvider theme={theme}>
                 <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    style={{
                    display: "flex",
                    flexDirection: "column",
                    margin:"auto",
                    width:"50%"
                    }}
                    >
                    <Typography variant="h2" component="div" gutterBottom align='center'>
                        Login
                    </Typography>
                    <TextField sx={{mb: '20px'}} type='email' label="Email" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField sx={{mb: '20px'}} type='password' label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button 
                        variant="contained"
                        type='submit'
                        sx={{ml:"20px"}}
                    >
                        Login
                    </Button>
                </Box>
                </ThemeProvider>
            </div>
        )
    }

