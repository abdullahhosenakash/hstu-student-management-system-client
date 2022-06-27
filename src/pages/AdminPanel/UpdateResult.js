import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useCourses from '../../hooks/useCourses';
import useDegree from '../../hooks/useDegree';
import useDept from '../../hooks/useDept';
import './AdminPanel.css';
import CourseResult from './CourseResult';

const UpdateResult = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [batchInfo, setBatchInfo] = useState({});
    const [degree] = useDegree(batchInfo?.department);
    const [faculty, setFaculty] = useState('');
    const [dept] = useDept(faculty);
    const [courses] = useCourses(batchInfo?.department, batchInfo?.level, batchInfo?.semester);
    const [result, setResult] = useState([]);
    const [reset, setReset] = useState(false);
    const [studentIdNo, setStudentIdNo] = useState('');
    const [studentName, setStudentName] = useState('');
    const currentYear = new Date().getFullYear();
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [examYears, setExamYears] = useState([]);
    console.log(courses)

    useEffect(() => {
        let years = [];
        for (let i = currentYear; i >= 2010; i--) {
            years = [...years, i];
        }
        setSessions(years);
    }, [currentYear]);

    useEffect(() => {
        if (selectedSession) {
            let years = [];
            for (let i = currentYear; i >= selectedSession; i--) {
                years = [...years, i];
            }
            setExamYears(years);
        }
    }, [currentYear, selectedSession]);

    useEffect(() => {
        if (studentIdNo.length === 7) {
            fetch(`https://hidden-sea-34919.herokuapp.com/studentInfo/${studentIdNo}`, {
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
                    else {
                        return res.json();
                    }
                })
                .then(data => {
                    if (data.studentName) {
                        setStudentName(data.studentName);
                    }
                    else {
                        setStudentName('');
                    }
                })
        }
        else {
            setStudentName('');
        }
    }, [studentIdNo])

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
    }

    const handleUpdateResult = event => {
        event.preventDefault();
        // setLoading(true);
        const studentId = event.target.studentId.value;
        const studentName = event.target.studentName.value;
        const obtainedGPA = event.target.obtainedGPA.value;


        const courseResult = courses.map(course => {
            const available = result.find(c => c.courseCode === course.courseCode);
            return available;
        });
        const studentResult = {
            studentId,
            studentName,
            department: batchInfo.department,
            level: batchInfo.level,
            semester: batchInfo.semester,
            nameOfTheExam: degree,
            examYear: batchInfo.examYear,
            session: batchInfo.session,
            result: courseResult,
            GPA: obtainedGPA
        }
        console.log(studentResult);

        fetch('https://hidden-sea-34919.herokuapp.com/updateResult', {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(studentResult)
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
                    setErrorMessage('Failed to update result');
                    return;
                }
                else {
                    return res.json();
                }
            })
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setReset(true);
                    setResult([]);
                    event.target.reset();
                    setStudentName('');
                    toast.success('Result updated successfully!');
                }
                else {
                    setErrorMessage(data.message);
                }
            })

    }

    const handleCourseResult = courseResult => {
        const isAvailable = result.find(course => course.courseCode === courseResult.courseCode);
        if (isAvailable) {
            const restCourses = result.filter(course => course.courseCode !== courseResult.courseCode);
            setResult([...restCourses, courseResult]);
        }
        else {
            setResult([...result, courseResult])
        }
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
                        <Form.Select aria-label="Department" name='department' required readOnly>
                            <option value=''>- - Select Department - -</option>
                            {
                                dept?.map((d, index) => <option key={index} value={d.deptValue}>{d.dept}</option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="level" className='half-input-field left-field mb-3'>
                        <Form.Label>Level</Form.Label>
                        <Form.Select aria-label="Floating label select example" name='level' readOnly required>
                            <option value="">- - Select Level - -</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="semester" className='mb-3 half-input-field right-field'>
                        <Form.Label>Semester</Form.Label>
                        <Form.Select aria-label="Floating label select example" name='semester' readOnly required>
                            <option value="">- - Select Semester - -</option>
                            <option value="I">I</option>
                            <option value="II">II</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 half-input-field left-field" controlId="session">
                        <Form.Label>Session</Form.Label>
                        <Form.Select aria-label="Floating label select example" name='session' onChange={e => setSelectedSession(e.target.value)} required>
                            <option value="">- - Select Session - -</option>
                            {sessions.map(session => <option
                                value={session}
                                key={session}
                            >{session}</option>)
                            }
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3 half-input-field right-field" controlId="examYear">
                        <Form.Label>Exam Year</Form.Label>
                        <Form.Select aria-label="Floating label select example" name='examYear' readOnly required>
                            <option value="">- - Select Exam Year - -</option>
                            {examYears.map(examYear => <option
                                value={examYear}
                                key={examYear}
                            >{examYear}</option>)
                            }
                        </Form.Select>
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

                <Form onSubmit={handleUpdateResult} onClick={() => setReset(false)}>
                    <Form.Group className="mb-3" controlId="studentId">
                        <Form.Label>Student ID No</Form.Label>
                        <Form.Control type="number" name='studentId' placeholder="Enter Student ID No" required onWheel={e => e.target.blur()} onClick={() => setErrorMessage('')} onChange={e => setStudentIdNo(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="studentName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" name='studentName' placeholder="Enter Student Name" defaultValue={studentName ? studentName : ''} disabled={studentName} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="obtainedGPA">
                        <Form.Label>Obtained GPA</Form.Label>
                        <Form.Control type="number" step='0.01' name='obtainedGPA' placeholder="Enter Obtained GPA" required onWheel={e => e.target.blur()} />
                    </Form.Group>

                    {
                        courses.map((course, index) => <CourseResult
                            key={index}
                            course={course}
                            handleCourseResult={handleCourseResult}
                            reset={reset}
                        />)
                    }

                    {errorMessage && <p className='mt-2 text-danger'>{errorMessage}</p>}

                    <Button variant="secondary" type="submit" className='mx-auto d-block'>
                        Update Result
                    </Button>
                </Form>


            </div >
        </div >
    );
};

export default UpdateResult;

