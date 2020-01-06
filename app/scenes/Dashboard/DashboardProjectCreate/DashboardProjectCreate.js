'use strict';

import { Link, NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import 'whatwg-fetch';

import {
	Header,
	Message,
	Button,
	Grid,
	TextArea,
	Form,
	Input,
	Segment,
	Dimmer,
	Loader,
	Divider
} from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';

class DashboardProjectCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<AccountLayout title="" subtitle="">
				<Grid textAlign="center" style={{ height: '70vh' }} verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="black" textAlign="center">
							Create Project
						</Header>
						<Form size="large">
							<Segment raised>
								<Form.Field>
									<label>Title</label>
									<Input placeholder="Project title" />
								</Form.Field>
								<Form.Field
									id="form-textarea-control-opinion"
									control={TextArea}
									label="Description"
									placeholder="Description"
								/>
								<Form.Field>
									<label>Website</label>
									<Input placeholder="Website" />
								</Form.Field>
								<Form.Select
									fluid
									label="Category"
									options={[
										{ key: 'en', text: 'English', value: 'en' },
										{ key: 'de', text: 'Deutsch', value: 'de' }
									]}
									placeholder="Category"
								/>
								<Form.Select
									fluid
									label="Platform"
									options={[
										{ key: 'en', text: 'English', value: 'en' },
										{ key: 'de', text: 'Deutsch', value: 'de' }
									]}
									placeholder="Platform"
								/>

								<Button basic floated="left">
									Cancel
								</Button>
								<Button positive floated="right">
									Create
								</Button>
								<Divider hidden />
								<Divider hidden />
							</Segment>
						</Form>
					</Grid.Column>
				</Grid>
			</AccountLayout>
		);
	}
}

export default DashboardProjectCreate;

// - title - description - website - logo - category - target platform

/*
<Segment basic>
					<Form>
						<Form.Field>
							<label>Title</label>
							<Input placeholder="Username" />
						</Form.Field>
						<Form.Field
							id="form-textarea-control-opinion"
							control={TextArea}
							label="Opinion"
							placeholder="Opinion"
						/>
						<Form.Select
							fluid
							label="Language"
							value={'en'}
							options={[
								{ key: 'en', text: 'English', value: 'en' },
								{ key: 'de', text: 'Deutsch', value: 'de' }
							]}
							placeholder="Gender"
						/>
					</Form>
				</Segment>
*/

/*
<Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as="h2" color="black" textAlign="center">
						Log-in
					</Header>
					<Form size="large">
						<Segment raised>
							<Form.Input
								type="email"
								fluid
								icon="user"
								iconPosition="left"
								value={email}
								onChange={this.onTextboxChangeSignInEmail}
								placeholder="E-mail address"
							/>
							<Form.Input
								fluid
								icon="lock"
								iconPosition="left"
								placeholder="Password"
								type="password"
								value={password}
								onChange={this.onTextboxChangeSignInPassword}
							/>
							<Button color="teal" fluid size="large" onClick={this.onSignIn}>
								Login
							</Button>
						</Segment>
					</Form>
					{signInError ? <Message color="red">{signInError}</Message> : null}
					{search.get('verified') ? (
						<Message color="green">Account verified, You can log in now!</Message>
					) : (
						<Message>
							Dont have an account yet?&nbsp;
							<NavLink exact to="/register">
								Create one now!
							</NavLink>
						</Message>
					)}
				</Grid.Column>
			</Grid>
*/
