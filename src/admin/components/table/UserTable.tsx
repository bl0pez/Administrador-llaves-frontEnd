import { HeaderTableContent, StickyTableContainer, TableBody, TableHeaderRow, TablePagination } from "@/common/components/table"
import { CreateUser } from "../button/CreateUser"

const columns = [
    'Nombre',
    'Email',
    'Roles',
    'Acciones'
]

export const UserTable = () => {
  return (
    <>
        <HeaderTableContent 
            label="Buscar usuario"
            handleSearch={() => {}}
        >
            <CreateUser />
        </HeaderTableContent>

        <StickyTableContainer>
            <TableHeaderRow 
                columns={columns}
            />

            <TableBody
                isLoading={false}
                text="No se encontraron registros"
                colSpan={4}
                itemCount={2}
            >
                  {
                    
                  }
            </TableBody>  

        </StickyTableContainer>

        <TablePagination
            itemCount={2}
            handleChangeLimit={() => {}}
            limit={2}
            page={0}
            handleChangePage={() => {}}
        />
    
    </>
  )
}
