import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const { role } = location.state;

    const handleLogin = event => {
        event.preventDefault();
        const adminEmail = event.target.adminEmail?.value;
        const studentId = event.target.studentId?.value;
        const password = event.target.password.value;
        role === 'admin' &&
            fetch('data.json')
                .then(res => res.json())
                .then(data => {

                })

    }
    return (
        <div>
            <Form className='w-25 mx-auto mt-5' onSubmit={handleLogin}>
                {
                    role === 'admin' ?
                        <Form.Group className="mb-3" controlId="adminEmail">
                            <Form.Label>Admin Email address</Form.Label>
                            <Form.Control name='email' type="email" placeholder="Enter email" required />
                        </Form.Group>
                        :
                        <Form.Group className="mb-3" controlId="studentId">
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control name='studentId' type="number" placeholder="Enter Student ID" required />
                        </Form.Group>
                }

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" required />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="success" type="submit" className='w-50 mx-auto d-block'>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;