import { signOut } from 'firebase/auth';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Shared.css';

const Header = () => {
    const [user] = useAuthState(auth);
    console.log(user)
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark" className='fixed-top'>
                <Container>
                    <Navbar.Brand as={Link} to='/'>HSTU Student Panel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
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
                                        }}>Sign Out</Nav.Link>
                                    </>
                                    :
                                    <>
                                        {/* <Nav.Link as={Link} to='/login' state={{ role: 'student' }}>Login</Nav.Link>
                                        <Nav.Link as={Link} to='/signup' state={{ role: 'student' }}>
                                            Sign Up
                                        </Nav.Link> */}
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;