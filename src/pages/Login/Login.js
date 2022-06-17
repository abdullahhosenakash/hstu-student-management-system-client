import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Login.css';

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
        <div className='login-page mx-auto header-margin'>
            <h2 className='display-6'>Please Login</h2>
            <Form onSubmit={handleLogin}>
                {
                    role === 'admin' ?
                        <FloatingLabel
                            controlId="adminEmail"
                            label="Admin Email address"
                            className="mb-3"
                        >
                            <Form.Control name='email' type="email" placeholder="Enter email" required />
                        </FloatingLabel>
                        :
                        <FloatingLabel
                            controlId="studentId"
                            label="Student ID"
                            className="mb-3"
                        >
                            <Form.Control name='studentId' type="number" placeholder="Enter Student ID" onWheel={e => e.target.blur()} required />
                        </FloatingLabel>
                }

                <FloatingLabel
                    controlId="password"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control name='password' type="password" placeholder="Enter password" required />
                </FloatingLabel>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="success" type="submit" className='w-50 mx-auto d-block'>
                    Login
                </Button>
            </Form>
            <small>Don't have an account? <Link to='/signup'>Sign Up</Link></small>
        </div>
    );
};

export default Login;