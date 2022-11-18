import { Box, Grid, Typography } from "@mui/material";

import footer from "../../assets/images/footer.png";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${footer})`,
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        paddingY={15}
        
        maxWidth="xl"
        marginX="auto"
        sx={{
          gap: {
            xs: "70px"
          }
        }}
      >
        <Grid
          container
          direction="column"
          item
          xs={12}
          md={3}
          spacing={3}
          sx={{
            alignItems: {
              md: "start",
              xs: "center",
            },
          }}
        >
          <Typography
            component="span"
            variant="h5"
            className="footer-title"
            marginBottom={2}
          >
            Services
          </Typography>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </Grid>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          xs={12}
          md={3}
          spacing={3}
          sx={{
            alignItems: {
              md: "start",
              xs: "center",
            },
          }}
        >
          <Typography
            component="span"
            variant="h5"
            className="footer-title"
            marginBottom={2}
          >
            Company
          </Typography>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </Grid>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          xs={12}
          md={3}
          spacing={3}
          sx={{
            alignItems: {
              md: "start",
              xs: "center",
            },
          }}
        >
          <Typography
            component="span"
            variant="h5"
            className="footer-title"
            marginBottom={2}
          >
            Legal
          </Typography>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </Grid>
      </Grid>
      <Typography
        component="h6"
        variant="h6"
        className="footer-title"
        paddingBottom={3}
        marginTop={-3}
        sx={{
          textAlign: "center",
        }}
      >
        Copyright 2022 All Rights Reserved
      </Typography>
    </Box>
  );
};

export default Footer;
