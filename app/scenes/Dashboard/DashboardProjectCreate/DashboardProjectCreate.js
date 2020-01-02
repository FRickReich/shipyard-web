'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

import { Header, Message } from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';

class DashboardProjectCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<AccountLayout>
				<Header as="h2" content="Create new project" subheader="Create a new project" />
			</AccountLayout>
		);
	}
}

export default DashboardProjectCreate;
