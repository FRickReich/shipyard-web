import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';

import Home from './scenes/Home/Home';
import Dashboard from './scenes/Dashboard/Dashboard';
import NotFound from './scenes/NotFound/NotFound';

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/dashboard" component={Dashboard} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</Router>,
	document.querySelector('#root')
);
