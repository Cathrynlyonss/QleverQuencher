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
import { db, database } from "../config/firebase.js";
import { ref, set, update } from "firebase/database";

const theme = createTheme({
  palette: {
    primary: {
      main: "#108AFC",
    },
  },
});

export default function Goals() {
  const [goalOunce, setGoalOunce] = React.useState(0);
  const [activityLevel, setActivityLevel] = React.useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const [email, setEmail] = React.useState("");

  const handleFormSubmit = (event) => {
    console.log("Submit Ounces");

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
    update(ref(database, '/'), {
      goalInOunces: goalOunce,
    });
    //print out values to console
    console.log("Updated goal to  %f", goalOunce);
  };

  const handleActivitySubmit = (event) => {
    console.log("SubmitActivity");
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
        const email = user.email;
        console.log(email);
        const dbRef = doc(db, "Users", email);
        await updateDoc(dbRef, {
          activityAmtDaily: activityLevel,
        });
      } else {
        console.log("No user signed in");
      }
    });
    console.log("Activity Level: " + activityLevel);
  };


  const getOuncesRecommended = () => {
    //get user's weight and activity level
    //weight * 2/3 = ounces recommended
    //.4 * min of activity = additional added ounces
    //round up to nearest whole number
    //return ounces recommended
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
            Update
          </Button>
        </Box>
        <Box sx={{ p: 0 }}>
          <TextField
            sx={{ mb: "20px" }}
            type="number"
            label="Workout Minutes Per Day"
            variant="outlined"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{ ml: "20px", p: "4px" }}
            onClick={handleActivitySubmit}
          >
            Update
          </Button>
        </Box>
        <Typography variant="sh2" component="div" gutterBottom align="center">
          Recommended Ounces Per Day:{getOuncesRecommended()}
        </Typography>
      </ThemeProvider>
    </div>
  );
}
