'use strict';

import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';

class DashboardSidebar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeItem: ''
		};
	}

	handleItemClick(name) {
		this.setState({ activeItem: name });
	}

	render() {
		const { activeItem } = this.state;

		return (
			<Menu vertical>
				<Menu.Item>
					<Menu.Header>Account</Menu.Header>

					<Menu.Menu>
						<Menu.Item>Overview</Menu.Item>
						<Menu.Item>Settings</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>Translations</Menu.Header>

					<Menu.Menu>
						<Menu.Item>Languages</Menu.Item>
						<Menu.Item>Collections</Menu.Item>
					</Menu.Menu>
				</Menu.Item>

				<Menu.Item>
					<Menu.Header>Message of the Day</Menu.Header>

					<Menu.Menu>
						<Menu.Item>New Message</Menu.Item>
						<Menu.Item>Calendar</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		);
	}
}

export default DashboardSidebar;
