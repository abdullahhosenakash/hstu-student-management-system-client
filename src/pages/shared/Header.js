import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import CustomLink from './CustomLink';
import './Shared.css';

const Header = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    // console.log(user)
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark" className='fixed-top'>
                <Container>
                    <Navbar.Brand as={Link} to='/'>HSTU Student Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {!user && <Nav className="me-auto"></Nav>}
                        {role === '73747564656E74' &&
                            <>
                                <Nav className="me-auto">
                                    <Nav.Link><CustomLink to='/studentPanel/enrollment'>Enrollment</CustomLink></Nav.Link>
                                    <Nav.Link><CustomLink to='/studentPanel/result'>Result</CustomLink></Nav.Link>
                                    <Nav.Link><CustomLink to='/studentPanel/userProfile'>Profile</CustomLink></Nav.Link>
                                </Nav>
                            </>
                        }

                        {role === '61646D696E' &&
                            <>
                                <Nav className="me-auto">
                                    <Nav.Link><CustomLink to='/adminPanel/pendingUsers'>Pending Users</CustomLink></Nav.Link>
                                    <Nav.Link><CustomLink to='/adminPanel/updateResult'>Update Result</CustomLink></Nav.Link>
                                    <Nav.Link><CustomLink to='/adminPanel/updateStudent'>Update Student</CustomLink></Nav.Link>
                                    <Nav.Link><CustomLink to='/adminPanel/manageStudents'>Manage Students</CustomLink></Nav.Link>
                                    <Nav.Link><CustomLink to='/adminPanel/adminProfile'>Profile</CustomLink></Nav.Link>
                                </Nav>
                            </>
                        }

                        <Nav>
                            {
                                user ?
                                    <>
                                        <Nav.Link className='text-white'>{user.displayName}</Nav.Link>
                                        <Nav.Link onClick={() => {
                                            localStorage.removeItem('accessToken');
                                            localStorage.removeItem('profileUpdated');
                                            localStorage.removeItem('role');
                                            signOut(auth);
                                            navigate('/', { replace: true });
                                        }}>Sign Out</Nav.Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as={Link} to='/login' state={{ role: 'student' }}>Student Login</Nav.Link>
                                        <Nav.Link as={Link} to='/signup' state={{ role: 'student' }}>
                                            Student Sign Up
                                        </Nav.Link>
                                        <Nav.Link as={Link} to='/login' state={{ role: 'admin' }}>Admin Login</Nav.Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    );
};

export default Header;