import React, { useState, useEffect } from 'react';
import './App.css';
import { Input, IconButton } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Message from './Message';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import db from './firebase';
import firebase from 'firebase';


const ChatWithUser = (props) => {
    console.log(props.match.params);

    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => { 
        db.collection(props.match.params.name).orderBy("timestamp", "desc").onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => (
                {id: doc.id, message: doc.data()}
                )))
        })
    }, [props.match.params.name]);

    const sendMessage = (event) => {
        event.preventDefault();
        db.collection(props.match.params.name).add({
            message: input,
            username: props.match.params.user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }
    return (
        <div>
            <FlipMove>
                {
                    messages.map(({id, message}) => (
                        <Message key={id} message={message} username={props.match.params.user} />
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
