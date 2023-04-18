import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import backgroundImg from '../img/background_login.jpeg';
import {useState} from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const auth = getAuth();
    

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = (event) => {
        console.log("Form submitted");
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
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
                    <FormControl sx={{ m: 1, width: '60ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            gutterBottom align='center'
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
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

