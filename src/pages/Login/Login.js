import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Login.css';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';


const Login = () => {
    const location = useLocation();
    const { role } = location.state || "student";
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    if (loading) {
        return <Loading />
    }

    const handleLogin = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const studentId = event.target.studentId?.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
    }
    console.log(error)
    return (
        <div className='login-page mx-auto header-margin'>
            <h2 className='display-6'>{role === 'admin' ? "Admin" : "Student"} Login</h2>
            <Form onSubmit={handleLogin}>

                <Form.Group className="mb-3" controlId="emailAddress">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter Email" required />
                </Form.Group>

                {
                    role === "student" &&
                    <Form.Group className="mb-3" controlId="studentId">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control type="number" onWheel={e => e.target.blur()} name='studentId' placeholder="Enter Student ID" required />
                    </Form.Group>
                }

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter Password" required />
                </Form.Group>

                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="secondary" type="submit" className='w-50 mx-auto d-block'>
                    Login
                </Button>
            </Form>
            {role === 'student' && <p className='mt-2'>Don't have an account? <Link to='/signup' className="text-decoration-none ms-1">Sign Up</Link>
            </p>}
        </div>
    );
};

export default Login;