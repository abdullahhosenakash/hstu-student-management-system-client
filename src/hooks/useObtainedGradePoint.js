import { useState, useEffect } from 'react';

const useObtainedGradePoint = (letterGrade) => {
    const [obtainedGradePoint, setObtainedGradePoint] = useState('');
    useEffect(() => {
        switch (letterGrade) {
            case 'A+':
                setObtainedGradePoint('4.00');
                break;

            case 'A':
                setObtainedGradePoint('3.75');
                break;

            case 'A-':
                setObtainedGradePoint('3.50');
                break;

            case 'B+':
                setObtainedGradePoint('3.25');
                break;

            case 'B':
                setObtainedGradePoint('3.00');
                break;

            case 'B-':
                setObtainedGradePoint('2.75');
                break;

            case 'C+':
                setObtainedGradePoint('2.50');
                break;

            case 'C':
                setObtainedGradePoint('2.25');
                break;

            case 'D':
                setObtainedGradePoint('2.00');
                break;

            case 'F':
                setObtainedGradePoint('0.00');
                break;

            default:
                setObtainedGradePoint('');
        }
    }, [letterGrade]);
    return [obtainedGradePoint];
};

export default useObtainedGradePoint;