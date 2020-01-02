'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

import { Header, Message } from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';

class DashboardSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<AccountLayout>
				<Header
					as="h2"
					content="Account Settings"
					subheader="Manage your account settings and set preferences"
				/>
				{/* password email linked accounts security privacy notification settings deactivate account */}
			</AccountLayout>
		);
	}
}

export default DashboardSettings;
