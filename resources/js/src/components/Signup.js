import React, {useEffect, useState} from 'react';
import AppContainer from './AppContainer';
import {useNavigate} from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const axios = window.axios;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // check Login
        let value = localStorage.getItem('isAuthentification') || '';
        if(value) navigate('/p');
    }, [])
    
    const addUser = async () => {
        setLoading(true);
        try {
            await axios({
                headers: { 
                    'content-type': 'application/json'
                },
                method: 'post',
                url: `/addUser`,
                params: {
                    email:email,
                    password:password
                }
            })
            .then((response) => {            
                if(response.data.data == 'true') {
                    localStorage.setItem('isAuthentification', true);
                    navigate('/p');
                } else {
                    alert();
                }
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
        } catch (err) {
            alert('Error!');
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container">
            <AppContainer title="Page Signup">
                <div className="login">
                    <div className="form">
                        <form className="login-form">
                            <span className="material-icons">lock</span>
                            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" required/>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="password" required />
                            <button type="button" onClick={addUser}> {loading ? 'Loading...' : 'LOGIN'} </button>
                        </form>
                    </div>
                </div>
            </AppContainer>
        </div>
    );
}

export default Signup;
