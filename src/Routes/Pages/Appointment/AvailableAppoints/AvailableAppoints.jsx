import dayjs from "dayjs";
import { Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import AppointmentOptions from "./AppointmentOptions";
import BookingModal from "../BookingModal/BookingModal";
import { useQuery } from "@tanstack/react-query";
import Loading from './../../../../Components/Loading/Loading';

const AvailableAppoints = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState({});

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const date = dayjs(selectedDate).format("DD MMMM, YYYY");


  // default value an empty array, can also use isLoading to prevent error when data is not loaded yet
  const { data: appointmentOptions = [], refetch, isLoading } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(`https://doctors-portal-server-flax-eta.vercel.app/v2/appointmentOptions?date=${date}`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Loading />;

  return (
    <Container>
      <Typography
        component="h2"
        variant="h5"
        textAlign="center"
        marginBottom={12}
      >
        Available Appointments on {date}
      </Typography>
      <Grid container spacing={{ md: 5, xs: 2 }} my={20}>
        {appointmentOptions.map((option) => (
          <AppointmentOptions
            key={option._id}
            option={option}
            handleOpen={handleOpen}
            setTreatment={setTreatment}
          />
        ))}
      </Grid>
      <BookingModal
        open={modalOpen}
        handleClose={handleClose}
        treatment={treatment}
        setTreatment={setTreatment}
        selectedDate={date}
        refetch={refetch}
      />
    </Container>
  );
};

export default AvailableAppoints;
