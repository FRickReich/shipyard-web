'use strict';

import React, { Component } from 'react';

class LoadingScreen extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className={`Notification ${this.props.type}`}>{this.props.content}</div>;
	}
}

LoadingScreen.defaultProps = {
	type: 'error',
	content: 'Description'
};

export default LoadingScreen;
