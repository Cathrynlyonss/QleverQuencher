import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cathryn from "../img/cathryn.jpeg";
import Kiana from "../img/kiana.png";
import Abigail from "../img/abigail.JPG";
import Werner from "../img/werner.png";
import Divider from "@mui/material/Divider";
import OpacityIcon from "@mui/icons-material/Opacity";

class about extends React.Component {
  render() {
    return (
      <div>
        <Grid
          container
          spacing={{ xs: 2, md: 7 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
        >
          <Grid item xs={2} sm={4} md={10}>
            <Box sx={{ p: 2, bgcolor: "background.paper" }}>
              <Typography
                variant="h3"
                align="center"
              >
                <OpacityIcon sx={{ fontSize: 40 }} color="primary" />
                About Us
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={10}>
            <Box sx={{ p: 3 }}>
            <Divider />
            <br></br>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                Abigail Bright
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <img src={Abigail} height={200} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      gutterBottom
                      align="center"
                    >
                      <p>
                        Hi! I'm Abigail, a senior at the University of
                        Iowa studying Electrical and Computer Engineering. 
                        For this project, I implemented all hardware and components 
                        that were collecting, sending, and receiving data via
                        various protocols and helped ensure the data ended up in
                        the database in a meaningful way. I also implemented all of
                        the texting functionality. Don't drown!
                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={10}>
            <Box sx={{ p: 3, bgcolor: "background.paper" }}>
            <Divider />
            <br></br>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                Cathryn Lyons
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <img src={Cathryn} height={200} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      gutterBottom
                      align="center"
                    >
                      <p>
                        Hi! I'm Cathryn, a senior at the University of
                        Iowa studying Computer Science and Engineering. I helped create and design the 
                        UI/UX for this project. I also aided with the security of our site
                        by using Firebase. I hope you enjoy! Sip away!
                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                align="center"
              ></Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={10}>
            <Box sx={{ p: 3, bgcolor: "background.paper" }}>
            <Divider />
            <br></br>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                Kiana Erickson
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <img src={Kiana} height={200} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      gutterBottom
                      align="center"
                    >
                      <p>
                        Hi! My name is Kiana and I'm a graduating senior from
                        the University of Iowa majoring in Computer Science and
                        Engineering. I helped design and create the user
                        interface for this project and helped with keeping our
                        site secure by using Firebase functions for
                        authentication! Stay hydrated! {" "}
                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={2} sm={4} md={10}>
            <Divider />
            <Box sx={{ p: 3, bgcolor: "background.paper" }}>
              <Typography
                variant="h4"
                component="div"
                gutterBottom
                align="center"
              >
                Werner Bayas
                <Grid container spacing={2}>
                  <Grid item xs={7}>
                    <img src={Werner} height={200} />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      component="div"
                      gutterBottom
                      align="center"
                    >
                      <p>
                      Hi! I'm Werner and I am a senior studying Electrical Engineering 
                      at the University of Iowa. I helped in the integration of the 
                      hardware components for this project. Don't forget to drink water!
                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                align="center"
              ></Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default about;
