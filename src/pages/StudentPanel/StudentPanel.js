import React from 'react';
import { Outlet } from 'react-router-dom';
import useVerifyRole from '../../hooks/useVerifyRole';
import './StudentPanel.css';

const StudentPanel = () => {
    useVerifyRole('student');
    return (
        <div className='header-margin'>
            <div className="pt-1">
                <h2 className="display-6 text-center">Student Panel</h2>
            </div>

            <div className="children-route">
                <Outlet />
            </div>
        </div>
    );
};

export default StudentPanel;