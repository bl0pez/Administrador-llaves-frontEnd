import { FC } from "react";
import {
  Button,
  CircularProgress,
  SvgIcon,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type ButtonFormProps = {
  type: "submit" | "button" | "reset";
  title: string;
  isLoading: boolean;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  [x: string]: any;
};

export const ButtonForm: FC<ButtonFormProps> = ({
  icon,
  isLoading,
  title,
  type,
  ...props
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      type={type}
      sx={{
        gap: 1,
        height: "40px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <SvgIcon component={icon} />
      )}
      {title}
    </Button>
  );
};
