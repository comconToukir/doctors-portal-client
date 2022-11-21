import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";
import toast from "react-hot-toast";

const AddDoctor = () => {
  const [specialty, setSpecialty] = useState("");

  const navigate = useNavigate();

  const imageHostKey = process.env.REACT_APP_imgbb_key;
  // console.log(imageHostKey);

  const { data: specialtyOptions = [], isLoading } = useQuery({
    queryKey: ["specialtyOptions"],
    queryFn: () =>
      fetch(`https://doctors-portal-server-flax-eta.vercel.app/specialtyOptions`).then((res) => res.json()),
  });

  // console.log(specialtyOptions);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddDoctor = (data) => {
    // console.log(data);

    const image = data.image[0];
    const formData = new FormData();

    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            imgUrl: imgData.data.url,
          };

          // save doctor information to database
          fetch("https://doctors-portal-server-flax-eta.vercel.app/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is added to database`);
              navigate('/dashboard/manage-doctors')
            });
        }
      });
  };

  const handleChange = (e) => {
    setSpecialty(e.target.value);
  };

  if (isLoading) return <Loading />;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleAddDoctor)}
      autoComplete="off"
      sx={{
        "& .MuiTextField-root": { maxWidth: "45ch" },
        maxWidth: "45ch",
        padding: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        sx={{
          marginBottom: 3,
        }}
      >
        Add a New Doctor
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
      {specialtyOptions?.length ? (
        <>
          <TextField
            required
            select
            label="Select a Specialty"
            // onChange={handleChange}
            defaultValue=""
            sx={{
              mt: 2,
              width: "100%",
            }}
            {...register("specialty", { required: "Specialty is required" })}
          >
            {specialtyOptions.map((option, idx) => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </>
      ) : null}
      {errors.specialty?.type === "required" && (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          {errors.email?.message}
        </Typography>
      )}
      {/* <Button
        variant="outline"
        color="accent"
        component="label"
        sx={{
          marginTop: 2,
          borderColor: "accent",
        }}
      >
        Upload File */}
      <TextField
        required
        size="small"
        type="file"
        sx={{
          marginTop: 2,
          borderColor: "accent",
        }}
        hidden
        aria-label="picture upload"
        {...register("image", { required: "Picture is required" })}
      />
      {/* </Button> */}
      {/* <TextField
        
        type="file"
        size="small"
        aria-label="photo"
        // label="photo"
        
      /> */}
      {errors?.image?.type === "required" && (
        <Typography variant="subtitle2" sx={{ color: "red" }}>
          {errors.name?.message}
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
        Add
      </Button>
    </Box>
  );
};

export default AddDoctor;

/**
 * three places to store images
 * 1. image hosting server
 * 2. file system of your server
 * 3. mongodb (base 64 string)
 */
