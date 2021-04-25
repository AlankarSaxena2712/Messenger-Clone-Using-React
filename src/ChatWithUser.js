import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, IconButton } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Message from './Message';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { Link } from 'react-router-dom';


const ChatWithUser = (props) => {

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => { 
        axios.get(`https://messenger-clone-backend.herokuapp.com/message/${props.data.match.params.name}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + localStorage.getItem("token")
            }
        })
        .then(response => {
            setMessages(response.data.data)
        })
    });

    const sendMessage = (event) => {
        event.preventDefault();
        axios.post(`https://messenger-clone-backend.herokuapp.com/message/${props.data.match.params.name}`, {
            "content": input,
            "sender": localStorage.getItem('user'),
            "room": props.data.match.params.name
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "token " + localStorage.getItem("token")
            }
        }).then(response => {
            setMessages([...messages, response.data.data])
        })
        setInput('');
    }
    return (
        <div>
            <h4><Link to='/'>Show All Rooms</Link></h4>
            <FlipMove>
                {
                    messages.map(({id, content, sender}) => (
                        <Message key={id} message={content} username={sender} />
                    ))
                }
            </FlipMove>
            <form className='app__form'>
                <FormControl className='app__formControl'>
                    <Input className='app__input' placeholder={"Enter Message..."} value={input} onChange={event => setInput(event.target.value)}/>
                    <IconButton className='app__iconButton' disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
                        <SendIcon />
                    </IconButton>
                </FormControl>
            </form>
        </div>
    )
}

export default ChatWithUser
