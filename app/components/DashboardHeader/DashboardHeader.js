'use strict';

import { withRouter, NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Button, Modal, Dropdown, Icon, Container, Menu, Header, Loader, Segment, Divider } from 'semantic-ui-react';

import { getFromStorage } from './../../utils/storage';

class DashboardHeader extends Component {
	constructor(props) {
		super(props);

		this.state = { logoutModalOpen: false, isLoading: true };
	}

	openLogoutModal() {
		this.setState({ logoutModalOpen: true });
	}
	closeLogoutModal() {
		this.setState({ logoutModalOpen: false });
	}

	logout() {
		this.setState({
			isLoading: true
		});

		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/logout?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					localStorage.removeItem('botany-bay');

					this.setState({
						token: '',
						signInError: '',
						isLoading: false
					});

					this.props.history.push('/');
				}
				else {
					this.setState({
						isLoading: false
					});
				}
			});
		}
		else {
			this.setState({
				isLoading: false
			});
		}
	}

	render() {
		const { userData } = this.props;
		const { logoutModalOpen, isLoading } = this.state;

		return (
			<Container>
				<Segment vertical>
					<Menu secondary>
						<Menu.Menu position="right">
							{/* <Dropdown item text="Project" pointing="top left">
							<Dropdown.Menu>
								<Dropdown.Item>Create new Project</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown> */}
							{this.props.location.pathname !== '/dashboard/projects/create' && (
								<Menu.Item>
									<Button primary as={NavLink} exact to="/dashboard/projects/create">
										Create new Project
									</Button>
								</Menu.Item>
							)}

							<Dropdown
								item
								pointing="top right"
								text={userData && userData.username}
								loading={userData ? false : true}
							>
								<Dropdown.Menu>
									<Dropdown.Item
										icon="dashboard"
										text="Overview"
										as={NavLink}
										exact
										to="/dashboard"
									/>
									<Dropdown.Item
										icon="settings"
										text="Settings"
										as={NavLink}
										exact
										to="/dashboard/settings"
									/>
									<Dropdown.Item
										icon="user"
										text="Profile"
										as={NavLink}
										exact
										to="/dashboard/profile"
									/>
									<Dropdown.Divider />
									<Dropdown.Item
										icon="log out"
										onClick={this.openLogoutModal.bind(this)}
										text="Log-out"
									/>
								</Dropdown.Menu>
							</Dropdown>
						</Menu.Menu>
					</Menu>
				</Segment>
				<Modal
					open={logoutModalOpen}
					onOpen={this.openLogoutModal}
					onClose={this.closeLogoutModal}
					basic
					size="small"
				>
					<Header icon="archive" content="Log-out" />
					<Modal.Content>
						<p>Are you sure you want to log-out?</p>
					</Modal.Content>
					<Modal.Actions>
						<Button basic color="red" onClick={this.closeLogoutModal.bind(this)} inverted>
							<Icon name="remove" /> No
						</Button>
						<Button color="green" onClick={this.logout.bind(this)} inverted>
							<Icon name="checkmark" /> Yes
						</Button>
					</Modal.Actions>
				</Modal>
			</Container>
		);
	}
}

export default withRouter(DashboardHeader);

{
	/*
						<Menu.Item>
					<Menu.Header>Account</Menu.Header>

					<Menu.Menu>
						<Menu.Item as={NavLink} exact to="/dashboard">
							Overview
						</Menu.Item>
						<Menu.Item as={NavLink} exact to="/dashboard/settings">
							Settings
						</Menu.Item>
						<Menu.Item as={NavLink} exact to="/dashboard/profile">
							Profile
						</Menu.Item>
					</Menu.Menu>
				</Menu.Item>
				*/
}
