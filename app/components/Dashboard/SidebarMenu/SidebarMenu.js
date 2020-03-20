'use strict';

import React, { Component } from 'react';

import {
	Menu,
	Input,
	Dropdown,
	Table,
	Segment,
	Header,
	Icon,
	Popup,
	Button,
	Image,
	Label,
	Grid,
	Container,
	Divider
} from 'semantic-ui-react';

class SidebarMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const { userData } = this.props;

		return (
			<Grid padded="horizontally">
				<Grid.Row>
					<Grid.Column>
						<Menu vertical text inverted size="large">
							<Menu.Menu>
								<Menu.Item>
									<Header as="h3" inverted>
										<Icon name="settings" />
										<Header.Content>Settings</Header.Content>
									</Header>
								</Menu.Item>
							</Menu.Menu>
						</Menu>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}
}

export default SidebarMenu;
