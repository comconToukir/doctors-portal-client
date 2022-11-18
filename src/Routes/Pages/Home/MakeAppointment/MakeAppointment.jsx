import { Box, Button, Container, Grid, Typography } from "@mui/material";
import appointment from "../../../../assets/images/appointment.png";
import doctor from "../../../../assets/images/doctor.png";

const MakeAppointment = () => {
  return (
    <Box
      sx={{
        marginTop: {
          xs: "100px",
          md: "300px"
        },

      }}
      style={{
        backgroundImage: `url(${appointment})`,
        backgroundPosition: "center center",
        position: "relative",
      }}
    >
      <Grid
        container
        spacing={{ md: 5, xs: 0 }}
        maxWidth="lg"
        my={20}
        mx={{
          xs: "0",
          md: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: {
              md: "block",
              xs: "none"
            }

          }}
          style={{
            position: "relative",
          }}
        >
          <img
            src={doctor}
            style={{
              width: "600px",
              borderRadius: "10px",
              position: "absolute",
              left: "-40px",
              bottom: 0,
            }}
            alt=""
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            width: "100%",
            display: "grid",
            flexDirection: "column",
            placeItems: "center",
            color: "accent",
            padding: {
              xs: "70px",
              md: "50px",
            },
          }}
        >
          <Container
            sx={{
              
            }}
          >
            <Typography
              component="h2"
              color="secondary"
              style={{
                fontWeight: "bold",
              }}
            >
              Appointment
            </Typography>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "600",
                color: "white"
              }}
            >
              Make an appointment Today
            </Typography>
            <Typography
              as="p"
              sx={{
                marginTop: 2,
                fontSize: 14,
                color: "white"
              }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsumis that it has a more-or-less normal
              distribution of letters,as opposed to using 'Content here, content
              here', making it look like readable English. Many desktop
              publishing packages and web page
            </Typography>
            <Button
              disableElevation
              sx={{
                color: "black",
                marginTop: "20px",
              }}
              color="primary"
              variant="contained"
            >
              Get Started
            </Button>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MakeAppointment;
