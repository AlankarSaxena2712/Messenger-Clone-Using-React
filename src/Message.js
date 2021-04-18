import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react';
import './Message.css';

function Message({message, username}) {

    const isUser = username === message.username;

    return (
        <div className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message_userCard" : "message_guestCard"}>
                <CardContent>
                    <Typography color='white' variant='h5' component='h2'>
                       {message.username} : {message.text}
                    </Typography>
                </CardContent>
            </Card>
            {/* <p>{props.user} : {props.text}</p> */}
        </div>
    )
}

export default Message
