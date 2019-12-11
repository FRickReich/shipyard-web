'use strict';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<footer>
				<hr />
				<p id="copyright">This is the copyright line...</p>
			</footer>
		);
	}
}

export default Footer;
