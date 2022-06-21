import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useToken = () => {
    const [user] = useAuthState(auth);
    const [token, setToken] = useState('');
    useEffect(() => {
        const userEmail = user?.email;
        userEmail && fetch(`http://localhost:5000/user-login/${userEmail}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data.token);
                setToken(data.token);
            });
    }, [user?.email])
    return [token];
};

export default useToken;