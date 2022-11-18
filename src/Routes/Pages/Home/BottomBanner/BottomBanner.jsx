import { Box, Button, Grid, Typography } from "@mui/material";
import treatment from "../../../../assets/images/treatment.png";

const BottomBanner = () => {
  return (
    <Grid
      container
      spacing={{ md: 5, xs: 0 }}
      maxWidth="md"
      my={20}
      mx={{
        xs: "0",
        md: "auto",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          padding: {
            xs: "70px",
            md: "20px",
          },
        }}
      >
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
          color: "accent",
          padding: {
            xs: "70px",
            md: "20px",
          },
        }}
      >
        <Box
          sx={{
          }}
        >
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
            component="p"
            sx={{
              marginTop: 2,
              fontSize: 14,
              paddingRight: 3
            }}
          >
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page
          </Typography>
          <Button
            disableElevation
            sx={{
              color: "white",
              marginTop: 2,
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
