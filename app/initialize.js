import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';

import Home from './scenes/Page/Home/Home';
import Login from './scenes/Page/Login/Login';
import NotFound from './scenes/Page/NotFound/NotFound';
import Register from './scenes/Page/Register/Register';

import DashboardOverview from './scenes/Dashboard/DashboardOverview/DashboardOverview';

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/dashboard/login" component={Login} />
				<Route exact path="/dashboard" component={DashboardOverview} />
				<Route path="/register" component={Register} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</Router>,
	document.querySelector('#root')
);
