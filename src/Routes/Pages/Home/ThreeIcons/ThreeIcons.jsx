import { Box, Grid, Typography } from "@mui/material";
import clock from "../../../../assets/icons/clock.svg";
import marker from "./../../../../assets/icons/marker.svg";
import phone from "./../../../../assets/icons/phone.svg";

const data = [
  {
    imageUrl: clock,
    title: "Opening Hours",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    bgColor: "primary.main",
  },
  {
    imageUrl: marker,
    title: "Visit our location",
    text: "Brooklyn, NY 10036, United States",
    bgColor: "accent.main",
  },
  {
    imageUrl: phone,
    title: "Contact us now",
    text: "+000 123 456789",
    bgColor: "primary.main",
  },
];

const ThreeIcons = () => {
  return (
    <Grid
      display="grid"
      my={20}
      sx={{
        gridTemplateColumns: { md: "repeat(3, 1fr)", xs: "1fr" },
        gap: "20px",
      }}
    >
      {data.map((dt, idx) => (
        <Grid
          key={idx}
          item
          xs={12}
          md={4}
          padding="25px"
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            textAlign: {
              xs: "center",
              md: "start",
            },
            backgroundColor: dt.bgColor,
            alignItems: "center",
            borderRadius: "9px",
          }}
        >
          <img
            src={dt.imageUrl}
            sx={{
              width: "100%",
              margin: "15px",
            }}
            alt=""
          />
          <Box
            sx={{
              color: "white",
              padding: "15px",
            }}
          >
            <Typography variant="h5" component="h3">
              {dt.title}
            </Typography>
            <Typography variant="p">{dt.text}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ThreeIcons;
