import { Card, CardContent, Typography } from '@material-ui/core'
import React from 'react';
import { Link } from 'react-router-dom';
import './User.css';

const UserCard = (props) => {
    return (
        <Link to={'/chat/' + props.user + '/' + props.roomName}>
            <Card className='User__card' variant='outlined'>
                <CardContent>
                    <Typography variant='h5' component='h3'>
                        {props.roomName}
                    </Typography>
                </CardContent>
            </Card> 
        </Link>
    )
}

export default UserCard;
