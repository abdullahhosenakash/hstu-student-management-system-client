import { useState, useEffect } from 'react';

const useDept = (faculty) => {
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
                setDept([]);
        }
    }, [faculty]);
    return [dept];
};

export default useDept;