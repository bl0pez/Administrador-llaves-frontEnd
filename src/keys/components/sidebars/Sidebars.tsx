import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menu } from './routes';

export const Sidebars = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const { pathname } = useLocation();


    const handleSidebarOpen = () => {
        return setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <aside
            className={`h-screen w-72 text-white bg-indigo-700 flex flex-col absolute text-2xl shadow-lg z-10 transform transition-all duration-500 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >

            <button
                onClick={handleSidebarOpen}
                className={`h-12 w-12 bg-indigo-700 text-white relative top-5 left-[300px] rounded-md`}
            >
                <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>

            <div
                className='flex-initial flex flex-col border-b-2 border-indigo-600'>
                texto
            </div>


            <nav
                className='flex-1 flex flex-col h-full'
            >

                {
                    menu.map((item) => (
                        <Link
                            to={item.url}
                            key={item.title}
                            className={`flex px-4 py-2 items-center gap-2 uppercase justify-between border-y border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-500 ease-in-out ${pathname === item.url ? 'bg-indigo-600 text-white' : ''}`}
                        >
                            <div
                                className='flex items-center gap-2'
                            >
                                <i className={`fas ${item.icon} bg-indigo-950 p-2 rounded-md`}></i>
                                <span>{item.title}</span>
                            </div>

                            <i className='fas fa-chevron-right'></i>

                        </Link>
                    ))
                }


            </nav>

            <button
                className='flex-initial flex items-center justify-between px-3 py-4 uppercase bg-red-700  font-bold hover:bg-red-800 transition-all duration-500 ease-in-out'
            >
                <span>Salir</span>
                <i className='fas fa-sign-out-alt'></i>
            </button>

        </aside>
    )
}
