'use strict';

import React, { Component } from 'react';

import { Header, Container, Divider } from 'semantic-ui-react';

import PageLayout from './../../../components/PageLayout/PageLayout';

import { i18n } from './../../../utils/i18n';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		const translator = new i18n('de');

		return (
			<PageLayout>
				<p>
					Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
					massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
					Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis
					enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
					imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede link mollis pretium. Integer
					tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo
					ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra
					quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean
					imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
				</p>
				<p>{translator.GetMessage('home')}</p>
			</PageLayout>
		);
	}
}

export default Home;
