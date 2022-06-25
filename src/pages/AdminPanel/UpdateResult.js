import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import auth from '../../firebase.init';
import useCourses from '../../hooks/useCourses';
import useDegree from '../../hooks/useDegree';
import useDept from '../../hooks/useDept';
import useObtainedGradePoint from '../../hooks/useObtainedGradePoint';
import './AdminPanel.css';

const UpdateResult = () => {
    const [errorMessage, setErrorMessage] = useState();
    const [batchInfo, setBatchInfo] = useState({});
    const [degree] = useDegree(batchInfo?.department);
    const [faculty, setFaculty] = useState('');
    const [dept] = useDept(faculty);
    const [letterGrade, setLetterGrade] = useState('');
    const [obtainedGradePoint] = useObtainedGradePoint(letterGrade);
    const [courses] = useCourses(batchInfo?.department, batchInfo?.level, batchInfo?.semester);

    const handleProceedToResultUpdate = event => {
        event.preventDefault();
        // setLoading(true);
        const faculty = event.target.faculty.value;
        const department = event.target.department.value;
        const level = event.target.level.value;
        const semester = event.target.semester.value;
        const session = event.target.session.value;
        const examYear = event.target.examYear.value;
        const batchInfo = { faculty, department, level, semester, session, examYear };
        console.log(batchInfo);
        setBatchInfo(batchInfo);
        event.target.reset();

        // const url = `http://localhost:5000/updateResult/${studentId}`;

        // fetch('', {
        //     method: 'GET',
        //     headers: {
        //         'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        //     }
        // })
        //     .then(res => {
        //         if (res.status === 401 || res.status === 403) {
        //             localStorage.removeItem('accessToken');
        //             localStorage.removeItem('profileUpdated');
        //             localStorage.removeItem('role');
        //             signOut(auth);
        //             return;
        //         }
        //         else if (res.status === 404) {
        //             setErrorMessage('Student ID Number is invalid');
        //             return;
        //         }
        //         else {
        //             return res.json();
        //         }
        //     })

        //             else {
        // localStorage.removeItem('accessToken');
        // signOut(auth);
        // return;
    }
    console.log(degree);

    const handleUpdateResult = event => {
        event.preventDefault();
        // setLoading(true);
        const faculty = event.target.faculty.value;
        const department = event.target.department.value;
        const level = event.target.level.value;
        const semester = event.target.semester.value;
        const session = event.target.session.value;
        const examYear = event.target.examYear.value;
        const batchInfo = { faculty, department, level, semester, session, examYear };
        console.log(batchInfo);
        setBatchInfo(batchInfo);
        event.target.reset();
    }

    return (
        <div className='mb-5'>
            <div className={`${batchInfo.session ? 'd-none' : 'd-block'} batch-info mx-auto`}>
                <h4 className="text-center pt-3">Batch Information</h4>
                <Form onSubmit={handleProceedToResultUpdate}>
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
                                dept?.map((d, index) => <option key={index} value={d.deptValue}>{d.dept}</option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="level" className='half-input-field left-field mb-3'>
                        <Form.Label>Level</Form.Label>
                        <Form.Select aria-label="Floating label select example" name='level' required>
                            <option value="">- - Select Level - -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="semester" className='mb-3 half-input-field right-field'>
                        <Form.Label>Semester</Form.Label>
                        <Form.Select aria-label="Floating label select example" name='semester' required>
                            <option value="">- - Select Semester - -</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 half-input-field left-field" controlId="session">
                        <Form.Label>Session</Form.Label>
                        <Form.Control type="number" name='session' placeholder="Enter Session" required onWheel={e => e.target.blur()} />
                    </Form.Group>

                    <Form.Group className="mb-3 half-input-field right-field" controlId="examYear">
                        <Form.Label>Exam Year</Form.Label>
                        <Form.Control type="number" onWheel={e => e.target.blur()} name='examYear' placeholder="Enter Exam Year" required />
                    </Form.Group>

                    {errorMessage && <p className='mt-2 text-danger'>{errorMessage}</p>}

                    <Button variant="secondary" type="submit" className='mx-auto d-block'>
                        Proceed to Result Update
                    </Button>
                </Form>
            </div>

            <div className={`${batchInfo.session ? 'd-block' : 'd-none'} update-result mx-auto`}>
                <h4 className="text-center pt-3">Update Result</h4>
                <h6 className="text-center text-muted d-flex flex-lg-row flex-column justify-content-center">
                    <span>
                        <span className='me-4'>{degree}</span>
                    </span>
                    <span>
                        <span className='me-2'>Level-{batchInfo.level}</span>
                        <span className='me-3'>Semester-{batchInfo.semester}</span>
                        <span className='me-3'>Exam-{batchInfo.examYear}</span>
                    </span>
                </h6>

                <Form onSubmit={handleUpdateResult}>
                    <Form.Group className="mb-3" controlId="studentId">
                        <Form.Label>Student ID No</Form.Label>
                        <Form.Control type="number" name='studentId' placeholder="Enter Student ID No" required onWheel={e => e.target.blur()} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="studentName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" name='studentName' placeholder="Enter Student Name" required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="obtainedGPA">
                        <Form.Label>Obtained GPA</Form.Label>
                        <Form.Control type="number" name='obtainedGPA' placeholder="Enter Obtained GPA" required onWheel={e => e.target.blur()} />
                    </Form.Group>

                    {
                        courses.map((course, index) =>
                            <div className='border border-2 border-secondary rounded-3 my-3 p-2' key={index}>
                                <p className='my-0 fw-bold fs-5'>Course Code: {course.courseCode}</p>
                                <Form.Group controlId="level" className='half-input-field left-field'>
                                    <Form.Label className='mb-1'>Letter Grade</Form.Label>
                                    <Form.Select aria-label="Floating label select example" name='level' required onChange={e => setLetterGrade(e.target.value)}>
                                        <option value="">- - Select Letter Grade - -</option>
                                        <option value="A+">A+</option>
                                        <option value="A">A</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B">B</option>
                                        <option value="B-">B-</option>
                                        <option value="C+">C+</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                        <option value="F">F</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group controlId="semester" className='mb-3 half-input-field right-field'>
                                    <Form.Label className='mb-1'>Grade Point</Form.Label>
                                    <Form.Control name='session' placeholder="Obtained Grade Point" disabled value={obtainedGradePoint} />
                                </Form.Group>
                            </div>
                        )
                    }

                    {errorMessage && <p className='mt-2 text-danger'>{errorMessage}</p>}

                    <Button variant="secondary" type="submit" className='mx-auto d-block'>
                        Proceed to Result Update
                    </Button>
                </Form>


            </div >
        </div >
    );
};

export default UpdateResult;