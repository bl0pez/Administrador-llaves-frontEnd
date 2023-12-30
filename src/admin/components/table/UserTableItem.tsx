import { FC, useState } from "react";
import { Box, Chip, IconButton, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { User } from "@/admin/interfaces";
import { UpdateUserModal } from "../modal/UpdateUserModal";
import { DateTransformed } from "@/common/components/ui/DateTransformed";
import { DeleteUserModal } from "../modal/DeleteUserModal";

export const UserTableItem: FC<User> = (user) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>{user.fullName}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>
          <Chip
            label={user.role}
            variant="outlined"
            size="small"
            sx={{
              margin: "0.2rem 0.2rem 0.2rem 0",
            }}
          />
        </TableCell>
        <TableCell>
          <DateTransformed date={user.created_at} />
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <IconButton onClick={() => setIsOpen(!isOpen)} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => setIsOpenDelete(true)} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      <UpdateUserModal
        isOpen={isOpen}
        handleClose={() => setIsOpen(!isOpen)}
        user={user}
      />

      <DeleteUserModal
        isOpen={isOpenDelete}
        handleClose={() => setIsOpenDelete(!isOpenDelete)}
        user={user}
        />
    </>
  );
};
