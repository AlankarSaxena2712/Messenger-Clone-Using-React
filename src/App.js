import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Navbar from './Navbar';
import User from './User';
import ChatWithUser from './ChatWithUser';

function App() {

  	return (
    	<div className="App">
			<BrowserRouter>
				<Navbar />
				<Switch>
					<Route exact path='/' component={User} />
					<Route exact path='/chat' component={Chat} />
					<Route path='/chat/:user/:name' component={ChatWithUser} />
				</Switch>
			</BrowserRouter>
    	</div>
  	);
}

export default App;
