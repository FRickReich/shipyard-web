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
			<footer className="Footer">
				<div className="footer-right">
					{/*
                    <a href="#">
						<i class="fa fa-facebook" />
					</a>
					<a href="#">
						<i class="fa fa-twitter" />
					</a>
					<a href="#">
						<i class="fa fa-github" />
                    </a>
                    */}
				</div>
				<div className="footer-left">
					<p className="footer-links">
						<a href="#">Home</a>
						·
						<a href="#">Dashboard</a>
						·
						<a href="#">Error</a>
					</p>

					<p id="copyright">botany-bay.com © 2019 - {new Date().getFullYear()}</p>
				</div>
			</footer>
		);
	}
}

export default Footer;
