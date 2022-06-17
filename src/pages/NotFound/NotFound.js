import React from 'react';
import error from '../../images/404.jpg';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='text-danger header-margin text-center'>
            <h1 className='oops'>OOPS!</h1>
            <img className='error-image' src={error} alt="" />
            <h2 className='page-not-found'>The page you are finding is not found..</h2>
        </div>
    );
};

export default NotFound;