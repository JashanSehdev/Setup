"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import EditProfileForm from "./edit-profile-form/edit-profile-form";
import { useState } from "react";
import AlertBox from "@/components/admin/alert/alertBox";
import EditIcon from "@mui/icons-material/Edit";

export default function EditProfileCard() {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button variant="outlined" color="secondary" onClick={handleOpen}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <EditIcon fontSize="small" />
          <Typography>Edit</Typography>
        </Stack>
      </Button>

      <AlertBox open={open} handleClose={handleClose}>
        <Card>
          <CardHeader title="Edit Profile" />
          <CardContent>
            <EditProfileForm close={handleClose} />
          </CardContent>
        </Card>
      </AlertBox>
    </>
  );
}
