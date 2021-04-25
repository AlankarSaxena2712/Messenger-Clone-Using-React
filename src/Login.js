import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const Login = ({ setAuth }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const data = {
        "username": username,
        "password": password
    }

    const LoginUser = (event) => {
        event.preventDefault();
        axios.post("https://messenger-clone-backend.herokuapp.com/login", data)
        .then(response => {
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem("user", username);
            setAuth(true);
            history.push("/", {loggedIn: true});
        }).catch(error => {alert("Wrong Username or Password!!!")})
    }


    return (
        <div>
            <h3>Login</h3>
                <form>
                    <FormControl>
                        <InputLabel htmlFor='user'>Username</InputLabel>
                        <Input value={username} id='user' onChange={event => setUsername(event.target.value)} />
                    </FormControl>
                    <br />
                    <br />
                    <FormControl>
                        <InputLabel htmlFor='pass'>Password</InputLabel>
                        <Input value={password} id='pass' type='password' onChange={event => setPassword(event.target.value)} />
                        <br />
                        <Button onClick={LoginUser} type='submit' variant='contained' color='primary'>Login</Button>
                    </FormControl>
                </form>
                <h4><Link to='/register'>Don't Have an Account? Register</Link></h4>
        </div>
    )
}

export default Login
