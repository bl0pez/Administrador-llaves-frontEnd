import { FC, createContext, useState } from 'react';
import { User } from '../interfaces';
import { ChildrenProps, Pagination } from '@/common/interfaces';
import { userServiceApi } from '../service/userService';

type UserContextType = {
    users: User[];
    isLoading: boolean;
    count: number;
    limit: number;
    offset: number;
    getUsers: () => void;
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

    const getUsers = async (search?: string) => {

        setData({
            ...data,
            isLoading: true,
        })

        try {
            if ( search ) {
                const { users, count } = await userServiceApi.search({ limit: data.limit, offset: data.offset, search });            
                setData({
                    ...data,
                    users: users,
                    count: count,
                    limit: data.limit,
                    offset: data.offset,
                })
                return;
            }

            const { users, count } = await userServiceApi.getAll({ limit: data.limit, offset: data.offset });            
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
                deleteUser,
                handleChangeLimit,
                handleChangePage,
                getUsers,         
                updateUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )

}

export default UserProvider;