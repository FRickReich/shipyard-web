'use strict';

import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import { Button, Modal, Dropdown, Icon, Container, Menu, Header } from 'semantic-ui-react';

import { getFromStorage } from './../../utils/storage';

class DashboardHeader extends Component {
	constructor(props) {
		super(props);

		this.state = { logoutModalOpen: false, isLoading: false };
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
		const { logoutModalOpen } = this.state;

		return (
			<Container>
				<Menu pointing secondary>
					<Menu.Item name="account" />
					<Menu.Menu position="right">
						<Dropdown item text={userData.email}>
							<Dropdown.Menu>
								<Dropdown.Item onClick={this.openLogoutModal.bind(this)}>Log-out</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Menu>
				</Menu>
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
