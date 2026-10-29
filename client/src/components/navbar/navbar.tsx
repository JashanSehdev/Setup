import { Box, ListItem, Menu, Stack, Typography } from "@mui/material";
import styles from "./navbar.module.css";

import React from "react";
import NavbarItems from "./navbar-items/navbar-items";
import ProfileBar from "./profile-bar/profile-bar";

const Navbar = () => {
  return (
    <Stack className={styles.container} color="theme.paper">
      <Stack>
        <Box className={styles.logo_bar}>
          <Typography variant="h3">Tasks</Typography>
        </Box>

        <NavbarItems />
      </Stack>

      <ProfileBar />
    </Stack>
  );
};

export default Navbar;
