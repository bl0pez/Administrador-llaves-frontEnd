import { HeaderTableContent, StickyTableContainer, TableBody, TableHeaderRow, TablePagination } from "@/common/components/table"
import { CreateUser } from "../button/CreateUser"
import { useEffect } from "react"
import { UserTableItem } from "./UserTableItem"
import { useUserContext } from "@/admin/hooks"

const columns = [
    'Nombre',
    'Email',
    'Roles',
    'Fecha de creación',
    'Acciones'
]

export const UserTable = () => {

    const { users, count, saveUsers, limit, offset, isLoading, handleChangePage, handleChangeLimit } = useUserContext();

    useEffect(() => {
        saveUsers();
    }, [offset, limit])
    
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
                isLoading={isLoading}
                text="No se encontraron registros"
                colSpan={columns.length}
                itemCount={count}
            >
                  {
                    users.map(user => (
                        <UserTableItem 
                            key={user.id}
                            {...user}
                        />
                    ))
                  }
            </TableBody>  

        </StickyTableContainer>

        <TablePagination
            itemCount={count}
            handleChangeLimit={handleChangeLimit}
            limit={limit}
            page={offset / limit}
            handleChangePage={handleChangePage}
        />
    
    </>
  )
}
