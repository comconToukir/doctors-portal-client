import { Box, Grid, Typography } from "@mui/material";

import fluoride from "../../../../assets/images/fluoride.png";
import cavity from "../../../../assets/images/cavity.png";
import whitening from "../../../../assets/images/whitening.png";

const data = [
  {
    imageUrl: fluoride,
    title: "Fluoride Treatment",
    text: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
  },
  {
    imageUrl: cavity,
    title: "Cavity Filling",
    text: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
  },
  {
    imageUrl: whitening,
    title: "Teeth Whitening",
    text: "Lorem Ipsum is simply dummy printing and typesetting indust Ipsum has been the",
  },
];

const ThreeServices = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          as="h2"
          variant="h5"
          color="primary.main"
          sx={{
            fontWeight: "500",
          }}
        >
          OUR SERVICES
        </Typography>
        <Typography variant="h4" color="accent.main">
          Services We Provide
        </Typography>
      </Box>
      <Grid
        display="grid"
        my={10}
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
            color="primary"
            variant="primary"
            padding="25px"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "9px",
              textAlign: "center",
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
                color: "accent.main",
                padding: "15px",
              }}
            >
              <Typography variant="h5" fontWeight="500" component="h3">
                {dt.title}
              </Typography>
              <Typography variant="p">{dt.text}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ThreeServices;
