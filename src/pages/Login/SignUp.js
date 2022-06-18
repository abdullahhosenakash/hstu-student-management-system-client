import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [faculty, setFaculty] = useState('');
    const [dept, setDept] = useState([]);
    useEffect(() => {
        let department;
        switch (faculty) {
            case 'agriculture':
                department = [
                    {
                        dept: 'Agriculture',
                        deptValue: 'agriculture'
                    }
                ]
                setDept(department);
                break;

            case 'cse':
                department = [
                    {
                        dept: 'Computer Science and Engineering',
                        deptValue: 'cse'
                    },
                    {
                        dept: 'Electronics and Communication Engineering',
                        deptValue: 'ece'
                    },
                    {
                        dept: 'Electrical and Electronic Engineering',
                        deptValue: 'eee'
                    }
                ]
                setDept(department);
                break;

            case 'bs':
                department = [
                    {
                        dept: 'Accounting',
                        deptValue: 'accounting'
                    },
                    {
                        dept: 'Finance and Banking',
                        deptValue: 'financeAndBanking'
                    },
                    {
                        dept: 'Management',
                        deptValue: 'management'
                    },
                    {
                        dept: 'Marketing',
                        deptValue: 'marketing'
                    }
                ]
                setDept(department);
                break;

            case 'fisheries':
                department = [
                    {
                        dept: 'Fisheries',
                        deptValue: 'fisheries'
                    }
                ]
                setDept(department);
                break;

            case 'dvm':
                department = [
                    {
                        dept: 'Veterinary and Animal Science',
                        deptValue: 'dvm'
                    }
                ]
                setDept(department);
                break;

            case 'engineering':
                department = [
                    {
                        dept: 'Agricultural & Industrial Engineering',
                        deptValue: 'aie'
                    },
                    {
                        dept: 'Food and Process Engineering',
                        deptValue: 'fpe'
                    },
                    {
                        dept: 'Architecture',
                        deptValue: 'architecture'
                    },
                    {
                        dept: 'Civil Engineering',
                        deptValue: 'ce'
                    },
                    {
                        dept: 'Mechanical Engineering',
                        deptValue: 'me'
                    }
                ]
                setDept(department);
                break;

            case 'science':
                department = [
                    {
                        dept: 'Chemistry',
                        deptValue: 'chemistry'
                    },
                    {
                        dept: 'Physics',
                        deptValue: 'physics'
                    },
                    {
                        dept: 'Mathematics',
                        deptValue: 'mathematics'
                    },
                    {
                        dept: 'Statistics',
                        deptValue: 'statistics'
                    }
                ]
                setDept(department);
                break;

            case 'ssh':
                department = [
                    {
                        dept: 'English',
                        deptValue: 'english'
                    },
                    {
                        dept: 'Economics',
                        deptValue: 'economics'
                    },
                    {
                        dept: 'Sociology',
                        deptValue: 'sociology'
                    },
                    {
                        dept: 'Development Studies',
                        deptValue: 'developmentStudies'
                    }
                ]
                setDept(department);
                break;

            default:
                return;
        }
    }, [faculty])
    const handleSignup = event => {
        event.preventDefault();
    }
    console.log(dept);
    return (
        <div className='login-page mx-auto header-margin'>
            <h2 className='display-6 text-center'>Student Sign Up</h2>
            <Form onSubmit={handleSignup}>

                <Form.Group className="mb-3" controlId="studentName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter Name according to your Student ID Card" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="number" onWheel={e => e.target.blur()} name='studentId' placeholder="Enter Student ID" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Enter Password" />
                </Form.Group>

                <Form.Group className="mb-3 pe-3 w-50 d-inline-block" controlId="studentFaculty">
                    <Form.Label>Faculty</Form.Label>
                    <Form.Select aria-label="Faculty" required onChange={e => setFaculty(e.target.value)}>
                        <option value=''>- - Select Faculty - -</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="cse">Computer Science and Engineering</option>
                        <option value="bs">Business Studies</option>
                        <option value="fisheries">Fisheries</option>
                        <option value="dvm">Veterinary and Animal Science</option>
                        <option value="engineering">Engineering</option>
                        <option value="science">Science</option>
                        <option value="ssh">Social Science and Humanities</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 ps-3 w-50 d-inline-block" controlId="studentDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Select aria-label="Department" >
                        <option value=''>- - Select Department - -</option>
                        {
                            dept.map((d, index) => <option key={index} value={d.deptValue}>{d.dept}</option>)
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentIdCard">
                    <Form.Label>Student ID Card</Form.Label>
                    <Form.Control type="file" name='photo' />
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