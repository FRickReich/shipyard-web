'use strict';

import React, { Component } from 'react';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

import PageLayout from './../PageLayout/PageLayout';
import AccountLayout from './../AccountLayout/AccountLayout';

class ProfileLayout extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { loggedIn } = this.props;

		if (loggedIn) {
			return <AccountLayout>{this.props.children}</AccountLayout>;
		}
		else {
			return <PageLayout>{this.props.children}</PageLayout>;
		}
	}
}

export default ProfileLayout;
