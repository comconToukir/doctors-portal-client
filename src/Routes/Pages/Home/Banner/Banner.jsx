import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import chair from "./../../../../assets/images/chair.png";

const Banner = () => {
  return (
    <Grid container spacing={2} my={20}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          color: "accent.main",
        }}
      >
        <Box padding="20px">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "600",
            }}
          >
            Your New Smile Starts Here
          </Typography>
          <Typography
            as="p"
            sx={{
              marginTop: "10px",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            architecto, animi recusandae suscipit quaerat ab.
          </Typography>
          <Button
            disableElevation
            sx={{
              color: "white",
              marginTop: "15px",
            }}
            color="primary"
            variant="contained"
          >
            Get Started
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={chair} style={{ width: "100%" }} alt="" />
      </Grid>
    </Grid>
  );
};

export default Banner;
