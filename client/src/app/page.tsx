"use client";
import ControlField from "@/components/form/controller-field/control-field";
import ControllerRadio from "@/components/form/controller-radio/controller-radio";
import { Button, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

enum Gender {
  MALE = "male",
  FEMALE = "female",
}
type Input = {
  name: string;
  age: string;
  gender: Gender;
};

const onSubmit: SubmitHandler<Input> = (data) => {
  console.log(data);
};
export default function app() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    defaultValues: {
      gender: Gender.FEMALE
    }
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ maxWidth: "500px" }}>
        <ControlField
          name="name"
          control={control}
          type="text"
          label="Username"
        />

        <ControlField
          name="age"
          control={control}
          type="number"
          label="age"
        />

        <ControllerRadio
          name="gender"
          control={control}
          options={[
            {
              label: "Male",
              value: Gender.MALE,
            },
            {
              label: "Female",
              value: Gender.FEMALE,
            },
          ]}
        />
        <Button type="submit">Submit</Button>
      </Stack>
    </form>
  );
}
