'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

import {
	Statistic,
	Icon,
	Container,
	Pagination,
	Segment,
	Header,
	Divider,
	Table,
	Menu,
	Button,
	Grid,
	Label,
	Input,
	Sticky
} from 'semantic-ui-react';

import DashboardLayout from './../../../components/DashboardLayout/DashboardLayout';

class DashboardTranslationCollections extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeCollection: ''
		};
	}

	render() {
		return (
			<DashboardLayout>
				<Header as="h2" content="Translation Collections" subheader="Manage translations" />

				{/* - add collections - add translations to collections - add strings for translations in selected languages */}

				<Divider horizontal>
					<Header as="h4">Collection</Header>
				</Divider>

				<Grid>
					<Grid.Row>
						<Grid.Column width={11}>
							<Segment>1</Segment>
							<Segment>2</Segment>
							<Segment>3</Segment>
							<Segment>4</Segment>
							<Segment>5</Segment>
							<Segment>6</Segment>
							<Segment>7</Segment>
							<Segment>8</Segment>
							<Segment>9</Segment>
							<Segment>10</Segment>
							<Segment basic textAlign="center">
								<Pagination
									defaultActivePage={1}
									firstItem={null}
									lastItem={null}
									secondary
									totalPages={3}
								/>
							</Segment>
						</Grid.Column>
						<Grid.Column width={5}>
							<Menu vertical>
								<Menu.Item name="inbox">Menu</Menu.Item>

								<Menu.Item name="spam">Items</Menu.Item>
								<Menu.Item>
									<Input icon="add" placeholder="Add collection..." />
								</Menu.Item>
							</Menu>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</DashboardLayout>
		);
	}
}

export default DashboardTranslationCollections;
