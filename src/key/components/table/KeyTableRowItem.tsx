import { FC, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { ImageModal } from "../modal/ImageModal";
import { Key } from "@/key/interfaces";
import { DateTransformed } from "@/common/components/ui/DateTransformed";
import { Roles } from "@/common/interfaces";
import { ProtectiveRoles } from "@/common/components/roles/ProtectiveRoles";

const ImagenButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#FFFFFF"),
  boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#FFFFFF",
  },
}));

interface Props {
  item: Key;
  handleUpdateKey: (item: Key) => void;
  handleDeleteKey: (item: Key) => void;
  roles?: Roles[];
}

export const KeyTableRowItem: FC<Props> = ({
  item,
  roles,
  handleUpdateKey,
  handleDeleteKey,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <ImagenButton onClick={() => handleOpenModal()}>
            <CardMedia
              component="img"
              height="40px"
              image={`${import.meta.env.VITE_BACKEND_PUBLIC_URL}${item.image}`}
              alt={item.keyName}
            />
          </ImagenButton>
        </TableCell>
        <TableCell>{item.keyName}</TableCell>
        <TableCell>{item.keyDescription}</TableCell>
        <TableCell>
          <DateTransformed date={item.createdAt} />
        </TableCell>
        <TableCell>
          {item.isBorrowed ? (
            <Chip label="Prestada" color="warning" variant="outlined" />
          ) : (
            <Chip label="Disponible" color="success" variant="outlined" />
          )}
        </TableCell>
        <TableCell>{item.deliveredBy}</TableCell>
        <TableCell>{item.createBy}</TableCell>
        {roles && (
          <ProtectiveRoles roles={[...roles]}>
            <TableCell>
              <Box
                sx={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <IconButton onClick={() => handleUpdateKey(item)} size="small">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteKey(item)} size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </TableCell>
          </ProtectiveRoles>
        )}
      </TableRow>

      <ImageModal
        url={`${import.meta.env.VITE_BACKEND_PUBLIC_URL}${item.image}`}
        alt={item.keyName}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};
