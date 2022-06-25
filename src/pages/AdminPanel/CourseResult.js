import React, { useState } from 'react';
import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import useObtainedGradePoint from '../../hooks/useObtainedGradePoint';

const CourseResult = ({ course, handleCourseResult, reset }) => {
    const { courseCode, courseTitle } = course;
    const courseCodeWithoutSpace = courseCode.split(' ')[0] + courseCode.split(' ')[1];
    const [letterGrade, setLetterGrade] = useState('');
    const [obtainedGradePoint] = useObtainedGradePoint(letterGrade);


    useEffect(() => {
        if (reset) {
            setLetterGrade('');
        }
        else if (obtainedGradePoint) {
            const courseResult = {
                courseCode,
                courseTitle,
                letterGrade: letterGrade,
                gradePoint: obtainedGradePoint
            }
            handleCourseResult(courseResult);
        }
    }, [obtainedGradePoint, reset]);

    return (
        <div className='border border-2 border-muted rounded-3 my-3 p-2'>
            <p className='my-0 fw-bold fs-5'>Course Code: {courseCode}</p>
            <small className='mb-1 d-block'>Course Title: {courseTitle}</small>
            <Form.Group controlId={`letterGradeFor${courseCodeWithoutSpace}`} className='half-input-field left-field'>
                <Form.Label className='mb-1'>Letter Grade</Form.Label>
                <Form.Select aria-label="Floating label select example" name={`letterGradeFor${courseCodeWithoutSpace}`} required onChange={e => setLetterGrade(e.target.value)}>
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

            <Form.Group controlId={`gradePointFor${courseCodeWithoutSpace}`} className='mb-3 half-input-field right-field'>
                <Form.Label className='mb-1'>Grade Point</Form.Label>
                <Form.Control name={`gradePointFor${courseCodeWithoutSpace}`} placeholder="Obtained Grade Point" disabled value={reset ? '' : obtainedGradePoint} />
            </Form.Group>
        </div>
    );
};

export default CourseResult;