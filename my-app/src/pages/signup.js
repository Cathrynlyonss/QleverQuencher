import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import backgroundImg from "../img/background_login.jpeg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { db } from '../config/firebase.js'
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

const theme = createTheme({
  palette: {
    primary: {
      main: "#108AFC",
    },
  },
});

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = React.useState(null);
  const [phoneNum, setPhoneNum] = useState(undefined);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleChange = (event, newAlignment) => {
    setGender(newAlignment);
  };

  async function handleFormSubmit(e) {
    console.log("Form submitted");
    const auth = getAuth();
    try{
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("login successful")
        navigate("/daily")
        // ...
      });

      getHeightInInches(feet, inches)
      await setDoc(doc(db, "Users", email), {
        birthday: birthday,
        gender: gender,
        height: height,
        weight: weight,
        phone: phoneNum
      });

    } catch (error) {
      alert(`Cannot submit form: ${error.message}`);
    }
    //put other data in database with unique id being email
    
  };

  const getHeightInInches = (feet, inches) => {
    height = feet * 12 + inches;
    setHeight(height);
    };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: " 100 00",
        backgroundRepeat: "no-repeat",
        height: "130vh", //change if you want to move background image lower
        width: "100vw",
      }}
      className="Page-cover"
    >
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Typography
              variant="h2"
              component="div"
              gutterBottom
              align="center"
            >
              Signup
            </Typography>
            <TextField
              sx={{ mb: "20px" }}
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              sx={{ mb: "20px" }}
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={birthday}
                  onChange={(newBirthday) => setBirthday(newBirthday)}
                  sx={{ mb: "20px" }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <OutlinedInput
                id="outlined-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">lb</InputAdornment>
                }
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
              <FormHelperText id="outlined-weight-helper-text">
                Weight
              </FormHelperText>
            </FormControl>
            <ToggleButtonGroup
              color="primary"
              value={gender}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              margin="20px"
            >
              <ToggleButton value="F">Female</ToggleButton>
              <ToggleButton value="M">Male</ToggleButton>
              <ToggleButton value="O">Other</ToggleButton>
              <ToggleButton value="P">Prefer Not To Say</ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{p: 2}}>
              <TextField
                id="outlined-number"
                label="Feet"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                endAdornment={
                  <InputAdornment position="Feet">lb</InputAdornment>
                }
                onChange = {(e) => setFeet(e.target.value)}
                margin="20px"
              />
              <TextField
                id="outlined-number"
                label="Inches"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                endAdornment={
                  <InputAdornment position="Inches">lb</InputAdornment>
                }
                onChange={(e) => setInches(e.target.value)}
              />
            </Box>
            <TextField
                sx={{ mb: "20px" }}
                type="number"
                label="Phone Number"
                variant="outlined"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                />
            <Button
              variant="contained"
              type="submit"
              sx={{ ml: "20px", p: "2px" }}
              onClick={handleFormSubmit}
            >
              SignUp
            </Button>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
