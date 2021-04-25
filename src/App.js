import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Navbar from './Navbar';
import User from './User';
import ChatWithUser from './ChatWithUser';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import axios from 'axios';

function App() {

	const token = localStorage.getItem("token");
	var auth = false;

	if (token) {
		auth = true;
		axios.defaults.headers.common["Authorization"] = "token "+ localStorage.getItem("token");
	}
	const changeAuth = (value) => {
		auth = value;
	}

	return (
		<BrowserRouter>
    		<div className="App">
			<Navbar auth={auth} />
				<Switch>
					<Route exact path='/' component={() => <User auth={auth}/>} />
					<Route exact path='/register' component={() => <Register auth={auth} />} />
					<Route exact path='/login' component={() => <Login auth={auth} setAuth={changeAuth} />} />
					<Route exact path='/logout' component={() => <Logout auth={changeAuth} />} />
					<Route exact path='/chat' component={() => <Chat auth={auth} />} />
					<Route path='/chat/:name' component={(props) => <ChatWithUser auth={auth} data={props} />} />
				</Switch>
    		</div>
		</BrowserRouter>
  	);
}

export default App;
