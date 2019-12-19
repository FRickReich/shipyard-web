'use strict';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import PageHeader from '../../components/PageHeader/PageHeader';
import PageFooter from '../../components/PageFooter/PageFooter';

class NotFound extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="page">
				<PageHeader />
				<div className="page-body">
					<main className="page-content">
						<h2>404 - Page not found</h2>
						<Link to="/">Go home!</Link>
					</main>
				</div>
				<PageFooter />
			</div>
		);
	}
}

export default NotFound;
