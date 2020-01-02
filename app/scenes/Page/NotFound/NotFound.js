'use strict';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { Grid, Icon, Header } from 'semantic-ui-react';

import PageLayout from './../../../components/PageLayout/PageLayout';

class NotFound extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		return (
			<PageLayout>
				<Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450 }}>
						<Icon name="warning sign" size="massive" />
						<Header as="h2" dividing>
							<Header.Content>
								404 - Page not found
								<Header.Subheader>The page you're' trying to reach does not exist.</Header.Subheader>
							</Header.Content>
						</Header>
						<Link onClick={this.goBack.bind(this)}>Return to previous page</Link>
					</Grid.Column>
				</Grid>
			</PageLayout>
		);
	}
}

export default NotFound;
