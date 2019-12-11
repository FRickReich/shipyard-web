'use strict';

import React, { Component } from 'react';

class LoadingScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="loading-screen">
				<div className="loader" />
			</div>
		);
	}
}

export default LoadingScreen;
