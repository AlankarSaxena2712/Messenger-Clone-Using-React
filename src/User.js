import { Button, Card, CardContent, FormControl, Input, InputLabel, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import db from './firebase';
import { Link } from 'react-router-dom';
import './User.css';
import UserCard from "./UserCard";
import firebase from 'firebase';

const User = () => {

    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [rooms, setRooms] = useState('');

    useEffect(() => {
        db.collection('rooms').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setUsers(snapshot.docs.map(doc => ({id: doc.id, room: doc.data()})))
        });
    }, []);

    const saveUsername = (event) => {
        event.preventDefault();
        db.collection('users').add({
            user: username
        });
        setCurrentUser(username);
        setUsername('');
    };

    const saveRoom = (event) => {
        event.preventDefault();
        db.collection(rooms).add({})
        db.collection('rooms').add({
            name: rooms,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setRooms('');
    }

    return (
        <div>
            {currentUser ? <h3>Welcome, {currentUser}</h3>
            :
                <form>
                    <FormControl>
                        <InputLabel>Enter Username</InputLabel>
                        <Input value={username} onChange={event => setUsername(event.target.value)} />
                        <Button disabled={currentUser} onClick={saveUsername} type='submit' variant='contained' color='primary'>Save</Button>
                    </FormControl>
                </form>
            }
            <form>
                <FormControl>
                    <InputLabel>Create Room</InputLabel>
                    <Input value={rooms} onChange={event => setRooms(event.target.value)} />
                    <Button disabled={!currentUser} onClick={saveRoom} type='submit' variant='contained' color='primary'>Create</Button>
                </FormControl>
            </form>
            {
                !currentUser ? <h3>Please take a username to further proceed!!!</h3> :
                <div className='user__Card'>
                    <Link to='/chat'>
                        <Card className='User__card' variant='outlined'>
                            <CardContent>
                                <Typography variant='h5' component='h3'>
                                    Chat with all
                                </Typography>
                            </CardContent>
                        </Card> 
                    </Link>
                    {
                        users.map(({id, room}) => (
                                <UserCard key={id} roomName={room.name} user={currentUser} />
                        ))
                    }
                </div>
            }      
        </div>
    )
}

export default User;
