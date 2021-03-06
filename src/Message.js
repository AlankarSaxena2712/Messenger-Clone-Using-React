import { Card, CardContent, Typography } from '@material-ui/core';
import React, { forwardRef } from 'react';
import './Message.css';

const Message = forwardRef(({message, username}, ref) => {

    const isUser = username === localStorage.getItem('user');

    return (
        <div ref={ref} className={`message ${isUser && 'message__user'}`}>
            <Card className={isUser ? "message_userCard" : "message_guestCard"}>
                <CardContent>
                    <Typography variant='h5' component='h2'>
                        {isUser ? `${message}` : `${username || "Unknown User"} : ${message}`}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
});

export default Message
