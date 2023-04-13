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
import '../config/firebase.js'

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

  const handleChange = (event, newAlignment) => {
    setGender(newAlignment);
  };

  const handleFormSubmit = (event) => {
    console.log("Form submitted");
  };

  const getHeightInInches = (feet, inches) => {
    return feet * 12 + inches;
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
          <Box
            component="form"
            b
            onSubmit={handleFormSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              width: "50%",
            }}
          >
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
              <ToggleButton value="Female">Female</ToggleButton>
              <ToggleButton value="Male">Male</ToggleButton>
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
            <Button
              variant="contained"
              type="submit"
              sx={{ ml: "20px", p: "2px" }}
              onClick={(event) => {
                console.log(inches);
              }}
            >
              SignUp
            </Button>
          </Box>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
}
