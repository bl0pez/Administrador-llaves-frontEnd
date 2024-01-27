import { FC } from "react";
import {
  CircularProgress,
  TableBody as Body,
  TableCell,
  TableRow,
} from "@mui/material";

type Props = {
  children: JSX.Element | JSX.Element[];
  colSpan: number;
  isLoading: boolean;
  itemCount: number;
  text: string;
};

export const TableBody: FC<Props> = ({
  children,
  colSpan,
  isLoading,
  itemCount,
  text,
}) => {
  if (isLoading) {
    return (
      <Body>
        <tr>
          <TableCell colSpan={colSpan} style={{ textAlign: "center" }}>
            <CircularProgress />
          </TableCell>
        </tr>
      </Body>
    );
  }

  return (
    <Body>
      {itemCount === 0 ? (
        <TableRow>
          <TableCell colSpan={7} style={{ textAlign: "center" }}>
            {text}
          </TableCell>
        </TableRow>
      ) : (
        children
      )}
    </Body>
  );
};
