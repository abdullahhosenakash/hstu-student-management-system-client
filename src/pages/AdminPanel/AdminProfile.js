import React from 'react';
import { FloatingLabel, Form } from 'react-bootstrap';

const AdminProfile = () => {
    return (
        <div className='update-profile mx-auto mb-5'>
            <FloatingLabel
                label="Name"
                className="mb-3"
            >
                <Form.Control value={''} disabled />
            </FloatingLabel>

            <FloatingLabel
                label="Email address"
                className="mb-3"
            >
                <Form.Control value={'userEmail'} disabled />
            </FloatingLabel>

            <FloatingLabel
                label="Phone"
                className="mb-3 w-50 ps-1 d-inline-block"
            >
                <Form.Control value={'phone'} disabled />
            </FloatingLabel>

        </div>
    );
};

export default AdminProfile;