import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import backgroundImg from "../img/splash1.jpeg";

class home extends React.Component {
  render() {
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "100 00",
          backgroundRepeat: "no-repeat",
          height: "150vh",
          width: "100vw",
        }}
        className="Page-cover"
      >
        <Box sx={{ p: 5 }}>
          <Typography variant="h2" component="div" gutterBottom align="center">
            QueverQuencher
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            align="center"
            margin={6}
          >
            The human population requires daily water consumption to survive.
            However, many of us don’t drink nearly enough of it. To solve this
            common problem we are providing a device to the public to strengthen
            hydration goals, better water consumption habits, and bring light to
            daily drinking trends.
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            gutterBottom
            align="center"
            margin={6}
          >
            This device is called QleverQuencher and it essentially acts as a
            smart water bottle. This water bottle will be able to track user
            water consumption trends and display it in an easy to read way on a
            web application. If needed it will also send notifications via phone
            to users to either remind them to drink more water, or maybe even
            less.
          </Typography>
        </Box>
      </div>
    );
  }
}

export default home;
