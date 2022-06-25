import { useState, useEffect } from 'react';

const useDegree = (department) => {
    const [degree, setDegree] = useState('');
    useEffect(() => {
        switch (department) {
            case 'cse':
                setDegree('B.Sc Engineering in CSE');
                break;

            case 'ece':
                setDegree('B.Sc Engineering in ECE');
                break;

            case 'eee':
                setDegree('B.Sc Engineering in EEE');
                break;

            default:
                setDegree('');
        }
    }, [department]);
    return [degree];
};

export default useDegree;