// src/componetns/Footer.tsx

import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100px",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">
        <Divider />
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h6">
              QleverQuencher
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              2023 Internet of Things Final Project
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;