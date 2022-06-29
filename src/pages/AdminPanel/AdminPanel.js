import React from 'react';
import { Outlet } from 'react-router-dom';
import useVerifyRole from '../../hooks/useVerifyRole';

const AdminPanel = () => {
    console.log('aa')
    useVerifyRole('admin');
    return (
        // classes got from StudentPanel.css
        <div className='header-margin'>
            <div className="">
                <h2 className="display-6 text-center pt-1">Admin Panel</h2>
            </div>

            <div className="children-route">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;