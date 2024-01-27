import { FC } from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

import { useThemeContext } from "@/theme/ThemeContextProvider";
import { Roles } from "@/common/interfaces";
import { ProtectiveRoles } from "../roles/ProtectiveRoles";

interface Props {
  columns: string[];
  roles?: Roles[];
}

export const TableHeaderRow: FC<Props> = ({ columns, roles }) => {
  const { mode } = useThemeContext();

  return (
    <TableHead>
      <TableRow>
        {columns.map((Column, index) => (
          <TableCell
            key={index}
            sx={{
              whiteSpace: "nowrap",
              backgroundColor: mode === "dark" ? "#1E1E1E" : "#FFFFFF",
              minWidth: "150px",
            }}
          >
            {Column}
          </TableCell>
        ))}
        {roles && (
          <ProtectiveRoles roles={[...roles]}>
            <TableCell
              sx={{
                whiteSpace: "nowrap",
                backgroundColor: mode === "dark" ? "#1E1E1E" : "#FFFFFF",
                minWidth: "150px",
              }}
            >
              Acciones
            </TableCell>
          </ProtectiveRoles>
        )}
      </TableRow>
    </TableHead>
  );
};
