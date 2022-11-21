import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

const AppointmentOptions = ({
  option: { name, slots , price },
  option,
  handleOpen,
  setTreatment,
}) => {
  const handleClick = () => {
    handleOpen();
    setTreatment(option);
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          textAlign: "center",
          paddingY: 1
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14, fontWeight: 600 }}
            color="secondary"
            gutterBottom
          >
            {name}
          </Typography>
          <Typography variant="body2" component="p">
            {slots.length > 0 ? slots[0] : "Not available today"}
            <br />
            {slots.length} {slots.length > 1 ? "spaces" : "space"} available
          </Typography>
          <Typography component="span" variant="subtitle2">
            ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            disabled={slots.length === 0}
            onClick={handleClick}
            sx={{
              color: "white",
              marginX: "auto",
              backgroundColor: "secondary.main",
              '&:hover': {
                backgroundColor: "primary.main"
              }
            }}
          >
            Book Appointment
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default AppointmentOptions;
