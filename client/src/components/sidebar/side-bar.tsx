
"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from './side-bar.module.css'
import { useState } from "react";
import Link from "next/link";
import RunCircleIcon from '@mui/icons-material/RunCircle';
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const menuItems = [
  { title: "Profile", path: '/profile', icon : <PersonIcon/>},
  { title: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
  { title: "Groups", path: "/groups", icon: <GroupIcon /> },
  { title: "Settings", path: "/settings", icon: <SettingsIcon /> },
];

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box >
      <Toolbar>
        <RunCircleIcon/>
        <h3>My Application</h3>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            href={item.path}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}
