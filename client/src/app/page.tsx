import { Box, Container, Stack, Typography } from "@mui/material";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/navbar";

export default function App() {
  return (
    <Container className={styles.main}>
      <Navbar />
      <Box>
        <Stack spacing={-2}>
          <Typography variant={"h1"}>Welcome</Typography>
          <Typography sx={{paddingLeft: 1}} variant="h1">Users..</Typography>
        </Stack>
      </Box>
    </Container>
  );
}
