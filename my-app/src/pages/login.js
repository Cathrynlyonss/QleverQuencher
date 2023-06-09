import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import backgroundImg from "../img/background_login.jpeg";
import { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#108AFC",
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const auth = getAuth();
  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = (event) => {
    const auth = getAuth();
    console.log("Form submitted");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("login successful");
        navigate("/daily");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("login failed");
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: " 100 00",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
      className="Page-cover"
    >
      <ThemeProvider theme={theme}>
        <Typography variant="h2" component="div" gutterBottom align="center">
          Login
        </Typography>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          pl={74}
        >
          <Grid item xs={2} sm={4} md={4}>
            <Typography>
              <TextField
                sx={{ mb: "20px" , ml: "10px",width: "28ch" }}
                type="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Typography>
            <Typography>
              <FormControl sx={{ m: 1, width: "28ch" , ml: "10px"}} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  gutterBottom
                  align="center"
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
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
            </Typography>
          </Grid>
        </Grid>

        <Button
          variant="contained"
          type="submit"
          sx={{ ml: "20px", mt: "20px"}}
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </ThemeProvider>
    </div>
  );
}
