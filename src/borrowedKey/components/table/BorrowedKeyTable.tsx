import { useBorrowedKeyContext } from "../../context/BorrowedKeyContext"
import { ButtonCreateBorrowedKey } from "../button/ButtonCreateBorrowedKey";
import { StickyTableContainer, TableBody, TableHeaderRow, TablePagination, HeaderTableContent } from "@/common/components/table";
import { BorrowedKey } from "../../interfaces";
import { BorrowedKeyTableRowItem } from "./BorrowedKeyTableRowItem";
import { Roles } from "@/common/interfaces";

const columns = [
  'Nombre llave',
  'Operador',
  'Solicitado por',
  'Servicio o Empresa',
  'Fecha de Préstamo',
  'Acciones'
]

export const BorrowedKeyTable = () => {

    const { 
      borrowedKeys, 
      isLoading, 
      itemCount, 
      limit, 
      page, 
      handleChangeLimit, 
      handleChangePage, 
      searchBorrowedKey, 
    } = useBorrowedKeyContext();
    

  return (
    <>
        {/* Buscador y boton crear llave */}
        <HeaderTableContent
            roles={[Roles.ADMIN, Roles.OPERATOR]}
            label={'Buscar llave prestada'}
            handleSearch={searchBorrowedKey}
        >
            <ButtonCreateBorrowedKey />
        </HeaderTableContent>

        <StickyTableContainer>
            <TableHeaderRow 
                columns={columns}
            />
                
            <TableBody
                isLoading={isLoading}
                text="No se encontraron registros"
                colSpan={columns.length}
                itemCount={itemCount}
            >
                  {
                    borrowedKeys.map((item: BorrowedKey) => (
                      <BorrowedKeyTableRowItem
                        key={item.borrowedKeyId}
                        item={item}
                      />
                    ))
                  }
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
    
    </>
  )
}
