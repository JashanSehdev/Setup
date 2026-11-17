"use client";
import ControlField from "@/components/form/controller-field/control-field";
import { Button, Grid, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  ProfileInput,
  ProfileOutput,
  profileSchema,
} from "./edit-profile.type";
import { zodResolver } from "@hookform/resolvers/zod";

interface EditProfileProp {
  defaultValues?: ProfileOutput;
  close: () => void;
}
export default function EditProfileForm({
  defaultValues,
  close,
}: EditProfileProp) {
  const { control, handleSubmit } = useForm<
    ProfileInput,
    unknown,
    ProfileOutput
  >({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<ProfileOutput> = (data) => {
    console.log(data)
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid size={6}>
          <Stack spacing={2}>
            <ControlField
              name="firstName"
              label="First Name"
              placeholder="Joe"
              control={control}
            />

            <ControlField
              name="mobileNumber"
              label="Mobile Number"
              placeholder="9878xxxxxx"
              control={control}
            />
          </Stack>
        </Grid>

        <Grid size={6}>
          <Stack spacing={2}>
            <ControlField
              name="lastName"
              label="Last Name"
              placeholder="Joe"
              control={control}
            />

            <ControlField
              name="age"
              label="Age"
              placeholder="Enter Your Age"
              control={control}
            />
          </Stack>
        </Grid>
        <Button type="submit" variant="contained">
          Submit
        </Button>
        <Button onClick={close} variant="outlined">Cancel</Button>
      </Grid>
    </form>
  );
}
