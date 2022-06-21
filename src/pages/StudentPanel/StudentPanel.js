import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import CustomLink from './CustomLink';
import './StudentPanel.css';

const StudentPanel = () => {
    return (
        <div className='header-margin'>
            <div className="parent-route sticky-top">
                <h2 className="display-6 text-center parent-heading">Student Panel</h2>
                <nav className='d-flex nav-menu'>
                    <CustomLink to='/studentPanel/home'><span>HOME</span></CustomLink>
                    <CustomLink to='/studentPanel'><span>REVIEWS</span></CustomLink>
                    <CustomLink to='/studentPanel/updateUser'><span>DASHBOARD</span></CustomLink>
                    <CustomLink to='/studentPanel'><span>BLOGS</span></CustomLink>
                    <CustomLink to='/studentPanel/updateUser'><span>UPDATE PROFILE</span></CustomLink>
                </nav>
            </div>

            <div className="children-route">
                <Outlet />
            </div>
        </div>
    );
};

export default StudentPanel;