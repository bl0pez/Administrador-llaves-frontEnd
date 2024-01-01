import { useEffect } from "react"
import { HeaderTableContent, StickyTableContainer, TableBody, TableHeaderRow, TablePagination } from "@/common/components/table"
import { CreateUser } from "../button/CreateUser"
import { UserTableItem } from "./UserTableItem"
import { useUserContext } from "@/admin/hooks"

const columns = [
    'Nombre',
    'Email',
    'Role',
    'Fecha de creación',
    'Acciones'
]

export const UserTable = () => {

    const { users, count, getUsers, limit, offset, isLoading, handleChangePage, handleChangeLimit } = useUserContext();

    useEffect(() => {
        getUsers();
    }, [offset, limit])
    
  return (
    <>
        <HeaderTableContent 
            label="Buscar usuario"
            handleSearch={getUsers}
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
