import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import HeaderNav from "./HeaderNav/HeaderNav";
import doctorTheme from "./DoctorTheme/DoctorTheme";

const Main = () => {
  return (
    <div>
      <ThemeProvider theme={doctorTheme}>
        <HeaderNav />
        <Container maxWidth="xl">
          <Outlet />
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Main;
