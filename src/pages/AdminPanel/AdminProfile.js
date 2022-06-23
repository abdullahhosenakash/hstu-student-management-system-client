import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';
import useToken from '../../hooks/useToken';

const AdminProfile = () => {
    const { loggedInUser } = useToken();
    const { userEmail, userName, phone } = loggedInUser;
    return (
        <div className='update-profile mx-auto mb-5'>
            <FloatingLabel
                label="Name"
                className="mb-3"
            >
                <Form.Control value={userName} disabled />
            </FloatingLabel>

            <FloatingLabel
                label="Email address"
                className="mb-3"
            >
                <Form.Control value={userEmail} disabled />
            </FloatingLabel>

            <FloatingLabel
                label="Phone"
                className="mb-3"
            >
                <Form.Control value={phone} disabled />
            </FloatingLabel>

        </div>
    );
};

export default AdminProfile;