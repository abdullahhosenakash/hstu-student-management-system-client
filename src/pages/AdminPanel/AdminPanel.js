import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useVerifyRole from '../../hooks/useVerifyRole';
import CustomLink from '../StudentPanel/CustomLink';

const AdminPanel = () => {
    useVerifyRole('admin');
    return (
        // classes got from StudentPanel.css
        <div className='header-margin'>
            <div className="parent-route sticky-top">
                <h2 className="display-6 text-center parent-heading">Admin Panel</h2>
                <nav className='d-flex nav-menu'>
                    <CustomLink to='/adminPanel/home'><span>HOME</span></CustomLink>
                    <CustomLink to='/adminPanel/pendingUsers'><span>PENDING USERS</span></CustomLink>
                    <CustomLink to='/adminPanel/updateResult'><span>UPDATE RESULT</span></CustomLink>
                    <CustomLink to='/adminPanel/students'><span>UPDATE STUDENT</span></CustomLink>
                    <CustomLink to='/adminPanel/students'><span>STUDENTS</span></CustomLink>
                    <CustomLink to='/adminPanel/adminProfile'><span>PROFILE</span></CustomLink>
                </nav>
            </div>

            <div className="children-route">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminPanel;