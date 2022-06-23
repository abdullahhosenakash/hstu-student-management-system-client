import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useToken = () => {
    const [user] = useAuthState(auth);
    const [token, setToken] = useState('');
    const [loggedInUser, setLoggedInUser] = useState({});
    const role = localStorage.getItem('role');

    useEffect(() => {
        const userEmail = user?.email;
        if (role === '61646D696E' || role === '73747564656E74') {
            userEmail && fetch(`http://localhost:5000/user-login/${userEmail}&${role}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('accessToken', data.token);
                    setToken(data.token);
                    setLoggedInUser(data.user);
                    if (data.user?.userEmail) {
                        localStorage.setItem('profileUpdated', true);
                    }
                    else {
                        localStorage.setItem('profileUpdated', false);
                    }
                });
        }
    }, [user?.email, role])
    return { token, loggedInUser };
};

export default useToken;