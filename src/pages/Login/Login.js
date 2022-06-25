import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';
import auth from '../../firebase.init';
import { useAuthState, useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';
import { useState } from 'react';
import { useEffect } from 'react';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';


const Login = () => {
    const { token } = useToken();
    const location = useLocation();
    const { role } = location.state;
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');

    const [
        signInWithEmailAndPassword,
        user2,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail] = useSendPasswordResetEmail(auth);

    useEffect(() => {
        if (error) {
            if (error.message === 'Firebase: Error (auth/wrong-password).') {
                setErrorMessage('Your password is incorrect');
            }
            else {
                setErrorMessage(error.message);
            }
        }
        const from = location?.state?.from?.pathname || `${role === 'admin' ? '/adminPanel' : '/studentPanel'}`;
        token && navigate(from, { replace: true });
    }, [error, token, navigate, role, location?.state?.from?.pathname])

    if (loading) {
        // return <Loading />
    }

    const handleLogin = async event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setEmail(email);
        if (role === 'admin') {
            const adminSecretKey = event.target.adminSecretKey.value;
            fetch(`https://hidden-sea-34919.herokuapp.com/isAdmin/${email}&${adminSecretKey}`)
                .then(res => res.json())
                .then(data => {
                    if (data === 1) {
                        signInWithEmailAndPassword(email, password)
                            .then(() => {
                                console.log('role');
                                localStorage.setItem('role', '61646D696E');
                                console.log(localStorage.getItem('role'))
                            });
                    }
                    else {
                        setErrorMessage('Wrong Credential! Please check your email and secret key');
                    }
                })
            // console.log(localStorage.getItem('role'))
        }
        else if (role === 'student') {
            signInWithEmailAndPassword(email, password)
                .then(() => localStorage.setItem('role', '73747564656E74'));
        }

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

                {role === 'admin' &&
                    <Form.Group className="mb-3" controlId="adminSecretKey">
                        <Form.Label>Admin Secret Key</Form.Label>
                        <Form.Control type="number" onWheel={e => e.target.blur()} name='adminSecretKey' placeholder="Enter your secret key" required onFocus={() => setErrorMessage('')} />
                    </Form.Group>
                }

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter Password" required onFocus={() => setErrorMessage('')} />
                </Form.Group>

                {errorMessage && <p className='mt-2 text-danger'>{errorMessage} <span className='text-primary ms-3 reset-button' onClick={async () => {
                    await sendPasswordResetEmail(email);
                    toast.success('Password reset email sent!');
                }}>Reset Password</span></p>}

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