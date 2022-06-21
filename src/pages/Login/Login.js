import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import auth from '../../firebase.init';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../hooks/useToken';


const Login = () => {
    const [token] = useToken();
    const location = useLocation();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { role } = location.state || "student";
    const [
        signInWithEmailAndPassword,
        user2,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    useEffect(() => {
        if (error) {
            setErrorMessage(error.message);
        }
        token && navigate(`${role === 'student' ? '/studentPanel' : '/adminPanel'}`);
    }, [error, token, navigate, role])

    if (loading) {
        // return <Loading />
    }

    const handleLogin = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
        if (error) {
            console.log(error.message)
        }
    }

    return (
        <div className='login-page mx-auto header-margin'>
            <h2 className='display-6'>{role === 'admin' ? "Admin" : "Student"} Login</h2>
            <Form onSubmit={handleLogin}>

                <Form.Group className="mb-3" controlId="emailAddress">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter Email" required onFocus={() => setErrorMessage('')} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter Password" required onFocus={() => setErrorMessage('')} />
                </Form.Group>

                {errorMessage && <p className='mt-2 text-danger'>{errorMessage}</p>}

                <Button variant="secondary" type="submit" className='w-50 mx-auto d-block'>
                    Login
                </Button>
            </Form>
            {role === 'student' && <p className='mt-2'>Don't have an account? <Link to='/signup' state={{ role }} className="text-decoration-none ms-1">Sign Up</Link>
            </p>}
        </div>
    );
};

export default Login;