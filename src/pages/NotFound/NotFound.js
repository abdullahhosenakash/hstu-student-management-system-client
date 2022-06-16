import React from 'react';
import error from '../../images/404.jpg';

const NotFound = () => {
    return (
        <div className='text-danger text-center mt-5'>
            <h1>OOPS!</h1>
            <img className='w-50' src={error} alt="" />
            <h2>The page you are finding is not found..</h2>
        </div>
    );
};

export default NotFound;