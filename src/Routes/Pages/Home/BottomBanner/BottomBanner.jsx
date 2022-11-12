import { Box, Button, Grid, Typography } from "@mui/material";
import treatment from "../../../../assets/images/treatment.png";

const BottomBanner = () => {
  return (
    <Grid container spacing={{ md: 5, xs: 1 }} my={20} maxWidth="md" mx="auto">
      <Grid item xs={12} md={6}>
        <img
          src={treatment}
          style={{
            width: "100%",
            borderRadius: "10px",
          }}
          alt=""
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          maxWidth: "6",
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
    </Grid>
  );
};

export default BottomBanner;
