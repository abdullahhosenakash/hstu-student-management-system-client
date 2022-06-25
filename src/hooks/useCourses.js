import { useState, useEffect } from 'react';

const useCourses = (department, level, semester) => {
    const [courses, setCourses] = useState([]);
    const levelSemester = level + semester;
    useEffect(() => {
        switch (department) {
            case 'cse':
                switch (levelSemester) {
                    case '1I':
                        // setCourses('B.Sc Engineering in CSE');
                        break;

                    default:
                }
                break;

            case 'ece':
                switch (levelSemester) {
                    case '1I':
                        setCourses([
                            {
                                courseCode: 'EEE 103',
                                courseTitle: 'Basic Electrical Engineering'
                            },
                            {
                                courseCode: 'EEE 104',
                                courseTitle: 'Basic Electrical Engineering Sessional'
                            },
                            {
                                courseCode: 'CSE 107',
                                courseTitle: 'Computer Basics and Programming'
                            },
                            {
                                courseCode: 'CSE 108',
                                courseTitle: 'Computer Basics and Programming Sessional'
                            },
                            {
                                courseCode: 'MAT 109',
                                courseTitle: 'Differential and Integral Calculus'
                            },
                            {
                                courseCode: 'CHE 139',
                                courseTitle: 'Chemistry'
                            },
                            {
                                courseCode: 'CHE 140',
                                courseTitle: 'Chemistry Sessional'
                            },
                            {
                                courseCode: 'SSL 107',
                                courseTitle: 'Technical English'
                            },
                            {
                                courseCode: 'SOC 105',
                                courseTitle: 'Sociology'
                            }
                        ]);
                        break;

                    case '1II':
                        setCourses([
                            {
                                courseCode: 'ECE 151',
                                courseTitle: 'Electronics-I'
                            },
                            {
                                courseCode: 'ECE 152',
                                courseTitle: 'Electronics-I Sessional'
                            },
                            {
                                courseCode: 'EEE 157',
                                courseTitle: 'Electrical Drives'
                            },
                            {
                                courseCode: 'EEE 158',
                                courseTitle: 'Electrical Drives Sessional'
                            },
                            {
                                courseCode: 'AIE 110',
                                courseTitle: 'Mechanical Engineering Drawing'
                            },
                            {
                                courseCode: 'PHY 111',
                                courseTitle: 'Engineering Physics'
                            },
                            {
                                courseCode: 'PHY 112',
                                courseTitle: 'Engineering Physics Sessional'
                            },
                            {
                                courseCode: 'MAT 113',
                                courseTitle: 'Ordinary & Partial Differential Equations and Matrix'
                            },
                            {
                                courseCode: 'ECN 129',
                                courseTitle: 'Economics'
                            }
                        ]);
                        break;

                    default:
                }
                break;

            case 'eee':
                // setDegree('B.Sc Engineering in EEE');
                break;

            default:
                setCourses([]);
        }
    }, [department, level, semester, levelSemester]);
    return [courses];
};

export default useCourses;