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
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import useGetToken from './../../../customHooks/useGetToken';

const Register = () => {
  const { createUser, updateUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [loggedInUserEmail, setLoggedInUserEmail] = useState('')
  const [ token ] = useGetToken(loggedInUserEmail);

  if (token) {
    navigate('/');
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleRegister = (data) => {
    const email = data.email;
    const password = data.password;

    const userInfo = {
      displayName: data.name,
    };

    createUser(email, password)
      .then(({ user }) => {
        updateUserInfo(userInfo)
        .then(() => saveUser(user.displayName, user.email))
        .catch((error) => console.error(error));
      })
      .catch((error) => {
        toast.error(error.code);
        console.error(error);
      });
  };

  const saveUser = (name, email) => {
    const user = { name, email };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      setLoggedInUserEmail(email)
    })
  }

  // const getUserToken = email => {
  //   fetch(`http://localhost:5000/jwt?email=${email}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.accessToken) {
  //       localStorage.setItem('accessToken', data.accessToken);
  //       navigate('/');
  //     }
  //   })
  // }

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
        onSubmit={handleSubmit(handleRegister)}
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
          Register
        </Typography>
        <TextField
          sx={{
            marginTop: 2,
          }}
          size="small"
          aria-label="name"
          label="Name"
          {...register("name", { required: "Name is required", maxLength: 30 })}
        />
        {errors.name?.type === "required" && (
          <Typography variant="subtitle2" sx={{ color: "red" }}>
            {errors.name?.message}
          </Typography>
        )}
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
          size="small"
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
              message: "Password must be strong",
            },
            minLength: {
              value: 6,
              message: "Password must be 6 characters or longer",
            },
            maxLength: {
              value: 20,
              message: "Password length cannot exceed 20 characters",
            },
          })}
        />
        {(errors.password?.type === "required" ||
          errors.password?.type === "pattern" ||
          errors.password?.type === "minLength" ||
          errors.password?.type === "maxLength") && (
          <Typography variant="subtitle2" sx={{ color: "red" }}>
            {errors.password?.message}
          </Typography>
        )}
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
          Sign Up
        </Button>
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: "center",
            marginBottom: 3,
          }}
        >
          Already have an account ?
          <Typography
            to="/login"
            component={Link}
            variant="subtitle2"
            color="primary"
            sx={{
              marginLeft: 1,
              textDecoration: "none",
            }}
          >
            Login
          </Typography>
        </Typography>
        <Divider
          sx={{
            marginTop: 2,
          }}
        >
          <Chip label="OR" />
        </Divider>
        <Button
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
      </Box>
    </Grid>
  );
};

export default Register;
