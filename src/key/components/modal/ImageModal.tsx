import { FC } from "react";
import { Card, CardMedia } from "@mui/material";
import { MainModal } from "@/common/components/modal";
import { useKeyContext } from "@/key/context/KeyContext";

interface Props {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
}

export const ImageModal: FC<Props> = ({ isOpen, handleClose }) => {
  const { selectedKey } = useKeyContext();
  return (
    <MainModal handleClose={handleClose} isOpen={isOpen}>
      <Card
        sx={{
          maxWidth: 345,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
            width: "100%",
            backgroundColor: "#424242",
          }}
          image={`${import.meta.env.VITE_BACKEND_PUBLIC_URL}${
            selectedKey?.image
          }`}
          alt={selectedKey?.keyName}
        />
      </Card>
    </MainModal>
  );
};
