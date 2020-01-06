import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';

import Home from './scenes/Page/Home/Home';
import Login from './scenes/Page/Login/Login';
import NotFound from './scenes/Page/NotFound/NotFound';
import Register from './scenes/Page/Register/Register';

import DashboardOverview from './scenes/Dashboard/DashboardOverview/DashboardOverview';
import DashboardSettings from './scenes/Dashboard/DashboardSettings/DashboardSettings';
import DashboardProjectCreate from './scenes/Dashboard/DashboardProjectCreate/DashboardProjectCreate';
import DashboardProfile from './scenes/Dashboard/DashboardProfile/DashboardProfile';

ReactDOM.render(
	<Router>
		<App>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/dashboard/login" component={Login} />
				<Route exact path="/dashboard" component={DashboardOverview} />
				<Route exact path="/dashboard/settings" component={DashboardSettings} />
				<Route exact path="/dashboard/profile" component={DashboardProfile} />
				<Route exact path="/dashboard/projects/create" component={DashboardProjectCreate} />
				<Route path="/register" component={Register} />
				<Route component={NotFound} />
			</Switch>
		</App>
	</Router>,
	document.querySelector('#root')
);
