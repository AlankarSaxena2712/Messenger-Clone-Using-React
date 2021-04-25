import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ auth }) => {
    const token = localStorage.getItem('token');
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        if (token) {
            setLogout(true)
        }
    });
    return (
        <div>
            <img alt='messenger logo' src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      		<h1>Messenger Clone
                  {logout?<Link to='/logout'><span style={{color:"red", fontSize:"20px", padding:"10px"}}>Logout</span></Link>:<span></span>}
            </h1>
        </div>
    )
}

export default Navbar
