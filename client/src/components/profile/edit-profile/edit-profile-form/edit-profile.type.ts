import z from "zod";

export const profileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  mobileNumber: z
    .string()
    .regex(/^\+?[1-9]\d{9,9}$/, "Invalid phone number")
    .optional(),
  age: z.coerce.number().min(5, "age should be minimum of 5").optional(),
});

export type ProfileInput = z.input<typeof profileSchema>;
export type ProfileOutput = z.output<typeof profileSchema>;
