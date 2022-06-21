import React, { useEffect } from 'react';
import { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Result = () => {
    const [user] = useAuthState(auth);
    const [result, setResult] = useState({});
    const [loggedInUser, setLoggedInUser] = useState({});
    const [profileUpdated, setProfileUpdated] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:5000/userInfo/${user?.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.userEmail) {
                    setProfileUpdated(true);
                    setLoggedInUser(data);
                }
                else {
                    setProfileUpdated(false);
                }
            });
    }, [user.email]);

    const handleGetResult = event => {
        event.preventDefault();
        const level = event.target.level.value;
        const semester = event.target.semester.value;
        const studentId = loggedInUser.studentId;
        console.log(level, semester)
        const url = `http://localhost:5000/results/&${studentId}&${level}&${semester}`;

        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }
    return (
        <div className='result mx-auto mb-5'>
            <div className="d-flex flex-lg-row flex-column">
                <div className="level-semester-subsection">
                    <Form onSubmit={handleGetResult}>
                        <Form.Group controlId="level" className='mb-3'>
                            <Form.Label>Level</Form.Label>
                            <Form.Select aria-label="Floating label select example" name='level' required>
                                <option value="">- - Select Level - -</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="semester" className='mb-3'>
                            <Form.Label>Semester</Form.Label>
                            <Form.Select aria-label="Floating label select example" name='semester' required>
                                <option value="">- - Select Semester - -</option>
                                <option value="I">I</option>
                                <option value="II">II</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className='w-50 mx-auto d-block'>
                            Submit
                        </Button>
                    </Form>
                </div>

                <div className="result-subsection">
                    <h2 className="result-text mt-5 d-none">Please Select level and semester to see your result</h2>
                    <h5 className="text-center text-muted">Theory Courses</h5>
                    <Table responsive striped bordered hover variant="">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>

                        </tbody>
                    </Table>

                    <h5 className="text-center text-muted">Sessional Courses</h5>
                    <Table responsive striped bordered hover variant="">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>

                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default Result;