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
				<p id="copyright">
					shipyard © 2019 - {new Date().getFullYear()} by
					<a href="mailto:frickreich@gmail.com">F. Rick Reich</a>
				</p>
			</footer>
		);
	}
}

export default Footer;
