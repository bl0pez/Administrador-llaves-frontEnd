import { FC, createContext, useState } from 'react';
import { GetUsers, User } from '../interfaces';
import { ChildrenProps, Pagination } from '@/common/interfaces';
import { userServiceApi } from '../service/userService';

type UserContextType = {
    users: User[];
    isLoading: boolean;
    count: number;
    limit: number;
    offset: number;
    saveUsers: () => void;
    handleChangePage: (newPage: number) => void;
    handleChangeLimit: (newLimit: number) => void;
    updateUser: (user: User) => void;
    deleteUser: (id: string) => void;
}

type UserState = {
    users: User[];
    isLoading: boolean;
    count: number;
    limit: number;
    offset: number;
}

export const UserContext = createContext({} as UserContextType);

const UserProvider:FC<ChildrenProps> = ({ children }) => {

    const [data, setData] = useState<UserState>({
        users: [],
        isLoading: true,
        count: 0,
        limit: 5,
        offset: 0,
    });

    const saveUsers = async () => {

        setData({
            ...data,
            isLoading: true,
        })

        try {
            const { users, count } = await userServiceApi.gets({ limit: data.limit, offset: data.offset });            
            setData({
                ...data,
                users: users,
                count: count,
                limit: data.limit,
                offset: data.offset,
            })
        } catch (error: any) {
            throw new Error(error.message);
        }finally {
            setData((prevState) => ({
                ...prevState,
                isLoading: false,
            }))
        }
    }

    const updateUser = (user: User) => {
        setData((prevState) => ({
            ...prevState,
            users: prevState.users.map((item) => item.id === user.id ? user : item),
        }))
    }

    const handleChangePage = (newPage: number) => {
        setData({
            ...data,
            offset: newPage * data.limit,
        })
    }

    const handleChangeLimit = (newLimit: number) => {
        setData({
            ...data,
            limit: newLimit,
        })
    }

    const deleteUser = async (id: string) => {
        const user = data.users.filter((item) => item.id !== id);
        setData({
            ...data,
            users: user,
        })
    }
    
    return (
        <UserContext.Provider
            value={{
                ...data,
                saveUsers,
                handleChangePage,
                handleChangeLimit,
                updateUser,
                deleteUser,            
            }}
        >
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider;