'use strict';

import React, { Component } from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<main className="page">
				<Header />
				<div className="content">{this.props.children}</div>
				<Footer />
			</main>
		);
	}
}

export default App;
