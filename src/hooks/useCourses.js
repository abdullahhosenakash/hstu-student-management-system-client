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

                    case '2I':
                        setCourses([
                            {
                                courseCode: 'ECE 202',
                                courseTitle: 'Electronic Circuit Design Sessional'
                            },
                            {
                                courseCode: 'ECE 203',
                                courseTitle: 'Electronics-II'
                            },
                            {
                                courseCode: 'ECE 204',
                                courseTitle: 'Electronics-II Sessional'
                            },
                            {
                                courseCode: 'ECE 205',
                                courseTitle: 'Signals and Systems'
                            },
                            {
                                courseCode: 'ECE 206',
                                courseTitle: 'Signals and Systems Sessional'
                            },
                            {
                                courseCode: 'CSE 211',
                                courseTitle: 'Data Structures and Algorithms'
                            },
                            {
                                courseCode: 'CSE 212',
                                courseTitle: 'Data Structures and Algorithms Sessional'
                            },
                            {
                                courseCode: 'MAT 203',
                                courseTitle: 'Vector Analysis and Operational Calculus'
                            },
                            {
                                courseCode: 'ACT 209',
                                courseTitle: 'Financial and Manegerial Accounting '
                            }
                        ]);
                        break;

                    case '2II':
                        setCourses([
                            {
                                courseCode: 'ECE 251',
                                courseTitle: 'Digital Logic Design'
                            },
                            {
                                courseCode: 'ECE 252',
                                courseTitle: 'Digital Logic Design Sessional'
                            },
                            {
                                courseCode: 'ECE 253',
                                courseTitle: 'Electromagnetic Fields & Waves'
                            },
                            {
                                courseCode: 'ECE 255',
                                courseTitle: 'Analog Communications'
                            },
                            {
                                courseCode: 'ECE 256',
                                courseTitle: 'Analog Communications Sessional'
                            },
                            {
                                courseCode: 'ECE 257',
                                courseTitle: 'Industrial Electronics'
                            },
                            {
                                courseCode: 'ECE 258',
                                courseTitle: 'Industrial Electronics Sessional'
                            },
                            {
                                courseCode: 'CSE 261',
                                courseTitle: 'Object Oriented and Internet Programming'
                            },
                            {
                                courseCode: 'CSE 262',
                                courseTitle: 'Object Oriented and Internet Programming Sessional'
                            },
                            {
                                courseCode: 'STT 211',
                                courseTitle: 'Engineering Statistics and Complex Variables'
                            },
                            {
                                courseCode: 'ECE 200',
                                courseTitle: 'Industrial Tour'
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