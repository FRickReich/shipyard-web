'use strict';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div className="header">
				<a href="#default" className="logo">
					[LOGO]
				</a>
				<div className="header-right">
					<NavLink exact to="/">
						<p>Home</p>
					</NavLink>
					<NavLink exact to="/dashboard">
						<p>Dashboard</p>
					</NavLink>
					<NavLink exact to="/asdf">
						<p>Error</p>
					</NavLink>
				</div>
			</div>
		);
	}
}

export default Header;
