import React from 'react';
import useVerifyRole from '../../hooks/useVerifyRole';

const Enrollment = () => {
    useVerifyRole('student');
    return (
        <div className='update-profile mx-auto mb-5'>
            <h2>aa</h2>
        </div>
    );
};

export default Enrollment;