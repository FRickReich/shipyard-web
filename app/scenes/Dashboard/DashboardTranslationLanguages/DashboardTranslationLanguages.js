'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

import { Icon, Divider, Header, Input, Table, Button, Checkbox, Grid } from 'semantic-ui-react';

import DashboardLayout from './../../../components/DashboardLayout/DashboardLayout';

class DashboardTranslationLanguages extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const languages = [
			{ name: 'English', short: 'EN', active: true },
			{ name: 'German', short: 'DE', active: true },
			{ name: 'Spanish', short: 'ES', active: true },
			{ name: 'French', short: 'FR', active: false },
			{ name: 'Italian', short: 'IT', active: false }
		];

		return (
			<DashboardLayout>
				<Header
					as="h2"
					content="Translation Languages"
					subheader="Manage and add Languages for your translations"
				/>

				<Divider horizontal>
					<Header as="h4">List of languages</Header>
				</Divider>

				<Table celled striped>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell />
							<Table.HeaderCell>Name</Table.HeaderCell>
							<Table.HeaderCell>Shortcode</Table.HeaderCell>
							<Table.HeaderCell textAlign="right">Options</Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{languages.map((language, i) => {
							return (
								<Table.Row key={i}>
									<Table.Cell collapsing colSpan="1">
										<Checkbox checked={language.active} toggle />
									</Table.Cell>
									<Table.Cell>{language.name}</Table.Cell>
									<Table.Cell>{language.short}</Table.Cell>
									<Table.Cell collapsing />
								</Table.Row>
							);
						})}
						<Table.Row>
							<Table.Cell collapsing colSpan="1">
								<Checkbox toggle />
							</Table.Cell>
							<Table.Cell>Klingon</Table.Cell>
							<Table.Cell>KL</Table.Cell>
							<Table.Cell textAlign="right">
								<Button negative fluid>
									Delete
								</Button>
							</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell collapsing colSpan="1" />
							<Table.Cell>
								<Input fluid placeholder="Name" />
							</Table.Cell>
							<Table.Cell>
								<Input fluid placeholder="Shorthand" />
							</Table.Cell>
							<Table.Cell textAlign="right">
								<Button positive fluid>
									Add
								</Button>
							</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table>
			</DashboardLayout>
		);
	}
}

export default DashboardTranslationLanguages;
