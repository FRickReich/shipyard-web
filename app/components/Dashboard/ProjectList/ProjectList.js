'use strict';

import React, { Component } from 'react';

import { Button, Segment, Header, Icon } from 'semantic-ui-react';

class ProjectList extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		//const {  } = this.state;

		return (
			<Segment placeholder>
				<Header textAlign="center">You do not have any projects yet</Header>
			</Segment>
		);
	}
}

export default ProjectList;
