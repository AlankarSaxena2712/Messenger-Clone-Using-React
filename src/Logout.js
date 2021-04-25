import React from 'react'
import { Redirect } from 'react-router'

const Logout = ({ auth }) => {

    
    if (localStorage.getItem('token')) {
        localStorage.clear();
        auth(false)
    }
    
    return (
        <>
        <Redirect to='/login'></Redirect>
        </>
    )
}

export default Logout
