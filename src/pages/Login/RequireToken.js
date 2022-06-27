import { signOut } from 'firebase/auth';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const RequireToken = ({ children }) => {
    const availableToken = localStorage.getItem('accessToken');
    const location = useLocation();
    const navigate = useNavigate();

    if (!availableToken) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
    else {
        fetch('https://hidden-sea-34919.herokuapp.com/verifyToken', {
            headers: {
                'authorization': `Bearer ${availableToken}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('profileUpdated');
                    localStorage.removeItem('role');
                    signOut(auth);
                    return navigate('/forbiddenAccess', { replace: true });
                }
                else if (res.status === 404) {
                    toast.error('404 Not Found! Please reload the page');
                    return;
                }
            })
    }
    return children;
};
export default RequireToken;