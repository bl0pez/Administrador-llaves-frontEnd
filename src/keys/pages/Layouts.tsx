import { Outlet } from 'react-router-dom';
import { Sidebars } from '../components/sidebars/Sidebars';

export const Layouts = () => {

    return (
        <div className='min-h-screen'>

            <Sidebars />
            <Outlet />

        </div>
    )
}
