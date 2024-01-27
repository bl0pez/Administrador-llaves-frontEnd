import { ButtonCreateKey } from "../button/ButtonCreateKey";
import { useKeyContext } from "../../context/KeyContext";
import { KeyTableRowItem } from "./KeyTableRowItem";

import { Key } from "@/key/interfaces";
import { Roles } from "@/common/interfaces";

import {
  HeaderTableContent,
  StickyTableContainer,
  TableBody,
  TableHeaderRow,
  TablePagination,
} from "@/common/components/table";
import { useState } from "react";
import { UpdateKeyModal } from "../modal/UpdateKeyModal";
import { RemoveKeyModal } from "../modal/RemoveKeyModal";

const columns = [
  "Imagen",
  "Nombre",
  "Descripción",
  "Fecha de creación",
  "Estado",
  "Entregada por",
  "Recibida por",
];

export const KeyTable = () => {
  const {
    isLoading,
    itemCount,
    keys,
    limit,
    page,
    handleChangeLimit,
    handleChangePage,
    handleChangeSearch,
    onSelectKey,
  } = useKeyContext();

  const [editOpenModal, setEditOpenModal] = useState(false);
  const [deleteOpenModal, setDeleteOpenModal] = useState(false);

  const handleUpdateKey = (item: Key) => {
    onSelectKey(item);
    setEditOpenModal(true);
  };

  const handleDeleteKey = (item: Key) => {
    onSelectKey(item);
    setDeleteOpenModal(true);
  };

  return (
    <>
      {/* Buscador y boton crear llave */}
      <HeaderTableContent
        label={"Buscar llave"}
        handleSearch={handleChangeSearch}
        roles={[Roles.ADMIN, Roles.OPERATOR]}
      >
        <ButtonCreateKey />
      </HeaderTableContent>

      <StickyTableContainer>
        <TableHeaderRow
          columns={columns}
          roles={[Roles.ADMIN, Roles.OPERATOR]}
        />

        <TableBody
          isLoading={isLoading}
          text="No se encontraron registros"
          colSpan={columns.length}
          itemCount={itemCount}
        >
          {keys.map((item: Key) => (
            <KeyTableRowItem
              key={item.keyId}
              item={item}
              handleUpdateKey={handleUpdateKey}
              handleDeleteKey={handleDeleteKey}
              roles={[Roles.ADMIN, Roles.OPERATOR]}
            />
          ))}
        </TableBody>
      </StickyTableContainer>

      {/* Paginación */}
      <TablePagination
        itemCount={itemCount}
        handleChangeLimit={handleChangeLimit}
        limit={limit}
        page={page}
        handleChangePage={handleChangePage}
      />

      {/* Edit Key Modal */}
      <UpdateKeyModal
        isOpen={editOpenModal}
        handleClose={() => setEditOpenModal(false)}
      />

      {/* Delete Key Modal */}
      <RemoveKeyModal
        isOpen={deleteOpenModal}
        handleClose={() => setDeleteOpenModal(false)}
      />
    </>
  );
};
