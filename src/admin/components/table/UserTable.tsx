import { HeaderTableContent, StickyTableContainer, TableBody, TableHeaderRow, TablePagination } from "@/common/components/table"
import { CreateUser } from "../button/CreateUser"
import { useEffect, useState } from "react"
import { User, stateUser } from "@/admin/interfaces"
import { getUsers } from "@/admin/service/userService"
import { Pagination } from "@/common/interfaces"
import { UserTableItem } from "./UserTableItem"

const columns = [
    'Nombre',
    'Email',
    'Roles',
    'Acciones'
]

export const UserTable = () => {

    const [data, setData] = useState<stateUser>({
        users: [],
        count: 0,
        isLoading: true,
    });

    const [ pagination, setPaginacion ] = useState<Pagination>({
        limit: 5,
        offset: 0
    });

    
    
    useEffect(() => {
      
        const users = async () => {
            const users = await getUsers({ limit: pagination.limit, offset: pagination.offset })
            setData({
                count: users.count,
                isLoading: false,
                users: users.users,
            })
        }

        users();

    }, [])
    

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
                isLoading={data.isLoading}
                text="No se encontraron registros"
                colSpan={columns.length}
                itemCount={data.count}
            >
                  {
                    data.users.map(user => (
                        <UserTableItem 
                            key={user.id}
                            {...user}
                        />
                    ))
                  }
            </TableBody>  

        </StickyTableContainer>

        <TablePagination
            itemCount={data.count}
            handleChangeLimit={() => {}}
            limit={pagination.limit}
            page={0}
            handleChangePage={() => {}}
        />
    
    </>
  )
}
