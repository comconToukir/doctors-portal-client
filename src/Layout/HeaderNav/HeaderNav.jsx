import { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./../../contexts/UserContext";

const pages = [
  {
    path: "",
    title: "Home",
  },
  {
    path: "about",
    title: "About",
  },
  {
    path: "appointment",
    title: "Appointment",
  },
  {
    path: "reviews",
    title: "Reviews",
  },
  {
    path: "contact-us",
    title: "Contact Us",
  },
];

const HeaderNav = ({ handleDrawerToggle }) => {
  const { user, logOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const settings = [
    { value: "Profile", link: null, handler: null },
    { value: "Account", link: null, handler: null },
    { value: "Dashboard", link: "/dashboard", handler: null },
    { value: "Logout", link: null, handler: logOutUser },
  ];

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (handler, link) => {
    if (typeof handler === "function") {
      handler();
    }
    if (link) {
      navigate(link);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: "white",
        boxShadow: "none",
        zIndex: "9999",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            Doctors Portal
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="accent"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ path, title }) => (
                <NavLink
                  key={path}
                  to={`/${path}`}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{title}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            <Link
              to={`/`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              Doctors Portal
            </Link>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "end",
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map(({ path, title }) => (
              <NavLink
                key={path}
                style={{ textDecoration: "none", color: "black" }}
                to={`/${path}`}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {title}
                </Button>
              </NavLink>
            ))}
          </Box>

          {user?.uid ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, ml: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={() => handleCloseUserMenu()}
              >
                {settings.map(({ value, handler, link }) => (
                  <MenuItem
                    key={value}
                    onClick={() => handleCloseUserMenu(handler, link)}
                  >
                    <Typography textAlign="center">{value}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <NavLink
              key="login"
              style={{ textDecoration: "none", color: "black" }}
              to="/login"
            >
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Login
              </Button>
            </NavLink>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderNav;
