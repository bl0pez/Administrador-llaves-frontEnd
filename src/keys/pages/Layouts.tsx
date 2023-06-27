import { Outlet } from 'react-router-dom';
import { Sidebars } from '../components/sidebars/Sidebars';
import Modal from 'react-modal';

Modal.setAppElement('#root');
export const Layouts = () => {
    return (
        <div className='min-h-screen'>
            <Sidebars />
            <Outlet />
        </div>
    )
}
