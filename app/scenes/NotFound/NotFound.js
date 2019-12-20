'use strict';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import { Button, Form, Grid, Statistic, Icon, Container, Header, Message, Segment } from 'semantic-ui-react';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';

class NotFound extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<PageHeader />
				<Container>
					<Grid textAlign="center" style={{ height: '80vh' }} verticalAlign="middle">
						<Grid.Column style={{ maxWidth: 450 }}>
							<Icon name="warning sign" size="massive" />
							<Header as="h2" dividing>
								<Header.Content>
									404 - Page not found
									<Header.Subheader>
										The page you're' trying to reach does not exist.
									</Header.Subheader>
								</Header.Content>
							</Header>
							<Link to="/">Go back to homepage</Link>
						</Grid.Column>
					</Grid>
				</Container>
				<PageFooter />
			</div>
		);
	}
}

export default NotFound;

/* <div className="page-body">
    <main className="page-content">
        <h2>404 - Page not found</h2>
        <Link to="/">Go home!</Link>
    </main>
</div> */
