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
	Message,
	Button,
	Image,
	Label,
	Grid,
	Container,
	Divider
} from 'semantic-ui-react';

import ContentHeader from '../ContentHeader/ContentHeader';
import DashboardMessage from '../DashboardMessage/DashboardMessager';
import DashboardFooter from '../DashboardFooter/DashboardFooter';

class Content extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { title, subtitle, message, messagetype, showmessage } = this.props;

		return (
			<Grid.Column width={13} className="page-content">
				{/* Content Header */}
				<ContentHeader title={title} subtitle={subtitle} />

				{/* Content Page */}
				<Segment basic className="fix-content">
					{this.props.children}

					{/* <Grid columns={3} padded="horizontally">
                        <Grid.Row>
                            <Grid.Column>A</Grid.Column>
                            <Grid.Column>B</Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>1</Grid.Column>
                            <Grid.Column>2</Grid.Column>
                            <Grid.Column>3</Grid.Column>
                        </Grid.Row>
                    </Grid> */}
				</Segment>

				<DashboardFooter />
			</Grid.Column>
		);
	}
}

export default Content;
