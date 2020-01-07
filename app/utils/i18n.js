'use strict';

const fs = require('fs');
const path = require('path');

class i18n {
	constructor(language = 'en') {
		this.language = language;
	}

	GetMessage(messageLocation) {
		return this.language;
	}
}

module.exports = {
	i18n
};
