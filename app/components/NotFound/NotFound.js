'use strict';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class NotFound extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<h2>404 - Page not found</h2>
				<Link to="/">Go home!</Link>
			</div>
		);
	}
}

export default NotFound;
