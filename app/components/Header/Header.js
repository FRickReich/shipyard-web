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
			<header>
				<h1>Header</h1>
				<nav>
					<ul>
						<li>
							<NavLink exact to="/">
								<p>Home</p>
							</NavLink>
						</li>
						<li>
							<NavLink exact to="/dashboard">
								<p>Dashboard</p>
							</NavLink>
						</li>
						<li>
							<NavLink exact to="/asdf">
								<p>Error</p>
							</NavLink>
						</li>
					</ul>
				</nav>
			</header>
		);
	}
}

export default Header;
