import { useState, useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import { Toaster } from "react-hot-toast";
import doctorTheme from "./DoctorTheme/DoctorTheme";
import HeaderNav from "./HeaderNav/HeaderNav";

import { Container, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import { UserContext } from "../contexts/UserContext";
import useCheckAdmin from "./../customHooks/useCheckAdmin";

const drawerWidth = 240;

const DashBoardLayout = () => {
  const { user } = useContext(UserContext);

  const [isAdmin] = useCheckAdmin(user?.email);

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let dashboardRoutes = [
    {
      path: "/dashboard",
      text: "My appointments",
    },
  ];

  if (isAdmin) {
    dashboardRoutes = [
      {
        path: "/dashboard",
        text: "My appointments",
      },
      {
        path: "/dashboard/all-users",
        text: "All Users",
      },
      {
        path: "/dashboard/add-doctor",
        text: "Add a doctor",
      },
      {
        path: "/dashboard/manage-doctors",
        text: "Manage Doctors",
      },
    ];
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {dashboardRoutes.map((route, index) => (
          <ListItem
            component={NavLink}
            key={route.text}
            to={route.path}
            disablePadding
            sx={{
              color: "accent.main",
            }}
          >
            <ListItemButton>
              <ListItemText primary={route.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
      <ThemeProvider theme={doctorTheme}>
        <HeaderNav handleDrawerToggle={handleDrawerToggle} />
        <Container
          maxWidth="xl"
          style={{
            overflow: "hidden",
            marginTop: "70px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Box
              component="nav"
              sx={{
                
                width: {
                  // md: drawerWidth,
                },
                flexShrink: {
                  sm: 0,
                  xl: 1
                },
              }}
              aria-label="dashboard drawers"
            >
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", md: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: "none", md: "block" },
                  height: "100%",
                  backgroundColor: "yellow",
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
                open
              >
                {drawer}
              </Drawer>
            </Box>
            <Box
              component="main"
              // position="fixed"
              sx={{
                flexGrow: 1,
                p: 1,
                width: { md: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
                // width: { md: `100%`, xs: "100%" },

                marginLeft: {
                  md: `${drawerWidth}px`,
                  // xl: 6,
                },
              }}
            >
              <Outlet />
            </Box>
          </Box>
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
      </ThemeProvider>
    </>
  );
};

export default DashBoardLayout;
