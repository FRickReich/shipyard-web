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
	Loader,
	Container,
	Divider
} from 'semantic-ui-react';

import SidebarHeader from './../SidebarHeader/SidebarHeader';
import SidebarMenu from './../SidebarMenu/SidebarMenu';

class Sidebar extends Component {
	constructor(props) {
		super(props);

		this.state = { isLoading: true };
	}

	render() {
		const { userData, isLoading } = this.props;

		return (
			<Grid.Column width={3} className="page-sidebar" color="black">
				<SidebarHeader isLoading={isLoading} userData={userData} />
				{isLoading ? <Loader active={isLoading} /> : <SidebarMenu userData={userData} />}
			</Grid.Column>
		);
	}
}

export default Sidebar;
