'use strict';

import { Link } from 'react-router-dom';
import React, { Component } from 'react';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

class NotFound extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="page">
				<Header />
				<div className="page-body">
					<main className="page-content">
						<h2>404 - Page not found</h2>
						<Link to="/">Go home!</Link>
					</main>
				</div>
				<Footer />
			</div>
		);
	}
}

export default NotFound;
