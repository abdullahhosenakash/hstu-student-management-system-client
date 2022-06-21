import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';
import { useEffect } from 'react';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const [user] = useAuthState(auth);
    const location = useLocation();
    const { role } = location.state;
    const navigate = useNavigate();
    const [token] = useToken();
    const [
        createUserWithEmailAndPassword,
        user2,
        signUpLoading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile] = useUpdateProfile(auth);

    useEffect(() => {
        token && navigate(`${role === 'student' ? '/studentPanel' : '/adminPanel'}`, { replace: true });
    }, [navigate, token, role]);

    if (signUpLoading) {
        return <Loading />
    }
    const handleSignup = event => {
        event.preventDefault();
        // setLoading(true);
        const studentName = event.target.name.value;
        const studentEmail = event.target.email.value;
        const password = event.target.password.value;

        createUserWithEmailAndPassword(studentEmail, password)
            .then(async () => {
                await updateProfile({ displayName: studentName });
            });
    }

    return (
        <div className='sign-up-page mx-auto header-margin mb-5'>
            <h2 className='display-6 text-center'>Student Sign Up</h2>
            <Form onSubmit={handleSignup}>

                <Form.Group className="mb-3" controlId="studentName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name according to your Student ID Card" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter new password" required />
                </Form.Group>


                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="secondary" type="submit" className='w-50 mx-auto d-block'>
                    Sign Up
                </Button>
            </Form>
            <p className='mt-2'>Already have an account? <Link to='/login' className="text-decoration-none ms-1" state={{ role: 'student' }}>Login</Link></p>
        </div>
    );
};

export default SignUp;