import { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { MainModal } from "@/common/components/modal";
import { userServiceApi } from "@/admin/service/userService";
import { User } from "@/admin/interfaces";
import { ErrorAlert } from "@/common/components/alert";
import { useUserContext } from "@/admin/hooks";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  user: User;
}

export const DeleteUserModal = ({ isOpen, user, handleClose }: Props) => {

    const { deleteUser } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      const resp = await userServiceApi.delete(user.id);
      deleteUser(user.id);
      handleClose();
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainModal isOpen={isOpen} handleClose={handleClose}>
      <Box p={8}>
        <ErrorAlert
          isError={Boolean(errorMessage)}
          setIsError={() => setErrorMessage("")}
          message={errorMessage}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          {`
                    ¿Está seguro que desea eliminar al usuario ${user.fullName}?`}
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            sx={{
              padding: "0.5rem 1rem",
            }}
            color="success"
            disabled={isLoading}
            onClick={handleDeleteUser}
          >
            {isLoading ? (
              <CircularProgress size={20} />
            ) : (
              <TaskAltIcon sx={{ color: "white" }} />
            )}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            sx={{
              padding: "0.5rem 1rem",
            }}
          >
            <HighlightOffIcon />
          </Button>
        </Box>
      </Box>
    </MainModal>
  );
};
