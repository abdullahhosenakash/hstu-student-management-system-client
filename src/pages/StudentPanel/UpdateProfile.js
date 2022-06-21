import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import auth, { storage } from '../../firebase.init';
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';

const UpdateProfile = () => {
    const [user] = useAuthState(auth);
    const [faculty, setFaculty] = useState('');
    const [dept, setDept] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentIdCardURL, setStudentIdCardURL] = useState('');
    const [loading, setLoading] = useState(false);

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
                setDept([]);
        }
    }, [faculty]);

    if (loading) {
        return <Loading />
    }
    const handleSignup = event => {
        event.preventDefault();
        // setLoading(true);
        const studentName = user.displayName;
        const studentEmail = user.email;
        const studentId = event.target.studentId.value;
        const phone = event.target.phone.value;
        const faculty = event.target.faculty.value;
        const department = event.target.department.value;
        const studentIdCard = event.target.studentIdCard.files[0];

        const reference = ref(storage, `images/session-20${studentId.slice(0, 2)}/faculty-${faculty}/department-${department}/${studentId}`);
        fetch(`http://localhost:5000/user/${studentId}`)
            .then(res => {
                if (res.status === 404) {
                    setErrorMessage('Student ID is invalid');
                }
                else {
                    return res.json();
                }
            })
            .then(data => console.log(data.studentEmail));
        // createUserWithEmailAndPassword(studentEmail, password)
        //     .then(async () => {
        //         await updateProfile({ displayName: studentName });
        //         fetch(`http://localhost:5000/user/${studentId}`)
        //             .then(res => res.json())
        //             .then(data => {
        //                 if (!data.studentEmail) {
        //                     uploadBytes(reference, studentIdCard)
        //                         .then(() => {
        //                             getDownloadURL(reference)
        //                                 .then(url => {
        //                                     setStudentIdCardURL(url);
        //                                     console.log(studentName, studentEmail, studentId, password, faculty, department, studentIdCardURL);
        //                                     setLoading(false);
        //                                 });
        //                         });
        //                 }
        //             })

        //     });
    }
    // uploadBytes(reference, studentIdCard)
    //     .then(() => {
    //         getDownloadURL(reference)
    //             .then(url => {
    //                 setStudentIdCardURL(url);
    //                 createUserWithEmailAndPassword(studentEmail, password)
    //                     .then(async () => await updateProfile({ displayName: studentName }))
    //                 console.log(studentName, studentEmail, studentId, password, faculty, department, studentIdCardURL);
    //                 setLoading(false);
    //             });
    //     });

    // console.log(error)
    // console.log(user);
    return (
        <div className='update-profile mx-auto mb-5'>
            <h3 className='fs-3 text-center'>Update Your Profile</h3>
            <Form onSubmit={handleSignup}>

                <Form.Group className="mb-3" controlId="studentName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter Name according to your Student ID Card" value={user.displayName} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" value={user.email} disabled />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentId">
                    <Form.Label>Student ID</Form.Label>
                    <Form.Control type="number" onWheel={e => e.target.blur()} name='studentId' placeholder="Enter Student ID" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" onWheel={e => e.target.blur()} name='phone' placeholder="Enter Phone Number" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentFaculty">
                    <Form.Label>Faculty</Form.Label>
                    <Form.Select aria-label="Faculty" name='faculty' required onChange={e => setFaculty(e.target.value)}>
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

                <Form.Group className="mb-3" controlId="studentDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Select aria-label="Department" name='department' required>
                        <option value=''>- - Select Department - -</option>
                        {
                            dept.map((d, index) => <option key={index} value={d.deptValue}>{d.dept}</option>)
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="studentIdCard">
                    <Form.Label>Student ID Card</Form.Label>
                    <Form.Control type="file" name='studentIdCard' accept=".png, .jpg, .jpeg" required />
                </Form.Group>

                <Button variant="secondary" type="submit" className='w-50 mx-auto d-block'>
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default UpdateProfile;