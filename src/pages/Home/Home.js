import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/hstu_logo_.png';
import './Home.css';

const Home = () => {
    return (
        <div className='text-center header-margin'>
            <img className='homepage-logo' src={logo} alt="" />
            <h2>Welcome to HSTU Student Panel</h2>
            <Link to='/login' className='text-decoration-none' state={{ role: 'student' }}>
                <button className="btn btn-secondary login-button mx-auto d-block mb-3 mt-4">Student Login</button>
            </Link>
            <Link to='/login' className='text-decoration-none' state={{ role: 'admin' }}>
                <button className="btn btn-secondary login-button d-block mx-auto">Admin Login</button>
            </Link>
        </div>
    );
};

export default Home;