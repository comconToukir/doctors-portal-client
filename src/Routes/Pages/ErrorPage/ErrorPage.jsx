import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useRouteError } from "react-router-dom";
import { Box } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext";

const ErrorPage = () => {
  const { logOutUser } = useContext(UserContext);

  const navigate = useNavigate();
  const error = useRouteError();

  console.error(error);

  const handleLogOut = () => {
    logOutUser().then(navigate("/login"));
  };

  return (
    <Box sx={{ height: "500px", display: "grid", placeItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Typography component="h1" variant="h3">
          Oops!
        </Typography>
        <Typography component="p" variant="h5" mt={2} mb={1}>
          Something went wrong.
        </Typography>
        <Typography component="i">
          {error.status} {error.statusText || error.message}
        </Typography>
        <Typography mt={4}>
          Please{" "}
          <Button
            onClick={handleLogOut}
            color="primary"
            variant="outlined"
            sx={{
              marginX: 1,
            }}
          >
            Log Out
          </Button>{" "}
          and log back in
        </Typography>
      </div>
    </Box>
  );
};

export default ErrorPage;
