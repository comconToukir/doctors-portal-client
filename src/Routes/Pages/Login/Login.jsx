import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import useGetToken from "../../../customHooks/useGetToken";
import ForgotPasswordModal from "./ForgotPasswordModal";

const Login = () => {
  const { logInUser, googleSignIn } = useContext(UserContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');
  const [ token ] = useGetToken(loggedInUserEmail);

  const from = location.state?.from?.pathname || "/";

  if (token) {
    navigate(from);
  }

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);


  const [logInError, setLogInError] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const signInByGoogle = () => {
    setLogInError("");
    googleSignIn()
      .then(({ user }) => {
        setLoggedInUserEmail(user.email);
      })
      .catch((error) => setLogInError(error.code));
  };

  const handleLogin = (data) => {
    setLogInError("");
    const email = data.email;
    const password = data.password;

    logInUser(email, password)
      .then(({ user }) => {
        setLoggedInUserEmail(email);
      })
      .catch((error) => setLogInError(error.code));
  };

  return (
    <Grid
      height="800px"
      sx={{
        display: "grid",
        placeItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleLogin)}
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { width: "35ch" },
          padding: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          Login
        </Typography>
        <TextField
          sx={{
            marginTop: 2,
          }}
          size="small"
          required
          type="email"
          label="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email?.type === "required" && (
          <Typography variant="subtitle2" sx={{ color: "red" }}>
            {errors.email?.message}
          </Typography>
        )}
        <TextField
          sx={{
            marginTop: 2,
          }}
          required
          size="small"
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password?.type === "required" && (
          <Typography variant="subtitle2" sx={{ color: "red" }}>
            {errors.password?.message}
          </Typography>
        )}
        <Typography
          component="span"
          variant="subtitle2"
          marginX={2}
          marginY={1}
          onClick={handleOpen}
          sx={{
            width: "120px",
            cursor: "pointer",
            color: "accent.main",
          }}
        >
          Forgot Password?
        </Typography>
        <Button
          type="submit"
          aria-label="Submit"
          sx={{
            marginTop: 2,
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "accent.main",
            },
          }}
        >
          Log in
        </Button>
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          New to Doctors Portal ?
          <Typography
            to="/register"
            component={Link}
            variant="subtitle2"
            color="primary"
            sx={{
              marginLeft: 1,
              textDecoration: "none",
            }}
          >
            Create New Account
          </Typography>
        </Typography>
        {logInError && (
          <Typography
            variant="subtitle2"
            sx={{ textAlign: "center", color: "red" }}
          >
            {logInError}
          </Typography>
        )}
        <Divider
          sx={{
            marginTop: 2,
          }}
        >
          <Chip label="OR" />
        </Divider>
        <Button
          onClick={signInByGoogle}
          aria-label="Google log in"
          variant="outlined"
          sx={{
            marginTop: 2,
            borderColor: "accent.main",
            color: "accent.main",
            "&:hover": {
              color: "white",
              borderColor: "accent.main",
              backgroundColor: "accent.main",
            },
          }}
        >
          Continue with Google
        </Button>
        <ForgotPasswordModal
          open={modalOpen}
          handleClose={handleClose}
          onClick={handleOpen}
        />
      </Box>
    </Grid>
  );
};

export default Login;
