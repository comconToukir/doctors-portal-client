import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MenuItem, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const BookingModal = ({
  open,
  handleClose,
  treatment,
  setTreatment,
  selectedDate,
  refetch
}) => {
  const { name, slots, price } = treatment;
  const [slot, setSlot] = useState("");

  const { user } = useContext(UserContext);


  const handleChange = (event) => {
    setSlot(event.target.value);
  };

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;

    const selectedSlot = form.selectedSlot.value;
    const phone = form.phone.value;

    const bookingData = {
      appointmentDate: selectedDate,
      treatmentId: treatment._id,
      treatmentName: name,
      patient: user?.displayName,
      timeSlot: selectedSlot,
      email: user?.email,
      phone,
      price
    };

    // console.log(bookingData);
    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          refetch();
          form.reset();
          setTreatment({});
          setSlot("");
          handleClose();
          toast.success("Bookings confirmed");
        } else {
          toast.error(data.message)
        }
      })
      .catch(err => {
        toast.error("Could not place booking. Please try again.")
        console.log(err);
      })
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby={name}
        aria-describedby={name}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {name}
          </Typography>
          <Box
            onSubmit={handleBooking}
            component="form"
            autoComplete="off"
            width="100%"
          >
            <div>
              <TextField
                required
                disabled
                label="Appointment date"
                variant="filled"
                defaultValue={selectedDate}
                size="small"
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              />
              {slots?.length ? (
                <TextField
                  required
                  select
                  name="selectedSlot"
                  label="Select a time slot"
                  value={slot}
                  onChange={handleChange}
                  sx={{
                    mt: 2,
                    width: "100%",
                  }}
                >
                  {slots.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
              <TextField
                required
                disabled
                name="fullName"
                label="Full Name"
                defaultValue={user?.displayName}
                size="small"
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              />
              <TextField
                required
                disabled
                name="email"
                label="email"
                type="email"
                defaultValue={user?.email}
                size="small"
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              />
              <TextField
                required
                name="phone"
                type="tel"
                label="Phone number"
                pattern="[]"
                size="small"
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              />
              <Button
                disabled={user?.uid ? false : true}
                type="submit"
                sx={{
                  marginTop: 2,
                  width: "100%",
                  color: "white",
                  marginX: "auto",
                  backgroundColor: "secondary.main",
                  "&:hover": {
                    backgroundColor: "primary.main",
                  },
                }}
              >
                Submit
              </Button>

              {user?.uid ? null : (
                <Typography
                  variant="subtitle2"
                  textAlign="center"
                  marginTop={1}
                >
                  Please log in first
                </Typography>
              )}
            </div>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BookingModal;
