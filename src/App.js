import { InputLabel, Input } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import React, { useEffect, useState } from 'react';
import './App.css';
import Message from './Message';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {username: "alankar", text:"hey giyd"},
    {username: "shaily", text:"wahts uo"}
  ]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt("Enter your username : "));
    }, [])


  const sendMessage = (event) => {
    event.preventDefault();
    setMessages([...messages, {username: username, text: input}]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Helo</h1>
      <form>
        <FormControl>
          <InputLabel>Enter Message...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
          <Button disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>Send Message</Button>
        </FormControl>
      </form>

      {
        messages.map(message => (
          <Message message={message} username={username} />
        ))
      }

    </div>
  );
}

export default App;
