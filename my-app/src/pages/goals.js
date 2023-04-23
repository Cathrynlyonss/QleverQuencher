import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import backgroundImg from "../img/background_login.jpeg";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OpacityIcon from "@mui/icons-material/Opacity";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../config/firebase.js";

const theme = createTheme({
  palette: {
    primary: {
      main: "#108AFC",
    },
  },
});

export default function Goals() {
  const [goalOunce, setGoalOunce] = React.useState(0);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleFormSubmit = (event) => {
    console.log("Submit");

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const email = user.email;
        console.log(email);
        const dbRef = doc(db, "Users", email);
        await updateDoc(dbRef, {
          goalInOunces: goalOunce,
        });
      } else {
        console.log("No user signed in");
      }
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
        <Box sx={{ p: 5 }}>
          <OpacityIcon sx={{ fontSize: 100 }} color="primary" />
          <Typography variant="h2" component="div" gutterBottom align="center">
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
            sx={{ ml: "20px", p: "4px" }}
            onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </Box>
      </ThemeProvider>
    </div>
  );
}
