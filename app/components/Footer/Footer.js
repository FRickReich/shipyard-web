'use strict';

import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';

import { Container, Segment } from 'semantic-ui-react';

class Footer extends Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<Segment className="footer" inverted vertical style={{ padding: '5em 0em' }}>
				<Container textAlign="center">
					<p id="copyright">botany-bay.com © 2019 - {new Date().getFullYear()}</p>
				</Container>
			</Segment>
		);
	}
}

export default Footer;

/*
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
*/
