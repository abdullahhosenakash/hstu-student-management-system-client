import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/hstu_logo_.png';
import './Home.css';

const Home = () => {
    const role = localStorage.getItem('role');
    return (
        <div className='text-center header-margin mb-5'>
            <img className='homepage-logo' src={logo} alt="" />
            <h2>Welcome to HSTU Student Panel</h2>
            {role ?
                <>
                    {role === '73747564656E74' &&
                        <Link to='/studentPanel' className='text-decoration-none btn btn-secondary login-button mx-auto d-block mb-3 mt-4' state={{ role: 'student' }}>Go to Student Panel</Link>
                    }

                    {role === '61646D696E' &&
                        <Link to='/adminPanel' className='text-decoration-none btn btn-secondary login-button mx-auto d-block mb-3 mt-4' state={{ role: 'admin' }}>Go to Admin Panel</Link>
                    }
                </>
                :
                <>
                    <Link to='/login' className='text-decoration-none btn btn-secondary login-button mx-auto d-block mb-3 mt-4' state={{ role: 'student' }}>Student Login</Link>

                    <Link to='/signup' className='text-decoration-none btn btn-secondary login-button mx-auto d-block mb-3 mt-4' state={{ role: 'student' }}>Student Sign Up</Link>

                    <Link to='/login' className='text-decoration-none btn btn-secondary login-button d-block mx-auto' state={{ role: 'admin' }}>Admin Login</Link>
                </>
            }

        </div>
    );
};

export default Home;