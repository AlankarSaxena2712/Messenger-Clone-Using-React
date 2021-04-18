import { Input, IconButton } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect, useState } from 'react';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => { 
    db.collection('messages').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your username : "));
    }, []);


  const sendMessage = (event) => {
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }

  return (
    <div className="App">
      <img alt='messenger logo' src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Messenger Clone</h1>
      <h2>Hello {username}</h2>
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} message={message} username={username} />
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
  );
}

export default App;
