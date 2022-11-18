import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { UserContext } from "./../../../contexts/UserContext";

const ForgotPasswordModal = ({ open, handleClose }) => {
  const { resetPassword } = useContext(UserContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const sendResetPassEmail = (data) => {
    resetPassword(data.email)
      .then(() => {
        toast.success(`A password reset email has been sent to ${data.email}`);
        reset();
        handleClose();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(sendResetPassEmail)}
      >
        <DialogTitle id="alert-dialog-title">
          {"Send a Reset Password Email?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            An email containing password reset link will be sent to your email
            address. If you can't find the email please check your spam folder.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email?.type === "required" && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              {errors.email?.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Discard
          </Button>
          <Button type="submit" autoFocus>
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordModal;
