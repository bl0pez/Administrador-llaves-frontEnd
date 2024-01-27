import { useState } from "react";
import { useKeyContext } from "@/key/context/KeyContext";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import { MainModal } from "@/common/components/modal";
import { ErrorAlert } from "@/common/components/alert";
import { deleteKeyService } from "@/key/services/key.service";

interface Props {
  isOpen: boolean;
  handleClose: () => void;
}

export const RemoveKeyModal = ({ isOpen, handleClose }: Props) => {
  const { selectedKey, onLoadKeys } = useKeyContext();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleDeleteKey = async () => {
    setIsLoading(true);
    try {
      await deleteKeyService(selectedKey.keyId);
      handleClose();
      onLoadKeys();
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainModal handleClose={handleClose} isOpen={isOpen}>
      <Box p={8}>
        <ErrorAlert
          isError={false}
          setIsError={() => setErrorMessage("")}
          message={errorMessage}
        />
        <Typography variant="h6" component="h2" gutterBottom>
          {`
                    ¿Está seguro que desea eliminar la llave ${selectedKey?.keyName}?`}
        </Typography>
        <Box display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            sx={{
              padding: "0.5rem 1rem",
            }}
            color="success"
            disabled={isLoading}
            onClick={handleDeleteKey}
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
