(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Header = require('./components/Header/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Footer = require('./components/Footer/Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'main',
				{ className: 'page' },
				_react2.default.createElement(_Header2.default, null),
				_react2.default.createElement(
					'div',
					{ className: 'content' },
					this.props.children
				),
				_react2.default.createElement(_Footer2.default, null)
			);
		}
	}]);

	return App;
}(_react.Component);

exports.default = App;
});

require.register("components/Footer/Footer.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_Component) {
	_inherits(Footer, _Component);

	function Footer(props) {
		_classCallCheck(this, Footer);

		var _this = _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'footer',
				null,
				_react2.default.createElement('hr', null),
				_react2.default.createElement(
					'p',
					{ id: 'copyright' },
					'shipyard \xA9 2019 by ',
					_react2.default.createElement(
						'a',
						{ href: 'mailto:frickreich@gmail.com' },
						'F. Rick Reich'
					)
				)
			);
		}
	}]);

	return Footer;
}(_react.Component);

exports.default = Footer;
});

require.register("components/Header/Header.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
	_inherits(Header, _Component);

	function Header(props) {
		_classCallCheck(this, Header);

		var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Header, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'header',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Header'
				),
				_react2.default.createElement(
					'nav',
					null,
					_react2.default.createElement(
						'ul',
						null,
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								_reactRouterDom.NavLink,
								{ exact: true, to: '/' },
								_react2.default.createElement(
									'p',
									null,
									'Home'
								)
							)
						),
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								_reactRouterDom.NavLink,
								{ exact: true, to: '/dashboard' },
								_react2.default.createElement(
									'p',
									null,
									'Dashboard'
								)
							)
						),
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								_reactRouterDom.NavLink,
								{ exact: true, to: '/asdf' },
								_react2.default.createElement(
									'p',
									null,
									'Error'
								)
							)
						)
					)
				)
			);
		}
	}]);

	return Header;
}(_react.Component);

exports.default = Header;
});

require.register("components/LoadingScreen/LoadingScreen.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingScreen = function (_Component) {
	_inherits(LoadingScreen, _Component);

	function LoadingScreen(props) {
		_classCallCheck(this, LoadingScreen);

		return _possibleConstructorReturn(this, (LoadingScreen.__proto__ || Object.getPrototypeOf(LoadingScreen)).call(this, props));
	}

	_createClass(LoadingScreen, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'loading-screen' },
				_react2.default.createElement('div', { className: 'spinner' })
			);
		}
	}]);

	return LoadingScreen;
}(_react.Component);

exports.default = LoadingScreen;
});

require.register("components/Notification/Notification.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadingScreen = function (_Component) {
	_inherits(LoadingScreen, _Component);

	function LoadingScreen(props) {
		_classCallCheck(this, LoadingScreen);

		return _possibleConstructorReturn(this, (LoadingScreen.__proto__ || Object.getPrototypeOf(LoadingScreen)).call(this, props));
	}

	_createClass(LoadingScreen, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'Notification ' + this.props.type },
				this.props.content
			);
		}
	}]);

	return LoadingScreen;
}(_react.Component);

LoadingScreen.defaultProps = {
	type: 'error',
	content: 'Description'
};

exports.default = LoadingScreen;
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = require('react-router-dom');

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./scenes/Home/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Dashboard = require('./scenes/Dashboard/Dashboard');

var _Dashboard2 = _interopRequireDefault(_Dashboard);

var _NotFound = require('./scenes/NotFound/NotFound');

var _NotFound2 = _interopRequireDefault(_NotFound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
	_reactRouterDom.BrowserRouter,
	null,
	_react2.default.createElement(
		_App2.default,
		null,
		_react2.default.createElement(
			_reactRouterDom.Switch,
			null,
			_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Home2.default }),
			_react2.default.createElement(_reactRouterDom.Route, { path: '/dashboard', component: _Dashboard2.default }),
			_react2.default.createElement(_reactRouterDom.Route, { component: _NotFound2.default })
		)
	)
), document.querySelector('#root'));
});

require.register("scenes/Dashboard/Dashboard.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('whatwg-fetch');

var _LoadingScreen = require('./../../components/LoadingScreen/LoadingScreen');

var _LoadingScreen2 = _interopRequireDefault(_LoadingScreen);

var _storage = require('./../../utils/storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dashboard = function (_Component) {
	_inherits(Dashboard, _Component);

	function Dashboard(props) {
		_classCallCheck(this, Dashboard);

		var _this = _possibleConstructorReturn(this, (Dashboard.__proto__ || Object.getPrototypeOf(Dashboard)).call(this, props));

		_this.state = {
			isLoading: true,
			token: '',
			signUpError: '',
			signInError: '',
			email: '',
			password: '',
			userData: []
		};

		_this.onTextboxChangeSignUpEmail = _this.onTextboxChangeSignUpEmail.bind(_this);
		_this.onTextboxChangeSignUpPassword = _this.onTextboxChangeSignUpPassword.bind(_this);

		_this.onSignIn = _this.onSignIn.bind(_this);
		_this.onSignUp = _this.onSignUp.bind(_this);

		_this.logout = _this.logout.bind(_this);
		return _this;
	}

	_createClass(Dashboard, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this2 = this;

			var obj = (0, _storage.getFromStorage)('gandhi');

			if (obj && obj.token) {
				var token = obj.token;

				// Verify token

				fetch('/api/account/verify?token=' + token).then(function (res) {
					return res.json();
				}).then(function (json) {
					if (json.success) {
						_this2.getUserInfo();

						_this2.setState({
							token: token,
							isLoading: false
						});
					} else {
						_this2.setState({
							isLoading: false,
							userData: []
						});
					}
				});
			} else {
				this.setState({
					isLoading: false
				});
			}
		}
	}, {
		key: 'onTextboxChangeSignUpEmail',
		value: function onTextboxChangeSignUpEmail(event) {
			this.setState({
				email: event.target.value
			});
		}
	}, {
		key: 'onTextboxChangeSignUpPassword',
		value: function onTextboxChangeSignUpPassword(event) {
			this.setState({
				password: event.target.value
			});
		}
	}, {
		key: 'getUserInfo',
		value: function getUserInfo() {
			var _this3 = this;

			var obj = (0, _storage.getFromStorage)('gandhi');

			if (obj && obj.token) {
				var token = obj.token;

				// Verify token

				fetch('/api/account/?id=' + token).then(function (res) {
					return res.json();
				}).then(function (json) {
					console.log(json);

					if (json.success) {
						_this3.setState({
							isLoading: false,
							userData: json.data
						});
					}
				});
			} else {
				this.setState({
					isLoading: false
				});
			}
		}
	}, {
		key: 'logout',
		value: function logout() {
			var _this4 = this;

			this.setState({
				isLoading: true
			});

			var obj = (0, _storage.getFromStorage)('gandhi');

			if (obj && obj.token) {
				var token = obj.token;

				// Verify token

				fetch('/api/account/logout?token=' + token).then(function (res) {
					return res.json();
				}).then(function (json) {
					if (json.success) {
						localStorage.removeItem('gandhi');

						_this4.setState({
							token: '',
							isLoading: false
						});
					} else {
						_this4.setState({
							isLoading: false
						});
					}
				});
			} else {
				this.setState({
					isLoading: false
				});
			}
		}
	}, {
		key: 'onSignIn',
		value: function onSignIn() {
			var _this5 = this;

			var _state = this.state,
			    email = _state.email,
			    password = _state.password;


			this.setState({
				isLoading: true
			});

			fetch('/api/account/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				console.log('json', json);

				if (json.success) {
					(0, _storage.setInStorage)('gandhi', { token: json.token });

					_this5.getUserInfo();

					_this5.setState({
						signInError: json.message,
						isLoading: false,
						email: '',
						password: '',
						token: json.token
					});
				} else {
					_this5.setState({
						signInError: json.message,
						isLoading: false
					});
				}
			});
		}
	}, {
		key: 'onSignUp',
		value: function onSignUp() {
			var _this6 = this;

			// Grab state
			var _state2 = this.state,
			    email = _state2.email,
			    password = _state2.password;


			this.setState({
				isLoading: true
			});

			// Post request to backend
			fetch('/api/account/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			}).then(function (res) {
				return res.json();
			}).then(function (json) {
				console.log('json', json);

				if (json.success) {
					_this6.setState({
						signUpError: json.message,
						isLoading: false,
						email: '',
						password: ''
					});
				} else {
					_this6.setState({
						signUpError: json.message,
						isLoading: false
					});
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _state3 = this.state,
			    isLoading = _state3.isLoading,
			    token = _state3.token,
			    signInError = _state3.signInError,
			    email = _state3.email,
			    password = _state3.password,
			    signUpError = _state3.signUpError,
			    userData = _state3.userData;


			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h1',
					null,
					'Dashboard'
				),
				_react2.default.createElement(
					'p',
					null,
					'this is the dashboard...'
				),
				signInError ? _react2.default.createElement(
					'p',
					null,
					signInError
				) : null,
				signUpError ? _react2.default.createElement(
					'p',
					null,
					signUpError
				) : null,
				_react2.default.createElement(
					'section',
					null,
					token ? _react2.default.createElement(
						'div',
						null,
						isLoading ? _react2.default.createElement(_LoadingScreen2.default, null) : _react2.default.createElement(
							'div',
							null,
							_react2.default.createElement(
								'p',
								null,
								'Account'
							),
							_react2.default.createElement(
								'p',
								null,
								'email: ',
								userData.email
							),
							_react2.default.createElement(
								'p',
								null,
								'created: ',
								userData.signUpDate
							),
							_react2.default.createElement(
								'button',
								{ onClick: this.logout },
								'Logout'
							)
						)
					) : _react2.default.createElement(
						'div',
						null,
						_react2.default.createElement('input', {
							type: 'email',
							placeholder: 'Email',
							value: email,
							onChange: this.onTextboxChangeSignUpEmail
						}),
						_react2.default.createElement('br', null),
						_react2.default.createElement('input', {
							type: 'password',
							placeholder: 'Password',
							value: password,
							onChange: this.onTextboxChangeSignUpPassword
						}),
						_react2.default.createElement('br', null),
						_react2.default.createElement(
							'button',
							{ onClick: this.onSignUp },
							'Sign Up'
						),
						_react2.default.createElement(
							'button',
							{ onClick: this.onSignIn },
							'Sign In'
						)
					)
				)
			);
		}
	}]);

	return Dashboard;
}(_react.Component);

exports.default = Dashboard;
});

require.register("scenes/Home/Home.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home(props) {
		_classCallCheck(this, Home);

		var _this = _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(Home, [{
		key: 'componentDidMount',
		value: function componentDidMount() {}
	}, {
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'shipyard'
				),
				_react2.default.createElement(
					'p',
					null,
					'Welcome to shipyard...'
				)
			);
		}
	}]);

	return Home;
}(_react.Component);

exports.default = Home;
});

require.register("scenes/NotFound/NotFound.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouterDom = require('react-router-dom');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotFound = function (_Component) {
	_inherits(NotFound, _Component);

	function NotFound(props) {
		_classCallCheck(this, NotFound);

		var _this = _possibleConstructorReturn(this, (NotFound.__proto__ || Object.getPrototypeOf(NotFound)).call(this, props));

		_this.state = {};
		return _this;
	}

	_createClass(NotFound, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				null,
				_react2.default.createElement(
					'h2',
					null,
					'404 - Page not found'
				),
				_react2.default.createElement(
					_reactRouterDom.Link,
					{ to: '/' },
					'Go home!'
				)
			);
		}
	}]);

	return NotFound;
}(_react.Component);

exports.default = NotFound;
});

require.register("utils/storage.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getFromStorage = getFromStorage;
exports.setInStorage = setInStorage;
function getFromStorage(key) {
	if (!key) {
		return null;
	}

	try {
		var valueStr = localStorage.getItem(key);

		if (valueStr) {
			return JSON.parse(valueStr);
		}

		return null;
	} catch (err) {
		return null;
	}
}

function setInStorage(key, obj) {
	if (!key) {
		console.error('Error: Key is missing');
	}

	try {
		localStorage.setItem(key, JSON.stringify(obj));
	} catch (err) {
		console.error(err);
	}
}
});

;require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map