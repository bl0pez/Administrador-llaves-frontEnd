import { ButtonCreateKey } from "../button/ButtonCreateKey"
import { useKeyContext } from "../../context/KeyContext"
import { KeyTableRowItem } from "./KeyTableRowItem";
import { Key } from "../../interfaces";
import { 
  HeaderTableContent, 
  StickyTableContainer, 
  TableBody, 
  TableHeaderRow, 
  TablePagination
} from "@/common/components/table";

const columns = [
    'Imagen',
    'Nombre',
    'Descripción',
    'Fecha de creación',
    'Estado',
    'Entregada por',
    'Recibida por',
]

export const KeyTable = () => {

    const { 
      isLoading,
      itemCount, 
      keys, 
      limit, 
      page, 
      handleChangeLimit, 
      handleChangePage, 
      handleSearch, 
     } = useKeyContext();
    

  return (
    <>
        {/* Buscador y boton crear llave */}
        <HeaderTableContent
            label={'Buscar llave'}
            handleSearch={handleSearch}
        >
            <ButtonCreateKey />
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
                    keys.map((item: Key) => (
                      <KeyTableRowItem
                        key={item.keyId}
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
