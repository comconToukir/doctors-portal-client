import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import HeaderNav from "./HeaderNav/HeaderNav";
import doctorTheme from "./DoctorTheme/DoctorTheme";
import { Toaster } from "react-hot-toast";

const Main = () => {
  return (
    <div>
      <ThemeProvider theme={doctorTheme}>
        <HeaderNav />
        <Container
          maxWidth="xl"
          style={{
            overflow: "hidden",
          }}
        >
          <Outlet />
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className: "",
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
              error: {
                duration: 5000,
                theme: {
                  primary: "red",
                  secondary: "black",
                },
              },
            }}
          />
        </Container>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default Main;
