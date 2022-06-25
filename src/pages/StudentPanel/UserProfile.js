import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import auth, { storage } from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../shared/Loading';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import useVerifyRole from '../../hooks/useVerifyRole';
import useDept from '../../hooks/useDept';

const UpdateProfile = () => {
    useVerifyRole('student');
    const [user] = useAuthState(auth);
    const [faculty, setFaculty] = useState('');
    const [dept] = useDept(faculty);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentIdCardURL, setStudentIdCardURL] = useState('');
    const { loggedInUser } = useToken();
    // const [profileUpdated, setProfileUpdated] = useState(false);
    const [loading, setLoading] = useState(false);

    const { userName, userEmail, phone, studentId, faculty: studentFaculty, department } = loggedInUser || {};
    const isProfileUpdated = localStorage.getItem('profileUpdated');

    if (loading) {
        return <Loading />
    }
    const handleUpdateProfile = event => {
        event.preventDefault();
        // setLoading(true);
        const userName = user.displayName;
        const userEmail = user.email;
        const studentId = event.target.studentId.value;
        const phone = event.target.phone.value;
        const faculty = event.target.faculty.value;
        const department = event.target.department.value;
        const studentIdCard = event.target.studentIdCard.files[0];

        const reference = ref(storage, `images/session-20${studentId.slice(0, 2)}/faculty-${faculty}/department-${department}/${studentId}`);
        const url = `https://hidden-sea-34919.herokuapp.com/updateUser/${studentId}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('profileUpdated');
                    localStorage.removeItem('role');
                    signOut(auth);
                    return;
                }
                else if (res.status === 404) {
                    setErrorMessage('Student ID Number is invalid');
                    return;
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                if (!data.userEmail) {
                    uploadBytes(reference, studentIdCard)
                        .then(() => {
                            getDownloadURL(reference)
                                .then(url => {
                                    setStudentIdCardURL(url);
                                });
                        });
                }
                else {
                    localStorage.removeItem('accessToken');
                    signOut(auth);
                    return;
                }
                if (studentIdCardURL) {
                    const updatedUser = { userName, userEmail, faculty, department, phone, studentIdCardURL };
                    console.log(updatedUser);
                    fetch(url, {
                        method: 'PUT',
                        headers: {
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(updatedUser)
                    })
                        .then(res => res.json())
                        .then(() => {
                            localStorage.setItem('profileUpdated', true)
                            toast.success('Profile Updated Successfully!');
                        });
                }
            });
    }
    return (
        <div className='update-profile mx-auto mb-5'>
            <h3 className='fs-3 text-center'>{isProfileUpdated === 'true' ? 'Profile Information' : 'Update Your Profile'}</h3>
            {isProfileUpdated === 'true' ?
                <div className="">
                    <FloatingLabel
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control value={userName} disabled />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control value={userEmail} disabled />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Student ID"
                        className="mb-3 pe-1 w-50 d-inline-block"
                    >
                        <Form.Control value={studentId} disabled />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Phone"
                        className="mb-3 w-50 ps-1 d-inline-block"
                    >
                        <Form.Control value={phone} disabled />
                    </FloatingLabel>

                    <FloatingLabel
                        label="Faculty"
                        className="mb-3"
                    >
                        <Form.Control value={studentFaculty} disabled />
                    </FloatingLabel>
                    <FloatingLabel
                        label="Department"
                        className="mb-3"
                    >
                        <Form.Control value={department} disabled />
                    </FloatingLabel>

                    <p className='text-success text-center'>Please Contact to the office if any of the information is wrong</p>
                </div>
                :
                <Form onSubmit={handleUpdateProfile}>

                    <Form.Group className="mb-3" controlId="studentName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name='name' placeholder="Enter Name according to your Student ID Card" value={user?.displayName} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="studentEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name='email' placeholder="Enter email" value={user?.email} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="studentId">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control type="number" onWheel={e => e.target.blur()} name='studentId' placeholder="Enter Student ID" required onFocus={() => setErrorMessage('')} />
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

                    {errorMessage && <p className='mt-2 text-danger'>{errorMessage}</p>}

                    <Button variant="secondary" type="submit" className='w-50 mx-auto d-block'>
                        Update
                    </Button>
                </Form>
            }
        </div>
    );
};

export default UpdateProfile;