import { FC } from "react";
import { TextField } from "@mui/material";

type InputFormProps = {
  helperText: string | false | undefined;
  isError: boolean;
  label: string;
  type: "text" | "password" | "email" | "number";
  [x: string]: any;
};

export const InputForm: FC<InputFormProps> = ({
  isError,
  helperText,
  label,
  type,
  ...props
}) => {
  return (
    <TextField
      type={type}
      color="primary"
      variant="outlined"
      label={label}
      error={isError}
      helperText={helperText}
      {...props}
      required
    />
  );
};
