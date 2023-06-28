import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menu } from './routes';
import { useAuth } from '@/auth/context';

export const Sidebars = () => {

    const { handleLogout, authstate } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuClose = () => {
        setIsSidebarOpen(false);
    }

    const { pathname } = useLocation();

    useEffect(() => {

        const handleOutsideClick = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsSidebarOpen(false);
            }
        }

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }

    }, [handleMenuClose])


    const handleSidebarOpen = () => {
        return setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <aside
            ref={menuRef}
            className={`min-h-screen w-72 text-xl text-white bg-indigo-950 flex flex-col fixed shadow z-10 transform transition-all duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >

            <button
                onClick={handleSidebarOpen}
                className={`h-12 w-12 bg-indigo-600 text-white fixed top-5 left-[300px] rounded-md hover:bg-indigo-600 transition-all duration-500 ease-in-out`}
            >
                <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            <div
                className='flex justify-center items-center py-4 gap-2 bg-indigo-600 mb-2'>
                    <i className='fas fa-user-circle text-4xl'></i>
                {
                    authstate.name
                }
            </div>


            <nav
                className='flex-1 flex flex-col h-full gap-2'
            >

                {
                    menu.map((item) => (
                        <div className='px-2' key={item.title}>
                            <Link
                            to={item.url}
                            key={item.title}
                            className={`flex items-center justify-between px-4 py-2 shadow-lg bg-indigo-800 hover:bg-indigo-500 transition-all duration-500  ${(pathname == item.url) ? 'bg-indigo-500' : ''}`}
                        >
                            <div
                                className='flex items-center gap-2'
                            >
                                <i className={`fas ${item.icon} bg-indigo-950 p-2 rounded-md`}></i>
                                <span>{item.title}</span>
                            </div>

                            <i className='fas fa-chevron-right'></i>

                        </Link>
                        </div>
                    ))
                }


            </nav>

            <div className='p-2'>
                <button
                    onClick={handleLogout}
                    // className='flex-initial flex items-center justify-between px-3 py-4 uppercase bg-red-700  font-bold hover:bg-red-800 transition-all duration-500 ease-in-out'
                    className='bg-red-700 py-2 px-4 w-full flex justify-center items-center gap-3 shadow hiver:bg-red-800 transition-all duration-500 ease-in-out hover:rounded-md'
                >
                    <i className='fas fa-sign-out-alt'></i>
                    <span>Loagout</span>
                </button>
            </div>

        </aside>
    )
}
