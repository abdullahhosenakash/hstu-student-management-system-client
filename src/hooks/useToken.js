import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const useToken = () => {
    const [user] = useAuthState(auth);
    const [token, setToken] = useState('');
    useEffect(() => {
        const email = user?.email;
        const currentUser = { email };
        email && fetch(`http://localhost:5000/user-login/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(currentUser)
        })
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(data => {
                localStorage.setItem('accessToken', data.token);
                setToken(data.token);
                console.log(data);
            });
    }, [user?.email])
    return [token];
};

export default useToken;