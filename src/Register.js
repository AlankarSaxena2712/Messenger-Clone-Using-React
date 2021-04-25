import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const data = {
        "username": username,
        "password": password
    }

    const registerUser = async (event) => {
        event.preventDefault();
        await axios.post("https://messenger-clone-backend.herokuapp.com/register", data)
        .then(response => {
            if (response.status === 201) {
                window.location.href = '/login';
            }
        }).catch(error => {alert("username already taken!!!")})
        setUsername('');
        setPassword('');
    }

    return (
        <div>
            <h3>Register</h3>
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
                    <Button onClick={registerUser} type='submit' variant='contained' color='primary'>Register</Button>
                </FormControl>
            </form>
            <h4><Link to='/login'>Already Have an Account? Login</Link></h4>
        </div>
    )
}

export default Register
