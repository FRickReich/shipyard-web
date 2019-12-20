import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';

import Home from './scenes/Home/Home';
import Dashboard from './scenes/Dashboard/Dashboard';
import Login from './scenes/Login/Login';
import NotFound from './scenes/NotFound/NotFound';
import Register from './scenes/Register/Register';

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/dashboard/login" component={Login} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/register" component={Register} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</Router>,
	document.querySelector('#root')
);
