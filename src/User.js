import { Button, FormControl, Input, InputLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import './User.css';
import UserCard from "./UserCard";
import axios from 'axios';

const User = (props) => {
    const [currentUser, setCurrentUser] = useState('');
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState('');

    useEffect(() => {
        axios.get("https://messenger-clone-backend.herokuapp.com/room", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setRooms(response.data.data)
        })
        setCurrentUser(localStorage.getItem('user'));
    }, []);

    const saveRoom = (event) => {
        event.preventDefault();
        axios.post("https://messenger-clone-backend.herokuapp.com/room", {"name": newRoom}, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setRooms([...rooms, response.data.data])
        })
        setNewRoom('');
    }


    return (
        <div>
            {
                props.auth?
                <>
                <h3>Welcome, {currentUser}</h3>
            <form>
                <FormControl>
                    <InputLabel>Create Room</InputLabel>
                    <Input value={newRoom} onChange={event => setNewRoom(event.target.value)} />
                    <Button disabled={!currentUser} onClick={saveRoom} type='submit' variant='contained' color='primary'>Create</Button>
                </FormControl>
            </form>
            {
                !currentUser ? <h3>Please take a username to further proceed!!!</h3> :
                <div className='user__Card'>
                    {
                        rooms.map(({id, name}) => (
                                <UserCard key={id} roomName={name} user={currentUser} />
                        ))
                    }
                </div>
            }      
        </>:
        <Redirect to='/login'></Redirect>
    }
    </div>
    )
}

export default User;
