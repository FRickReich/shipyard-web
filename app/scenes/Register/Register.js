'use strict';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="page">
				<div className="page-body">
					<main className="page-content">
						<h2>Register new Account</h2>
					</main>
				</div>
			</div>
		);
	}
}

export default Register;
