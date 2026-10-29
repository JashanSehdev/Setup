"use client";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type Control,
} from "react-hook-form";
import { CldUploadWidget } from "next-cloudinary";
import { Box, FormHelperText } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

type CloudinaryUploadControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  children : ReactNode
};

export default function CloudinaryUploadController<T extends FieldValues>({
  name,
  control,
  children
}: CloudinaryUploadControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
            onSuccess={(result) => {
              if (
                result.info &&
                typeof result.info !== "string" &&
                "secure_url" in result.info
              ) {
                field.onChange(result.info.secure_url);
              }
            }}
          >
            {({ open }) => (
              <Box component={'div'} onClick={() => open()}>
                {children}
              </Box>
            )}
          </CldUploadWidget>
          {typeof field.value === "string" && field.value && (
            <Image
              src={field.value}
              alt="Uploaded preview"
              width={120}
              style={{ display: "block", marginTop: 12 }}
            />
          )}

          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </div>
      )}
    />
  );
}
