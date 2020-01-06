'use strict';

import React, { Component } from 'react';
import 'whatwg-fetch';

import {
	Statistic,
	Icon,
	Card,
	Button,
	Message,
	Grid,
	Divider,
	Header,
	Form,
	Segment,
	Dimmer,
	Loader
} from 'semantic-ui-react';

import AccountLayout from './../../../components/AccountLayout/AccountLayout';
import DashboardSegment from '../../../components/DashboardSegment/DashboardSegment';

class DashboardSettings extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<AccountLayout title="Account Settings" subtitle="Manage your account settings and set preferences">
				<DashboardSegment title="General" loading={false}>
					<Form>
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
					{/* password, language, layout */}
				</DashboardSegment>
				<DashboardSegment title="Security" loading={false}>
					{/* security related settings */}
				</DashboardSegment>
				<DashboardSegment title="Email & Notifications" loading={false}>
					{/* email adresses, notifications, newsletter */}
				</DashboardSegment>
				<DashboardSegment title="Privacy" loading={false}>
					{/* privacy settings */}
				</DashboardSegment>
				<DashboardSegment title="Linked Accounts" loading={false}>
					{/* linked, connected accounts */}
				</DashboardSegment>
			</AccountLayout>
		);
	}
}

export default DashboardSettings;
