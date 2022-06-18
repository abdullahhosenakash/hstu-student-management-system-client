import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useUploadFile } from 'react-firebase-hooks/storage';
import './Login.css';
import { storage } from '../../firebase.init';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Login = () => {
    const location = useLocation();
    const { role } = location.state || "student";
    // const ref = storageRef(storage, 'file.jpg');
    // const reference = ref(storage, 'file.jpg')
    const [uploadFile, uploading, snapshot, error] = useUploadFile();
    const [selectedFile, setSelectedFile] = useState(null);
    const [studentId, setStudentId] = useState('');

    // const [value, loading, downloadError] = useDownloadURL(ref(storage, `images/batch-${studentId.slice(0, 2)}/faculty-${faculty}/${studentId}.jpg`));

    const handleLogin = async event => {
        event.preventDefault();
        // const adminEmail = event.target.adminEmail?.value;
        // const studentId = event.target.studentId.value;
        // let faculty;
        // console.log(studentId)
        // if (studentId) {
        //     switch (studentId.slice(2, 4)) {
        //         case '02':
        //             faculty = 'CSE';
        //             break;
        //         default:
        //             faculty = studentId.slice(2, 4);
        //             break;
        //     }
        // }
        // setStudentId(studentId);
        // // const password = event.target.password.value;
        // const photo = event.target[1].files[0];
        // setSelectedFile(photo);
        // const fileExtension = photo.name.split(".")[1];
        // const reference = ref(storage, `images/batch-${studentId.slice(0, 2)}/faculty-${faculty}/${studentId}.${fileExtension}`);

        // // if (selectedFile) {
        // //     uploadBytes(reference, photo)
        // //         .then(snapshot => {
        // //             console.log('uploaded');
        // //             getDownloadURL(reference)
        // //                 .then(url => console.log(url))
        // //         })
        // //     // const result = await uploadFile(reference, selectedFile, {
        // //     //     contentType: 'image/jpeg'
        // //     // });
        // //     // console.log(`Result: ${JSON.stringify(result)}`);
        // // }
        // // console.log(value);

        // // console.log(student)

        // // fetch('http://localhost:5000/user', {
        // //     method: 'POST',
        // //     body: formData
        // // })
        // //         .then(res => res.json())
        // // .then(data => console.log(data))

        // // getDownloadURL(reference)
        // //     .then(url => console.log(url));
        console.log(event.target.dept.value)
    }
    return (
        <div className='login-page mx-auto header-margin'>
            <h2 className='display-6'>{role === 'admin' ? "Admin" : "Student"} Login</h2>
            <Form onSubmit={handleLogin}>
                {
                    role === 'admin' ?
                        <FloatingLabel
                            controlId="adminEmail"
                            label="Admin Email address"
                            className="mb-3"
                        >
                            <Form.Control name='email' type="email" placeholder="Enter email" required />
                        </FloatingLabel>
                        :
                        <FloatingLabel
                            controlId="studentId"
                            label="Student ID"
                            className="mb-3"
                        >
                            <Form.Control name='studentId' type="number" placeholder="Enter Student ID" onWheel={e => e.target.blur()} />
                        </FloatingLabel>
                }
                {/* 
                <FloatingLabel
                    controlId="password"
                    label="Password"
                    className="mb-3"
                >
                    <Form.Control name='password' type="password" placeholder="Enter password" required />
                </FloatingLabel> */}
                {/* <input type="file" name='photo' accept=".png, .jpg, .jpeg" /> */}
                <Form.Group className="mb-3 ps-3 w-50 d-inline-block" controlId="studentDepartment">
                    <Form.Label>Department</Form.Label>
                    <Form.Select aria-label="Department" name='dept' required>
                        <option value=''>- - Select Department - -</option>
                        <option value="computerScienceAndEngineering">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>
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