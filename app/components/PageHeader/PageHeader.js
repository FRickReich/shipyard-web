'use strict';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Container, Menu, Segment } from 'semantic-ui-react';

class PageHeader extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<Segment inverted vertical>
					<Container>
						<Menu inverted pointing secondary>
							<Menu.Item as={NavLink} name="home" exact to="/">
								Home
							</Menu.Item>
							<Menu.Item position="right" as={NavLink} name="dashboard" to="/dashboard">
								Dashboard
							</Menu.Item>
						</Menu>
					</Container>
				</Segment>
			</div>
		);
	}
}

export default PageHeader;
