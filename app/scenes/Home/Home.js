'use strict';

import React, { Component } from 'react';

import Header from './../../components/Header/Header';
import Footer from './../../components/Footer/Footer';

class Home extends Component {
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
						<h2>botany-bay</h2>

						<p>Welcome to botany-bay...</p>
					</main>
					{/*<nav className="page-left">NAV</nav>*/}
					{/*<aside className="page-right">ADS</aside>*/}
				</div>
				<Footer />
			</div>
		);
	}
}

export default Home;
