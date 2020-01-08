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
import ImageUploader from './../../../components/ImageUploader/ImageUploader';

import { getFromStorage } from '../../../utils/storage';

class DashboardProjectCreate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			title: '',
			description: '',
			titleError: false,
			descriptionError: false
		};
	}

	handleImageUpload(profileImage) {
		this.setState({ image: profileImage });
	}

	onTitleChange(event) {
		this.setState({ title: event.target.value, titleError: event.target.value === '' });
	}

	onDescriptionChange(event) {
		this.setState({ description: event.target.value, descriptionError: event.target.value === '' });
	}

	onCreateButtonClicked(event) {
		const { image, title, description } = this.state;

		const obj = getFromStorage('botany-bay');

		if (obj && obj.token) {
			const { token } = obj;

			fetch('/api/projects/?id=' + token, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title,
					description: description,
					image: image
				})
			})
				.then((res) => res.json())
				.then((json) => {
					if (json.success) {
						this.setState({
							success: true,
							data: json
						});
					}
					else {
						this.setState({
							success: false
						});
					}
				});
		}
	}

	goBack() {
		this.props.history.goBack();
	}

	render() {
		const { image, title, description, titleError, descriptionError } = this.state;

		return (
			<AccountLayout title="" subtitle="">
				<Grid textAlign="center" style={{ height: '70vh' }} verticalAlign="middle">
					<Grid.Column style={{ maxWidth: 450 }}>
						<Header as="h2" color="black" textAlign="center">
							Create Project
						</Header>
						<Segment raised>
							<ImageUploader image={image} onUploadImage={this.handleImageUpload.bind(this)} />
						</Segment>
						<Form size="large">
							<Segment raised>
								<Form.Field>
									<Form.Input
										label="Title"
										placeholder="Project title"
										value={title}
										error={titleError}
										onChange={this.onTitleChange.bind(this)}
									/>
								</Form.Field>
								<Form.Field
									id="form-textarea-control-opinion"
									onChange={this.onDescriptionChange.bind(this)}
									control={TextArea}
									error={true}
									label="Description"
									placeholder="Description"
									error={descriptionError}
									value={description}
								/>
								<Button basic floated="left" onClick={this.goBack.bind(this)}>
									Cancel
								</Button>
								<Button positive floated="right" onClick={this.onCreateButtonClicked.bind(this)}>
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
