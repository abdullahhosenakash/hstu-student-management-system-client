import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const { role } = location.state;
    console.log(role);
    return (
        <div>
            <Form className='w-25 mx-auto mt-5'>
                {
                    role === 'admin' ?
                        <Form.Group className="mb-3" controlId="adminEmail">
                            <Form.Label>Admin Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        :
                        <Form.Group className="mb-3" controlId="studentId">
                            <Form.Label>Student ID</Form.Label>
                            <Form.Control type="number" placeholder="Enter Student ID" />
                        </Form.Group>
                }

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
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