import { Box, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import chair from "../../../../assets/images/chair.png";

const AppointmentBanner = ({ selectedDate, setSelectedDate }) => {
  const handleChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <>
      <Grid
        container
        spacing={{ md: 5, xs: 0 }}
        maxWidth="md"
        paddingY={{
          xs: 10,
          md: 30,
        }}
        flexDirection={{
          xs: "column-reverse",
          md: "row",
        }}
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
              display: "grid",
              placeItems: "center",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Select a Date"
                inputFormat="DD/MM/YYYY"
                value={selectedDate}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
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
            src={chair}
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
            alt=""
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AppointmentBanner;
