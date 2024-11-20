import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home"; // Updated icon for Dashboard
import SchoolIcon from "@mui/icons-material/School"; // Icon for Guru
import GroupIcon from "@mui/icons-material/Group"; // Icon for Siswa

const drawerWidth = 240;
const navItems = [
  { label: "Dashboard", path: "/", icon: <HomeIcon /> }, // Changed icon to HomeIcon
  { label: "Guru", path: "/Guru", icon: <SchoolIcon /> }, // Icon for Guru
  { label: "Siswa", path: "/Siswa", icon: <GroupIcon /> }, // Icon for Siswa
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "#283593",
        color: "#fff",
        height: "100%",
        paddingY: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: "bold",
          fontSize: "1.5rem",
          fontFamily: "Poppins",
          color: "#E1BEE7",
        }}
      >
        Navbar
      </Typography>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                textAlign: "center",
                "&:hover": {
                  backgroundColor: "#5E35B1",
                  color: "#fff",
                },
                transition: "background-color 0.3s ease",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {item.icon}
                <ListItemText primary={item.label} />
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background: "linear-gradient(90deg, #1A237E 0%, #673AB7 100%)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: "none" },
              transition: "transform 0.3s ease",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              fontFamily: "Poppins",
              color: "#fff",
            }}
          >
            Tugas App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                startIcon={item.icon}
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "#9575CD",
                  },
                  paddingX: 2,
                  transition: "background-color 0.3s ease",
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#283593",
              color: "#fff",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        {/* Content goes here */}
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
