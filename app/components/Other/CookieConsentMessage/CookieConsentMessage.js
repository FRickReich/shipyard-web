'use strict';

import React, { Component } from 'react';

import { Button, Message } from 'semantic-ui-react';

import { setInStorage, getFromStorage } from './../../utils/storage';

class CookieConsentMessage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: true
		};
	}

	componentDidMount() {
		const cookie = getFromStorage('cookie-consent');

		if (cookie) {
			const { dismissed } = cookie;

			if (dismissed == true) {
				this.setState({ visible: false });
			}
		}
	}

	handleDismiss() {
		this.setState({ visible: false });

		setInStorage('cookie-consent', { dismissed: true, date: Date.now() });
	}

	render() {
		const { visible } = this.state;

		return (
			<Message hidden={visible ? false : true} className="CookieConsentMessage">
				We use cookies to ensure you the best experience. By using our website you agree to our Cookie Policy.
				<Button floated="right" basic onClick={this.handleDismiss.bind(this)} color="black">
					Ok. understood
				</Button>
			</Message>
		);
	}
}

export default CookieConsentMessage;
