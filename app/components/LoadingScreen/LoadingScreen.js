'use strict';

import React, { Component } from 'react';

import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

class LoadingScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Segment basic className="LoadingScreen">
				<Dimmer active inverted>
					<Loader size="huge">Loading</Loader>
				</Dimmer>
			</Segment>
		);
	}
}

export default LoadingScreen;
