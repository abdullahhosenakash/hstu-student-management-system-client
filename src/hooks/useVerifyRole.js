import { signOut } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const useVerifyRole = (role) => {
    const navigate = useNavigate();
    const storedRole = localStorage.getItem('role');
    console.log(role, storedRole)
    useEffect(() => {
        if (role === 'admin') {
            if (storedRole !== '61646D696E') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('profileUpdated');
                localStorage.removeItem('role');
                signOut(auth);
                navigate('/forbiddenAccess', { replace: true });
            }
        }
        else if (role === 'student') {
            if (storedRole !== '73747564656E74') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('profileUpdated');
                localStorage.removeItem('role');
                signOut(auth);
                navigate('/forbiddenAccess', { replace: true });
            }
        }
    }, [navigate, storedRole, role]);
};

export default useVerifyRole;