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
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";

const drawerWidth = 240;
const navItems = [
  { label: "Dashboard", path: "/", icon: <HomeIcon /> },
  { label: "Guru", path: "/TabelGuru", icon: <SchoolIcon /> },
  { label: "Siswa", path: "/TabelSiswa", icon: <GroupIcon /> },
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
        background: "rgba(58, 69, 123, 0.9)",
        color: "#fff",
        height: "100%",
        paddingY: 2,
        backdropFilter: "blur(8px)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: "bold",
          fontSize: { xs: "1.5rem", md: "1.8rem" },
          fontFamily: "Poppins",
          background: "linear-gradient(90deg, #FF8A80, #FF80AB)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        App
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
                  backgroundColor: "rgba(255, 138, 128, 0.2)",
                  transform: "scale(1.05)",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                },
                transition: "all 0.3s ease",
                color: "#FFCCBC",
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
          background: "linear-gradient(90deg, #3F51B5, #E040FB)",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          transition: "all 0.3s ease",
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
              "&:hover": {
                transform: "rotate(90deg)",
              },
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
              background: "linear-gradient(90deg, #FF6F00, #FFC400)",
              WebkitBackgroundClip: "text",
              color: "white",
              fontSize: { xs: "1rem", md: "1.5rem" },
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
                  color: "#FFF",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "#FFC400",
                  },
                  paddingX: { xs: 1, md: 2 },
                  transition: "all 0.3s ease",
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
              background: "rgba(63, 81, 181, 0.9)",
              color: "#fff",
              boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3, width: "100%" }}>
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
