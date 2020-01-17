'use strict';

import { withRouter, NavLink } from 'react-router-dom';
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

import { getFromStorage } from './../../../utils/storage';

class AccountMenu extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userId: '',
			isLoading: true,
			projects: []
		};
	}

	componentDidMount() {
		if (this.props.userData) {
			this.setState(
				{
					userId: this.props.userData.id
				},
				() => {
					this.fetchProjects(this.state.userId);
				}
			);
		} else {
			this.setState({ isLoading: true });
		}
	}

	logout() {
		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			// Verify token
			fetch('/api/account/logout?token=' + token).then((res) => res.json()).then((json) => {
				if (json.success) {
					localStorage.removeItem('botany-bay');

					this.setState({
						token: '',
						signInError: ''
					});

					this.props.history.push('/');
				}
			});
		}
	}

	fetchProjects(id) {
		fetch(`/api/${id}/projects/`).then((res) => res.json()).then((json) => {
			if (json.success) {
				this.setState({
					projects: json.data,
					isLoading: false
				});
			}
		});
	}

	render() {
		const { isLoading, projects } = this.state;

		return (
			<div>
				<Menu vertical text size="large">
					<Menu.Item>
						<Menu.Header>Your Projects</Menu.Header>
						{isLoading ? <Segment basic loading /> : <Menu.Menu />}
					</Menu.Item>
					{projects.map((project, i) => {
						return (
							<Menu.Item key={i}>
								{project.image ? (
									<Image src={project.image} size="large" />
								) : (
									<Icon circular name="idea" size="large" />
								)}
								{project.title}
							</Menu.Item>
						);
					})}

					<Menu.Item>
						<Icon circular color="blue" name="add" size="large" />
						Create a new Project...
					</Menu.Item>
					<Menu.Item>
						<Menu.Header>Your Account</Menu.Header>

						<Menu.Menu>
							<Menu.Item name="Manage Profile" as={NavLink} exact to="/dashboard/profile/manage" />
							<Menu.Item name="Settings" />
							<Menu.Item name="Sign Out" onClick={this.logout.bind(this)} />
						</Menu.Menu>
					</Menu.Item>
				</Menu>
			</div>
		);
	}
}

export default withRouter(AccountMenu);

/*
<Menu.Item>
									<Grid>
										<Grid.Column width={12}>
											<Icon circular name="home" size="large" />
											TestProject1
										</Grid.Column>
										<Grid.Column width={4} floated="right" verticalAlign="middle">
											<Icon color="blue" name="check circle" />
										</Grid.Column>
									</Grid>
								</Menu.Item>
								<Menu.Item>
									<Icon circular name="home" size="large" />
									TestProject2
								</Menu.Item>
								<Menu.Item>
									<Icon circular color="blue" name="add" size="large" />
									Create a new Project...
								</Menu.Item>
*/
