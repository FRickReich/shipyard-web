'use strict';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Menu } from 'semantic-ui-react';

class DashboardSidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Menu vertical>
				<Menu.Item>
					<Menu.Header>Translations</Menu.Header>

					<Menu.Menu>
						<Menu.Item as={NavLink} exact to="/dashboard/translations/languages">
							Languages
						</Menu.Item>
						<Menu.Item as={NavLink} exact to="/dashboard/translations/collections">
							Collections
						</Menu.Item>
						<Menu.Item as={NavLink} exact to="/dashboard/translations/settings">
							Settings
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
			</Menu>
		);
	}
}

export default DashboardSidebar;
