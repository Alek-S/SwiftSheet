!(function(e) {
	function t(t) {
		for (
			var o, l, i = t[0], d = t[1], s = t[2], c = 0, f = [];
			c < i.length;
			c++
		)
			(l = i[c]), a[l] && f.push(a[l][0]), (a[l] = 0);
		for (o in d) Object.prototype.hasOwnProperty.call(d, o) && (e[o] = d[o]);
		for (u && u(t); f.length; ) f.shift()();
		return n.push.apply(n, s || []), r();
	}
	function r() {
		for (var e, t = 0; t < n.length; t++) {
			for (var r = n[t], o = !0, i = 1; i < r.length; i++) {
				var d = r[i];
				0 !== a[d] && (o = !1);
			}
			o && (n.splice(t--, 1), (e = l((l.s = r[0]))));
		}
		return e;
	}
	var o = {},
		a = { 0: 0 },
		n = [];
	function l(t) {
		if (o[t]) return o[t].exports;
		var r = (o[t] = { i: t, l: !1, exports: {} });
		return e[t].call(r.exports, r, r.exports, l), (r.l = !0), r.exports;
	}
	(l.m = e),
		(l.c = o),
		(l.d = function(e, t, r) {
			l.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
		}),
		(l.r = function(e) {
			'undefined' != typeof Symbol &&
				Symbol.toStringTag &&
				Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
				Object.defineProperty(e, '__esModule', { value: !0 });
		}),
		(l.t = function(e, t) {
			if ((1 & t && (e = l(e)), 8 & t)) return e;
			if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if (
				(l.r(r),
				Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
				2 & t && 'string' != typeof e)
			)
				for (var o in e)
					l.d(
						r,
						o,
						function(t) {
							return e[t];
						}.bind(null, o)
					);
			return r;
		}),
		(l.n = function(e) {
			var t =
				e && e.__esModule
					? function() {
							return e.default;
					  }
					: function() {
							return e;
					  };
			return l.d(t, 'a', t), t;
		}),
		(l.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t);
		}),
		(l.p = '');
	var i = (window.webpackJsonp = window.webpackJsonp || []),
		d = i.push.bind(i);
	(i.push = t), (i = i.slice());
	for (var s = 0; s < i.length; s++) t(i[s]);
	var u = d;
	n.push([195, 1]), r();
})({
	145: function(e, t, r) {
		'use strict';
		(function(e) {
			var o;
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(o = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).enterModule) && o(e);
			var a,
				n,
				l = (t.HISTORY = 'history'),
				i = (t.addToHistory = function(e) {
					var t = JSON.parse(localStorage.getItem(l)),
						r = t;
					if (
						((!t || t.length < 5) && (r ? r.push(e) : (r = [e])),
						t && t.length >= 5 && !t.includes(e))
					) {
						for (; t.length > 4; ) t.shift();
						r.push(e);
					}
					localStorage.setItem(
						l,
						JSON.stringify(
							[].concat(
								(function(e) {
									if (Array.isArray(e)) {
										for (var t = 0, r = Array(e.length); t < e.length; t++)
											r[t] = e[t];
										return r;
									}
									return Array.from(e);
								})(new Set(r))
							)
						)
					);
				}),
				d = (t.removeFromHistory = function(e) {
					var t = JSON.parse(localStorage.getItem(l)),
						r = t && t.length && t.indexOf(e),
						o = t;
					null !== r &&
						r > -1 &&
						(o.splice(r, 1),
						o.length > 0 ? localStorage.setItem(l, JSON.stringify(o)) : u());
				}),
				s = (t.getHistory = function() {
					return JSON.parse(localStorage.getItem(l));
				}),
				u = (t.clearHistory = function() {
					localStorage.removeItem(l);
				});
			(a = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).default) &&
				(a.register(
					5,
					'MAX_HISTORY',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js'
				),
				a.register(
					l,
					'HISTORY',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js'
				),
				a.register(
					i,
					'addToHistory',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js'
				),
				a.register(
					d,
					'removeFromHistory',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js'
				),
				a.register(
					s,
					'getHistory',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js'
				),
				a.register(
					u,
					'clearHistory',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js'
				)),
				(n = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && n(e);
		}.call(this, r(16)(e)));
	},
	195: function(e, t, r) {
		'use strict';
		(function(e) {
			var t,
				o = c(r(3)),
				a = c(r(74)),
				n = r(23),
				l = c(r(282)),
				i = r(101),
				d = r(42),
				s = c(r(214)),
				u = c(r(216));
			function c(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(t = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && t(e);
			var f,
				p,
				h = new l.default({ uri: 'http://localhost:5000/graphql' }),
				m = function() {
					return o.default.createElement(
						i.ApolloProvider,
						{ client: h },
						o.default.createElement(
							d.BrowserRouter,
							null,
							o.default.createElement(
								n.ThemeProvider,
								{ theme: s.default },
								o.default.createElement(u.default, null)
							)
						)
					);
				};
			a.default.render(
				o.default.createElement(m, null),
				document.getElementById('app')
			),
				(f = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(f.register(
						h,
						'client',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/root.js'
					),
					f.register(
						m,
						'Root',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/root.js'
					)),
				(p = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && p(e);
		}.call(this, r(16)(e)));
	},
	214: function(e, t, r) {
		'use strict';
		(function(e) {
			var o;
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(o = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).enterModule) && o(e);
			var a,
				n,
				l = {
					boxShadowLight: '0px 5px 40px -5px rgba(0,0,0,0.15)',
					boxShadow: '0px 5px 40px -5px rgba(0,0,0,0.3)',
					boxShadowDark: '0px 5px 40px -2px rgba(0,0,0,0.5)',
					color: {
						background: '#fafafa',
						backgroundDark: '#EAEAEA',
						backgroundDarkest: '#BCBCBC',
						border: '#d9d9d9',
						text: '#404040',
						lightText: '#848484',
						input: '#F1F3F4',
						red: '#ED5050',
						lightRed: '#FF8D8D',
						green: '#D8E13F',
						vividGreen: '#E3FC52',
						blue: '#46C8F5',
						lightBlue: '#97E4FF',
						darkBlue: '#2E8AA8',
						aqua: '#68F6BA',
						orange: '#ffbf80',
					},
					gradient: {
						light:
							'linear-gradient(to bottom, #ffffff 0%, #f6f6f6 47%, #ededed 100%)',
						red: 'linear-gradient(to bottom, #f07878 0%, #ED5050 100%)',
						lightRed: 'linear-gradient(to bottom, #f39191 0%, #ef6262 100%)',
						green: 'linear-gradient(to bottom, #D8E13F 0%, #BFC644 100%)',
						greenBlue: ' linear-gradient(160deg, #57DACB 0%, #55A2ED 100%)',
					},
					font: {
						header: "'Poiret One', cursive",
						main: "'Quicksand', sans-serif",
					},
				},
				i = l;
			(t.default = i),
				(a = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(a.register(
						l,
						'theme',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/theme.js'
					),
					a.register(
						i,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/theme.js'
					)),
				(n = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && n(e);
		}.call(this, r(16)(e)));
	},
	216: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = h(r(3)),
				n = r(5),
				l = r(42),
				i = h(r(217)),
				d = h(r(218)),
				s = h(r(219)),
				u = h(r(222)),
				c = h(r(225)),
				f = h(r(228)),
				p = h(r(280));
			function h(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var m,
				g,
				b = function(e) {
					e.match;
					return a.default.createElement(
						p.default,
						null,
						a.default.createElement(i.default, null),
						a.default.createElement(
							l.Switch,
							null,
							a.default.createElement(l.Route, {
								exact: !0,
								path: '/',
								component: s.default,
							}),
							a.default.createElement(l.Route, {
								path: '/upload',
								component: u.default,
							}),
							a.default.createElement(l.Route, {
								path: '/view',
								component: c.default,
							}),
							a.default.createElement(l.Route, {
								path: '/:sheetId',
								component: f.default,
							})
						),
						a.default.createElement(d.default, null)
					);
				},
				w = (0, n.hot)(e)(b);
			(t.default = w),
				(m = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(m.register(
						b,
						'App',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/App.js'
					),
					m.register(
						w,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/App.js'
					)),
				(g = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && g(e);
		}.call(this, r(16)(e)));
	},
	217: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = (function() {
					return function(e, t) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e))
							return (function(e, t) {
								var r = [],
									o = !0,
									a = !1,
									n = void 0;
								try {
									for (
										var l, i = e[Symbol.iterator]();
										!(o = (l = i.next()).done) &&
										(r.push(l.value), !t || r.length !== t);
										o = !0
									);
								} catch (e) {
									(a = !0), (n = e);
								} finally {
									try {
										!o && i.return && i.return();
									} finally {
										if (a) throw n;
									}
								}
								return r;
							})(e, t);
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance'
						);
					};
				})(),
				n = r(3),
				l = u(n),
				i = u(r(23)),
				d = u(r(26)),
				s = r(42);
			function u(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var c,
				f,
				p = function(e) {
					var t = (0, n.useState)('large'),
						r = a(t, 2),
						o = r[0],
						i = r[1];
					(0, n.useEffect)(function() {
						return (
							window.addEventListener('scroll', d),
							function() {
								window.removeEventListener('scroll', d);
							}
						);
					});
					var d = function() {
						var e = document.documentElement.scrollTop;
						e > 50 && 'small' !== o
							? i('small')
							: e <= 50 && 'large' !== o && i('large');
					};
					return l.default.createElement(
						h,
						{ className: o },
						l.default.createElement(
							s.Link,
							{ to: '/' },
							l.default.createElement('img', {
								src: './assets/images/logo.svg',
								alt: 'logo',
							}),
							' ',
							l.default.createElement('h1', null, 'SwiftSheet')
						),
						l.default.createElement(
							b,
							{ className: 'tagline' },
							l.default.createElement(
								'h2',
								null,
								'Fast and ephemeral data sharing.'
							)
						),
						l.default.createElement(
							m,
							{ className: o },
							l.default.createElement(g, { to: '/upload' }, 'Upload'),
							l.default.createElement(g, { to: '/view' }, 'View')
						)
					);
				},
				h = (0, i.default)(d.default).withConfig({
					displayName: 'Header__Nav',
					componentId: 'sc-10rcavb-0',
				})(
					[
						'position:fixed;border-bottom:solid 1px ',
						';padding:0.8rem;transition:all 0.3s;width:100%;z-index:50;a{text-decoration:none;}& img,h1{display:inline;transition:all 0.3s;}& img{height:50px;}& h1{font-family:',
						';font-size:2.5rem;letter-spacing:4px;margin-left:0.5rem;position:relative;top:-0.7rem;color:',
						';}&.small{padding:0.4rem;padding-left:0.8rem;padding-bottom:0.15rem;img{height:25px;}h1{font-size:1.5rem;top:-0.3rem;}.tagline{display:none;}}',
					],
					function(e) {
						return e.theme.color.border;
					},
					function(e) {
						return e.theme.font.header;
					},
					function(e) {
						return e.theme.color.text;
					}
				),
				m = i.default.ul.withConfig({
					displayName: 'Header__NavSection',
					componentId: 'sc-10rcavb-1',
				})([
					'position:absolute;top:1.75rem;right:2rem;transition:all 0.3s;&.small{top:0.6rem;}&.small *{font-size:1rem;}',
				]),
				g = (0, i.default)(s.NavLink).withConfig({
					displayName: 'Header__StyledNavLink',
					componentId: 'sc-10rcavb-2',
				})(
					[
						'font-size:1.25rem;color:',
						';padding-right:2rem;padding-left:2rem;transition:all 0.3s;border-left:solid 1px ',
						';&.active{font-weight:500;color:',
						';}@media (max-width:550px){&{font-size:1.1rem;padding-right:1rem;padding-left:1rem;}}',
					],
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.color.border;
					},
					function(e) {
						return e.theme.color.red;
					}
				),
				b = i.default.div.withConfig({
					displayName: 'Header__Tagline',
					componentId: 'sc-10rcavb-3',
				})(
					[
						'color:',
						';position:absolute;display:inline-block;margin-left:2rem;margin-top:0.5rem;padding:0.75rem 2rem;border-left:solid 1px ',
						';@media (max-width:835px){&{display:none;}}',
					],
					function(e) {
						return e.theme.color.lightText;
					},
					function(e) {
						return e.theme.color.border;
					}
				),
				w = p;
			(t.default = w),
				(c = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(c.register(
						p,
						'Header',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js'
					),
					c.register(
						h,
						'Nav',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js'
					),
					c.register(
						m,
						'NavSection',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js'
					),
					c.register(
						g,
						'StyledNavLink',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js'
					),
					c.register(
						b,
						'Tagline',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js'
					),
					c.register(
						w,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js'
					)),
				(f = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && f(e);
		}.call(this, r(16)(e)));
	},
	218: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = d);
			var o,
				a = i(r(3)),
				n = i(r(23)),
				l = i(r(26));
			function i(e) {
				return e && e.__esModule ? e : { default: e };
			}
			function d() {
				return a.default.createElement(
					c,
					null,
					'Created by',
					' ',
					a.default.createElement(
						'a',
						{
							href: 'https://www.alekshnayder.com/',
							target: '_blank',
							rel: 'noopener',
						},
						'Alek Shnayder'
					)
				);
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var s,
				u,
				c = (0, n.default)(l.default).withConfig({
					displayName: 'Footer__Styledfooter',
					componentId: 'd380t0-0',
				})(
					[
						'box-sizing:border-box;padding:1rem;padding-top:1.25rem;text-align:center;width:100%;& a{color:',
						';}',
					],
					function(e) {
						return e.theme.color.text;
					}
				);
			(s = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).default) &&
				(s.register(
					d,
					'Footer',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Footer/Footer.js'
				),
				s.register(
					c,
					'Styledfooter',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Footer/Footer.js'
				)),
				(u = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && u(e);
		}.call(this, r(16)(e)));
	},
	219: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = u(r(3)),
				n = u(r(23)),
				l = u(r(26)),
				i = u(r(220)),
				d = r(221),
				s = r(42);
			function u(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var c,
				f,
				p = function() {
					return a.default.createElement(
						'div',
						null,
						a.default.createElement(h, null),
						a.default.createElement(
							m,
							null,
							a.default.createElement('img', {
								src: './assets/images/logo-sheet.svg',
								alt: 'logo',
								height: '150',
							}),
							'Quickly share an online spreadsheet or API endpoint, then make it go away.'
						),
						a.default.createElement(i.default, null),
						a.default.createElement(
							g,
							null,
							a.default.createElement(
								d.IllustratedStep,
								{
									step: 1,
									graphicPath: './assets/images/upload-simple.svg',
									header: 'Upload a CSV File & Set Expiration Time',
								},
								'Go to ',
								a.default.createElement(s.NavLink, { to: '/upload' }, 'Upload'),
								' section and drag a file into the upload area. From there',
								' ',
								a.default.createElement(
									'span',
									{ className: 'highlight' },
									'set how long until the sheet expires'
								),
								', if the sheet has a header, and an optional password.'
							),
							a.default.createElement(
								d.IllustratedStep,
								{
									step: 2,
									graphicPath: './assets/images/share.svg',
									header: 'Get a Shareable Link or API Endpoint',
								},
								'Once Uploaded, share the',
								' ',
								a.default.createElement(
									'span',
									{ className: 'highlight' },
									'link to an interactive spreadsheet'
								),
								' ',
								'with filtering and sorting. Additionally, for the developer crowd, get temporary API',
								' ',
								a.default.createElement(
									'span',
									{ className: 'highlight' },
									'endpoints for REST or GraphQL'
								),
								'.'
							),
							a.default.createElement(
								d.IllustratedStep,
								{
									step: 3,
									graphicPath: './assets/images/not-found.svg',
									header: 'The Sheet is Deleted Once Expired',
								},
								'When the sheet reaching the expiration time, it is',
								' ',
								a.default.createElement(
									'span',
									{ className: 'highlight' },
									'automatically deleted from the database'
								),
								', and no longer shareable.'
							)
						)
					);
				},
				h = n.default.div.withConfig({
					displayName: 'FrontPage__HeroImg',
					componentId: 't48di8-0',
				})([
					"background-image:url('assets/images/banner-lg.jpg');height:100vh;background-position:center;background-repeat:no-repeat;background-size:cover;",
				]),
				m = n.default.h3.withConfig({
					displayName: 'FrontPage__StyledHeader',
					componentId: 't48di8-1',
				})(
					[
						'position:absolute;top:100px;font-family:',
						';color:',
						';width:60%;padding-left:2rem;padding-right:0;line-height:145%;font-size:5.5rem;img{position:relative;top:2.8rem;margin-right:1.5rem;}@media (max-height:950px){font-size:4.5rem;img{top:1.5rem;height:100px;}}@media (max-height:800px){font-size:3.5rem;line-height:125%;}@media (max-width:1250px){font-size:4.75rem;img{top:1.5rem;height:100px;}}@media (max-width:900px){font-size:4.2rem;line-height:125%;img{top:1rem;height:80px;}}@media (max-width:800px){font-size:3.5rem;line-height:125%;width:75%;img{top:1rem;height:80px;}}',
					],
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.color.red;
					}
				),
				g = (0, n.default)(l.default).withConfig({
					displayName: 'FrontPage__InfoSection',
					componentId: 't48di8-2',
				})(
					[
						'padding-top:100px;padding-bottom:50px;background-color:',
						";display:flex;flex-direction:column;justify-content:center;&:before{content:'';position:absolute;left:0;top:100%;height:100px;width:100%;transform-origin:0 0;transform:skewY(-2deg);background-color:",
						';}',
					],
					function(e) {
						return e.theme.color.aqua;
					},
					function(e) {
						return e.theme.color.aqua;
					}
				),
				b = p;
			(t.default = b),
				(c = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(c.register(
						p,
						'FrontPage',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js'
					),
					c.register(
						h,
						'HeroImg',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js'
					),
					c.register(
						m,
						'StyledHeader',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js'
					),
					c.register(
						g,
						'InfoSection',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js'
					),
					c.register(
						b,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js'
					)),
				(f = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && f(e);
		}.call(this, r(16)(e)));
	},
	220: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = i(r(3)),
				n = r(23),
				l = i(n);
			function i(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var d,
				s,
				u = function() {
					return a.default.createElement(
						f,
						null,
						a.default.createElement('p', null, 'Scroll Down')
					);
				},
				c = (0, n.keyframes)([
					'0%{opacity:1;}100%{opacity:0;-webkit-transform:translateY(46px);transform:translateY(46px);}',
				]),
				f = l.default.div.withConfig({
					displayName: 'ScrollDownIcon__ScrollDownAnimation',
					componentId: 'sc-1gezo5r-0',
				})(
					[
						'width:40px;height:70px;margin-left:-20px;top:50%;margin-top:-35px;box-shadow:inset 0 0 0 1px ',
						";background-color:rgba(255,255,255,0.5);border-radius:25px;&,&:before{position:absolute;left:50%;top:calc(100vh - 150px);z-index:10;}&:before{content:'';width:8px;height:8px;background:",
						';margin-left:-4px;top:8px;border-radius:4px;-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:scroll;animation-name:',
						';}p{position:relative;bottom:-80px;color:',
						';font-family:',
						';font-size:1rem;font-weight:400;text-align:center;line-height:120%;}',
					],
					function(e) {
						return e.theme.color.red;
					},
					function(e) {
						return e.theme.color.red;
					},
					c,
					function(e) {
						return e.theme.color.red;
					},
					function(e) {
						return e.theme.font.main;
					}
				),
				p = u;
			(t.default = p),
				(d = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(d.register(
						u,
						'ScrollDownIcon',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js'
					),
					d.register(
						c,
						'scrollAnimation',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js'
					),
					d.register(
						f,
						'ScrollDownAnimation',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js'
					),
					d.register(
						p,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js'
					)),
				(s = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && s(e);
		}.call(this, r(16)(e)));
	},
	221: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(t.IllustratedStep = void 0);
			var o,
				a = l(r(3)),
				n = l(r(23));
			function l(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var i,
				d,
				s = function(e) {
					var t = e.header,
						r = e.graphicPath,
						o = (e.body, e.step),
						n = e.children;
					return a.default.createElement(
						u,
						null,
						a.default.createElement('img', {
							src: r,
							alt: 'illustration',
							width: '180',
						}),
						a.default.createElement(
							'header',
							null,
							a.default.createElement(
								'h2',
								null,
								a.default.createElement('span', { className: 'step' }, o),
								' ',
								t
							)
						),
						a.default.createElement('p', null, n)
					);
				},
				u = n.default.section.withConfig({
					displayName: 'IllustratedStep__StyledSection',
					componentId: 'sc-108b0jo-0',
				})(
					[
						'margin:auto;padding-top:4rem;padding-bottom:4rem;img{float:left;margin-right:4rem;}header{padding-top:10px;}h2{font-weight:500;font-size:1.4rem;letter-spacing:1px;line-height:175%;}p{margin-top:1.5rem;margin-left:20.5rem;font-size:1rem;line-height:175%;max-width:600px;}a{color:',
						';}.step{border:solid 1px ',
						';border-radius:40px;padding:0.5rem 1.5rem;font-weight:400;margin-right:0.75rem;}.highlight{color:#333;font-weight:500;}@media (max-width:1200px){width:90%;}@media (max-width:900px){width:98%;p{margin-top:0.5rem;margin-left:12rem;line-height:150%;}}@media (max-width:750px){img{display:block;float:none;width:40%;margin:auto;}p{margin-left:0.5rem;}}',
					],
					function(e) {
						return e.theme.color.red;
					},
					function(e) {
						return e.theme.color.text;
					}
				);
			(t.IllustratedStep = s),
				(i = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(i.register(
						s,
						'IllustratedStep',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/IllustratedStep/IllustratedStep.js'
					),
					i.register(
						u,
						'StyledSection',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/IllustratedStep/IllustratedStep.js'
					)),
				(d = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && d(e);
		}.call(this, r(16)(e)));
	},
	222: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a,
				n,
				l = (function() {
					return function(e, t) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e))
							return (function(e, t) {
								var r = [],
									o = !0,
									a = !1,
									n = void 0;
								try {
									for (
										var l, i = e[Symbol.iterator]();
										!(o = (l = i.next()).done) &&
										(r.push(l.value), !t || r.length !== t);
										o = !0
									);
								} catch (e) {
									(a = !0), (n = e);
								} finally {
									try {
										!o && i.return && i.return();
									} finally {
										if (a) throw n;
									}
								}
								return r;
							})(e, t);
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance'
						);
					};
				})(),
				i = ((o = [
					'\n\tmutation UPLOAD_SHEET($sheetData: JSON!, $expireIn: Int!, $password: String) {\n\t\tcreateSheet(\n\t\t\tsheetData: $sheetData\n\t\t\texpireIn: $expireIn\n\t\t\tpassword: $password\n\t\t) {\n\t\t\t_id\n\t\t}\n\t}\n',
				]),
				(a = [
					'\n\tmutation UPLOAD_SHEET($sheetData: JSON!, $expireIn: Int!, $password: String) {\n\t\tcreateSheet(\n\t\t\tsheetData: $sheetData\n\t\t\texpireIn: $expireIn\n\t\t\tpassword: $password\n\t\t) {\n\t\t\t_id\n\t\t}\n\t}\n',
				]),
				Object.freeze(
					Object.defineProperties(o, { raw: { value: Object.freeze(a) } })
				)),
				d = r(3),
				s = w(d),
				u = w(r(23)),
				c = r(26),
				f = w(c),
				p = w(r(223)),
				h = w(r(76)),
				m = r(101),
				g = r(42),
				b = w(r(224));
			function w(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(n = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && n(e);
			var S,
				y,
				v = (0, h.default)(i),
				x = function() {
					var e = (0, d.useState)(72),
						t = l(e, 2),
						r = t[0],
						o = t[1],
						a = (0, d.useState)(!0),
						n = l(a, 2),
						i = n[0],
						u = n[1],
						c = (0, d.useState)(!0),
						f = l(c, 2),
						h = f[0],
						w = f[1],
						S = (0, d.useState)(!1),
						y = l(S, 2),
						x = y[0],
						L = y[1],
						P = (0, d.useState)(),
						G = l(P, 2),
						j = G[0],
						k = G[1],
						I = (0, d.useState)(''),
						U = l(I, 2),
						M = U[0],
						D = U[1],
						T = (0, d.useState)(!1),
						C = l(T, 2),
						N = C[0],
						O = C[1],
						F = (0, d.useState)(''),
						A = l(F, 2),
						R = A[0],
						z = A[1];
					return s.default.createElement(
						_,
						null,
						s.default.createElement(p.default, {
							firstRowHeader: i,
							expireIn: r,
							setHeader: u,
							password: M,
							setPassword: function(e) {
								var t = (0 !== e.length && e.length < 6) || e.length > 70;
								D(e), O(t);
							},
							setExpireIn: o,
							onDrop: function(e, t) {
								e[0] &&
									e[0].name &&
									e[0].name.indexOf('.csv') + 4 === e[0].name.length &&
									(k(e), w(!1));
							},
							wrongPassword: N,
						}),
						s.default.createElement(
							E,
							{ disableSubmit: h },
							s.default.createElement(
								m.Mutation,
								{
									mutation: v,
									onCompleted: function() {
										L(!0);
									},
								},
								function(e, t) {
									t.loading;
									var o,
										a = t.error,
										n = t.data;
									return (
										a &&
											((o = '⚠️ Woops! Something went wrong.'),
											i && (o += ' You sure first row is a header?'),
											z(o)),
										s.default.createElement(
											'div',
											null,
											(function(e) {
												var t = e && e.createSheet._id;
												if (x)
													return s.default.createElement(g.Redirect, {
														to: '/' + t,
													});
											})(n),
											s.default.createElement('input', {
												type: 'submit',
												onClick: function(t) {
													t.preventDefault(),
														b.default.parse(j[0], {
															header: i,
															download: !0,
															skipEmptyLines: !1,
															complete: function(t) {
																var o = t.data;
																return e({
																	variables: {
																		sheetData: o,
																		expireIn: parseInt(r),
																		password: M,
																	},
																});
															},
														});
												},
												value: 'Upload File',
												disabled: h,
											})
										)
									);
								}
							),
							s.default.createElement(H, { className: R ? 'true' : void 0 }, R)
						)
					);
				},
				_ = (0, u.default)(f.default).withConfig({
					displayName: 'UploadPage__StyledDiv',
					componentId: 'ahg6u5-0',
				})(
					[
						'background-color:',
						';padding-top:7rem;height:calc(100vh - 100px);',
					],
					function(e) {
						return e.theme.color.background;
					}
				),
				E = u.default.form.withConfig({
					displayName: 'UploadPage__StyledForm',
					componentId: 'ahg6u5-1',
				})(
					[
						'display:block;width:60%;margin:auto;text-align:center;margin-top:2rem;label{font-size:1.1rem;}select{font-family:',
						';font-size:1rem;background-color:white;margin-left:0.5rem;margin-right:0.5rem;border:solid 1px ',
						";}input[type='submit']{position:relative;cursor:",
						';color:',
						';display:block;margin:auto;font-family:',
						';font-weight:400;font-size:1.3rem;border:',
						';border-radius:30px;padding:10px 30px;background:',
						';box-shadow:',
						';transition:all 0.5s;&:hover{background:',
						';box-shadow:',
						';}}',
					],
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.color.border;
					},
					function(e) {
						return e.disableSubmit ? 'no-drop' : 'pointer';
					},
					function(e) {
						return e.disableSubmit ? e.theme.color.border : 'white';
					},
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.disableSubmit
							? '2px solid ' + e.theme.color.border
							: 'none';
					},
					function(e) {
						return e.disableSubmit ? 'transparent' : e.theme.gradient.greenBlue;
					},
					function(e) {
						return e.disableSubmit ? '' : e.theme.boxShadow;
					},
					function(e) {
						return e.disableSubmit ? 'transparent' : e.theme.gradient.greenBlue;
					},
					function(e) {
						return e.disableSubmit ? '' : e.theme.boxShadowDark;
					}
				),
				H = (0, u.default)(c.ErrorDialog).withConfig({
					displayName: 'UploadPage__UploadError',
					componentId: 'ahg6u5-2',
				})(['min-width:200px;width:fit-content;margin:auto;margin-top:2rem;']),
				L = x;
			(t.default = L),
				(S = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(S.register(
						v,
						'UPLOAD_SHEET',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js'
					),
					S.register(
						x,
						'UploadPage',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js'
					),
					S.register(
						_,
						'StyledDiv',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js'
					),
					S.register(
						E,
						'StyledForm',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js'
					),
					S.register(
						H,
						'UploadError',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js'
					),
					S.register(
						L,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js'
					)),
				(y = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && y(e);
		}.call(this, r(16)(e)));
	},
	223: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = (function() {
					return function(e, t) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e))
							return (function(e, t) {
								var r = [],
									o = !0,
									a = !1,
									n = void 0;
								try {
									for (
										var l, i = e[Symbol.iterator]();
										!(o = (l = i.next()).done) &&
										(r.push(l.value), !t || r.length !== t);
										o = !0
									);
								} catch (e) {
									(a = !0), (n = e);
								} finally {
									try {
										!o && i.return && i.return();
									} finally {
										if (a) throw n;
									}
								}
								return r;
							})(e, t);
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance'
						);
					};
				})(),
				n = r(3),
				l = f(n),
				i = f(r(23)),
				d = f(r(284)),
				s = f(r(0)),
				u = r(26),
				c = f(u);
			function f(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var p = function(e) {
					var t = e.firstRowHeader,
						r = e.expireIn,
						o = e.setExpireIn,
						i = e.setHeader,
						d = e.password,
						s = e.setPassword,
						u = e.onDrop,
						c = e.wrongPassword,
						f = (0, n.useState)(!1),
						p = a(f, 2),
						S = p[0],
						y = p[1],
						x = (0, n.useState)(''),
						_ = a(x, 2),
						E = _[0],
						H = _[1];
					return l.default.createElement(
						h,
						null,
						l.default.createElement(
							m,
							{
								onDrop: u,
								accept: 'text/csv',
								maxSize: 25e5,
								minSize: 8,
								multiple: !1,
								dragging: S ? 'true' : void 0,
								onDragEnter: function() {
									return y(!0);
								},
								onDragLeave: function() {
									return y(!1);
								},
								onDropRejected: function(e) {
									var t = e[0],
										r = t.size,
										o = t.type;
									H(
										r >= 25e5
											? '⚠️ Woops! Bit too large. Upload limit is currently 2.5MB.'
											: 'text/csv' !== o
											? '⚠️ Woops! Only CSV file types currently supported'
											: '⚠️ Woops! Something went wrong. Check that file is formatted correctly'
									);
								},
							},
							S
								? l.default.createElement('img', {
										src: './assets/images/upload-cloud-darkBlue.svg',
										alt: 'upload-cloud-logo',
								  })
								: l.default.createElement('img', {
										src: './assets/images/upload-cloud-light.svg',
										alt: 'upload-cloud-logo',
								  }),
							l.default.createElement(
								g,
								{ dragging: S },
								S ? 'Drop' : 'Drag',
								' CSV file here'
							)
						),
						l.default.createElement(v, { className: E ? 'true' : void 0 }, E),
						l.default.createElement(
							b,
							{ role: 'form', 'aria-label': 'preferences' },
							l.default.createElement(
								'section',
								{ 'aria-label': 'set password' },
								'Password:',
								l.default.createElement('input', {
									value: d,
									className: c ? c.toString() : void 0,
									onChange: function(e) {
										return s(e.target.value);
									},
									type: 'password',
									placeholder: 'enter password',
									autoComplete: 'new-password',
								})
							),
							l.default.createElement(
								'section',
								{ 'aria-label': 'set expiration' },
								'Expires In:',
								l.default.createElement(
									'select',
									{
										value: r,
										onChange: function(e) {
											e.preventDefault(), o(parseInt(e.target.value));
										},
									},
									l.default.createElement('option', { value: 1 }, '1 Hour'),
									l.default.createElement('option', { value: 4 }, '4 Hours'),
									l.default.createElement('option', { value: 8 }, '8 Hours'),
									l.default.createElement('option', { value: 24 }, '1 Day'),
									l.default.createElement('option', { value: 72 }, '3 Days'),
									l.default.createElement('option', { value: 120 }, '5 Days')
								)
							),
							l.default.createElement(
								'section',
								{ 'aria-label': 'toggle first row header' },
								l.default.createElement(
									w,
									{ active: t },
									l.default.createElement('span', null, 'First Row Header:'),
									l.default.createElement(
										'button',
										{
											onClick: function(e) {
												e.preventDefault(), i(!t);
											},
										},
										t ? 'Yes' : 'No'
									)
								)
							)
						),
						l.default.createElement(
							v,
							{ className: c ? c.toString() : void 0 },
							'⚠️ Check Password Length'
						)
					);
				},
				h = i.default.section.withConfig({
					displayName: 'Filedrop__StyledSection',
					componentId: 'sc-1u7cgvl-0',
				})(['display:flex;flex-direction:column;align-items:center;']),
				m = (0, i.default)(d.default).withConfig({
					displayName: 'Filedrop__StyledDropzone',
					componentId: 'sc-1u7cgvl-1',
				})(
					[
						'background-color:',
						';border:dashed 2px ',
						';border-radius:5px;height:250px;width:70%;margin:auto;margin-top:3rem;img{display:block;height:200px;width:80%;margin:auto;}',
					],
					function(e) {
						return e.dragging ? e.theme.color.blue : '#fff';
					},
					function(e) {
						return e.dragging ? e.theme.color.darkBlue : e.theme.color.border;
					}
				),
				g = (0, i.default)(c.default).withConfig({
					displayName: 'Filedrop__StyledText',
					componentId: 'sc-1u7cgvl-2',
				})(
					[
						'color:',
						';font-size:1.2rem;text-align:center;background-color:transparent;',
					],
					function(e) {
						return e.dragging
							? e.theme.color.darkBlue
							: e.theme.color.lightText;
					}
				),
				b = (0, i.default)(u.Card).withConfig({
					displayName: 'Filedrop__Options',
					componentId: 'sc-1u7cgvl-3',
				})(
					[
						'padding-top:1.75rem;padding-bottom:1.75rem;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-evenly;align-items:center;width:70%;margin:auto;text-align:center;margin-top:3.5rem;input{margin:0 2rem 0 0.25rem;padding-left:1rem;width:140px;font-size:0.9rem;font-weight:400;height:25px;::placeholder{color:',
						';}}select{margin-left:0.25rem;}',
					],
					function(e) {
						return e.theme.color.backgroundDarkest;
					}
				),
				w = i.default.label.withConfig({
					displayName: 'Filedrop__HeaderToggle',
					componentId: 'sc-1u7cgvl-4',
				})(
					[
						'margin-left:2rem;button{color:white;cursor:pointer;outline:none;background:',
						';box-shadow:',
						';border:none;font-family:',
						';font-size:1rem;border-radius:4px;margin-left:1rem;padding-top:5px;padding-bottom:5px;width:70px;}',
					],
					function(e) {
						return e.active
							? e.theme.gradient.greenBlue
							: e.theme.color.backgroundDarkest;
					},
					function(e) {
						return e.active ? e.theme.boxShadow : '';
					},
					function(e) {
						return e.theme.font.main;
					}
				);
			p.propTypes = {
				firstRowHeader: s.default.bool,
				expireIn: s.default.number,
				setExpireIn: s.default.func,
				setHeader: s.default.func,
				password: s.default.string,
				setPassword: s.default.func,
				onDrop: s.default.func,
			};
			var S,
				y,
				v = (0, i.default)(u.ErrorDialog).withConfig({
					displayName: 'Filedrop__UploadError',
					componentId: 'sc-1u7cgvl-5',
				})(['min-width:200px;width:fit-content;margin-top:2rem;']),
				x = p;
			(t.default = x),
				(S = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(S.register(
						p,
						'Filedrop',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						h,
						'StyledSection',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						m,
						'StyledDropzone',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						g,
						'StyledText',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						b,
						'Options',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						w,
						'HeaderToggle',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						v,
						'UploadError',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					),
					S.register(
						x,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js'
					)),
				(y = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && y(e);
		}.call(this, r(16)(e)));
	},
	225: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = s(r(3)),
				n = s(r(23)),
				l = s(r(26)),
				i = s(r(226)),
				d = s(r(227));
			function s(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var u,
				c,
				f = function() {
					return a.default.createElement(
						p,
						null,
						a.default.createElement(d.default, null),
						a.default.createElement(i.default, null)
					);
				},
				p = (0, n.default)(l.default).withConfig({
					displayName: 'ViewPage__StyledDiv',
					componentId: 'wujrxm-0',
				})(
					[
						'padding-top:6rem;background-color:',
						';height:calc(100vh - 80px);display:flex;flex-direction:column;justify-content:center;align-items:center;',
					],
					function(e) {
						return e.theme.color.background;
					}
				),
				h = f;
			(t.default = h),
				(u = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(u.register(
						f,
						'ViewPage',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/ViewPage/ViewPage.js'
					),
					u.register(
						p,
						'StyledDiv',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/ViewPage/ViewPage.js'
					),
					u.register(
						h,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/ViewPage/ViewPage.js'
					)),
				(c = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && c(e);
		}.call(this, r(16)(e)));
	},
	226: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = s(r(3)),
				n = s(r(23)),
				l = r(26),
				i = r(145),
				d = r(42);
			function s(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var u,
				c,
				f = function() {
					var e = (0, i.getHistory)()
						? (0, i.getHistory)().map(function(e, t) {
								return a.default.createElement(
									d.Link,
									{ to: '/' + e, key: e.toString() + '-' + t },
									a.default.createElement('li', null, e)
								);
						  })
						: null;
					return a.default.createElement(
						p,
						null,
						a.default.createElement(
							'header',
							null,
							a.default.createElement('h2', null, 'Recently Viewed Sheets')
						),
						e
							? a.default.createElement('ul', null, e)
							: a.default.createElement(
									'p',
									{ className: 'no-items' },
									'No recently viewed items'
							  )
					);
				},
				p = (0, n.default)(l.Card).withConfig({
					displayName: 'RecentlyViewed__StyledCard',
					componentId: 'o9muk8-0',
				})(
					[
						'padding-left:0px;padding-right:0px;padding-top:0;overflow:hidden;width:90%;max-width:600px;header{background:',
						';padding-top:1rem;padding-bottom:1rem;width:100%;}h2{font-weight:400;text-align:center;color:white;font-size:1.1rem;}.no-items{font-style:italic;padding-top:3rem;padding-bottom:3rem;text-align:center;font-size:0.9rem;color:',
						';}a{text-decoration:none;color:',
						';}li{font-size:0.9rem;color:',
						';padding-left:1.5rem;padding-top:1rem;padding-bottom:1rem;margin:1rem;border-radius:8px;border:1px solid ',
						';text-align:center;transition:all 0.25s;}li:hover{border:1px solid ',
						';background-color:',
						';}',
					],
					function(e) {
						return e.theme.gradient.greenBlue;
					},
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.color.border;
					},
					function(e) {
						return e.theme.color.aqua;
					},
					function(e) {
						return e.theme.color.background;
					}
				),
				h = f;
			(t.default = h),
				(u = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(u.register(
						f,
						'RecentlyViewed',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RecentlyViewed/RecentlyViewed.js'
					),
					u.register(
						p,
						'StyledCard',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RecentlyViewed/RecentlyViewed.js'
					),
					u.register(
						h,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RecentlyViewed/RecentlyViewed.js'
					)),
				(c = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && c(e);
		}.call(this, r(16)(e)));
	},
	227: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = (function() {
					return function(e, t) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e))
							return (function(e, t) {
								var r = [],
									o = !0,
									a = !1,
									n = void 0;
								try {
									for (
										var l, i = e[Symbol.iterator]();
										!(o = (l = i.next()).done) &&
										(r.push(l.value), !t || r.length !== t);
										o = !0
									);
								} catch (e) {
									(a = !0), (n = e);
								} finally {
									try {
										!o && i.return && i.return();
									} finally {
										if (a) throw n;
									}
								}
								return r;
							})(e, t);
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance'
						);
					};
				})(),
				n = r(3),
				l = u(n),
				i = u(r(23)),
				d = r(26),
				s = r(42);
			function u(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var c,
				f,
				p = function() {
					var e = (0, n.useState)(''),
						t = a(e, 2),
						r = t[0],
						o = t[1];
					return l.default.createElement(
						h,
						null,
						l.default.createElement(
							m,
							null,
							l.default.createElement('input', {
								type: 'text',
								placeholder: 'search by sheet ID',
								value: r,
								onChange: function(e) {
									o(e.target.value);
								},
							}),
							l.default.createElement(
								s.Link,
								{ to: '/' + r },
								l.default.createElement(g, null, 'Submit')
							)
						)
					);
				},
				h = (0, i.default)(d.Card).withConfig({
					displayName: 'SearchSheet__StyledCard',
					componentId: 'sc-1cv3p1h-0',
				})(
					[
						'overflow:hidden;width:90%;max-width:600px;margin-bottom:3rem;header{background:',
						';padding-top:1rem;padding-bottom:1rem;width:100%;}h2{font-weight:400;text-align:center;color:white;font-size:1.1rem;}input{box-sizing:border-box;flex-grow:2;height:30px;margin-bottom:0;padding-left:2rem;margin-right:1rem;font-size:0.95rem;::placeholder{color:',
						';}}',
					],
					function(e) {
						return e.theme.gradient.greenBlue;
					},
					function(e) {
						return e.theme.color.backgroundDarkest;
					}
				),
				m = i.default.form.withConfig({
					displayName: 'SearchSheet__StyledForm',
					componentId: 'sc-1cv3p1h-1',
				})([
					'margin:2rem;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;',
				]),
				g = i.default.button.withConfig({
					displayName: 'SearchSheet__SubmitButton',
					componentId: 'sc-1cv3p1h-2',
				})(
					[
						'outline:none;box-sizing:border-box;height:30px;width:100px;border-radius:20px;background:',
						';border:none;color:white;font-family:',
						';font-size:1rem;transition:all 0.5s;&:hover{box-shadow:',
						';}',
					],
					function(e) {
						return e.theme.gradient.greenBlue;
					},
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.boxShadow;
					}
				),
				b = p;
			(t.default = b),
				(c = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(c.register(
						p,
						'SearchSheet',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js'
					),
					c.register(
						h,
						'StyledCard',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js'
					),
					c.register(
						m,
						'StyledForm',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js'
					),
					c.register(
						g,
						'SubmitButton',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js'
					),
					c.register(
						b,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js'
					)),
				(f = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && f(e);
		}.call(this, r(16)(e)));
	},
	228: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(t.GET_SHEET = void 0);
			var o,
				a,
				n,
				l = (function() {
					return function(e, t) {
						if (Array.isArray(e)) return e;
						if (Symbol.iterator in Object(e))
							return (function(e, t) {
								var r = [],
									o = !0,
									a = !1,
									n = void 0;
								try {
									for (
										var l, i = e[Symbol.iterator]();
										!(o = (l = i.next()).done) &&
										(r.push(l.value), !t || r.length !== t);
										o = !0
									);
								} catch (e) {
									(a = !0), (n = e);
								} finally {
									try {
										!o && i.return && i.return();
									} finally {
										if (a) throw n;
									}
								}
								return r;
							})(e, t);
						throw new TypeError(
							'Invalid attempt to destructure non-iterable instance'
						);
					};
				})(),
				i = ((o = [
					'\n\tquery GET_SHEET($sheetId: ID!, $password: String) {\n\t\tsheet(_id: $sheetId, password: $password) {\n\t\t\tsheetData\n\t\t\texpireAt\n\t\t}\n\t}\n',
				]),
				(a = [
					'\n\tquery GET_SHEET($sheetId: ID!, $password: String) {\n\t\tsheet(_id: $sheetId, password: $password) {\n\t\t\tsheetData\n\t\t\texpireAt\n\t\t}\n\t}\n',
				]),
				Object.freeze(
					Object.defineProperties(o, { raw: { value: Object.freeze(a) } })
				)),
				d = r(3),
				s = x(d),
				u = x(r(23)),
				c = r(101),
				f = x(r(76)),
				p = x(r(26)),
				h = x(r(229)),
				m = x(r(243)),
				g = r(276),
				b = r(277),
				w = r(278),
				S = (function(e) {
					if (e && e.__esModule) return e;
					var t = {};
					if (null != e)
						for (var r in e)
							Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
					return (t.default = e), t;
				})(r(279)),
				y = r(145),
				v = r(42);
			function x(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(n = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && n(e);
			var _,
				E,
				H = (t.GET_SHEET = (0, f.default)(i)),
				L = function(e) {
					var t = e.match.params.sheetId,
						r = (0, d.useState)(''),
						o = l(r, 2),
						a = o[0],
						n = o[1];
					return s.default.createElement(
						c.Query,
						{ query: H, variables: { sheetId: t, password: a } },
						function(e) {
							var r = e.loading,
								o = e.error,
								l = e.data;
							if (r) return s.default.createElement(G, null, 'Loading...');
							if (
								o &&
								(o.message.includes(S.noPassword) ||
									o.message.includes(S.wrongPassword))
							) {
								var i = o.message.includes(S.wrongPassword);
								return s.default.createElement(g.PasswordPrompt, {
									password: a,
									setPassword: n,
									wrongPassword: i,
								});
							}
							if (o)
								return (
									(0, y.removeFromHistory)(t),
									s.default.createElement(
										k,
										null,
										s.default.createElement(
											'section',
											null,
											s.default.createElement(
												'p',
												{ className: 'errorMessage' },
												'Sorry, looks like this sheet may have expired.'
											),
											s.default.createElement(
												'p',
												null,
												'Maybe ',
												s.default.createElement(
													v.Link,
													{ to: '/upload' },
													'Upload'
												),
												' a new one, or check recently ',
												s.default.createElement(
													v.Link,
													{ to: '/view' },
													'viewed'
												),
												'.'
											)
										)
									)
								);
							var d = l.sheet,
								u = d.sheetData,
								c = d.expireAt;
							return (
								(0, y.addToHistory)(t),
								s.default.createElement(
									P,
									null,
									s.default.createElement(b.RestExample, {
										host: window.location.origin,
										id: t,
									}),
									s.default.createElement(w.GQLExample, {
										host: window.location.origin,
										id: t,
									}),
									s.default.createElement(
										G,
										null,
										s.default.createElement(
											j,
											null,
											'Sheet Expires on:',
											' ',
											(0, h.default)(c, 'MMM DD, YYYY  @  h:mm aa  (Z [GMT])')
										),
										s.default.createElement(m.default, { data: u })
									)
								)
							);
						}
					);
				},
				P = (0, u.default)(p.default).withConfig({
					displayName: 'SheetPage__WrapperDiv',
					componentId: 'sc-1hklb6l-0',
				})(
					[
						'padding-top:6rem;background-color:',
						';margin-top:0rem;padding-bottom:2rem;width:100%;',
					],
					function(e) {
						return e.theme.color.background;
					}
				),
				G = (0, u.default)(p.default).withConfig({
					displayName: 'SheetPage__StyledDiv',
					componentId: 'sc-1hklb6l-1',
				})(
					[
						'background-color:',
						';padding-bottom:2rem;margin-bottom:0px;width:100%;height:calc(100vh - 140px);',
					],
					function(e) {
						return e.theme.color.background;
					}
				),
				j = u.default.div.withConfig({
					displayName: 'SheetPage__ExpireDiv',
					componentId: 'sc-1hklb6l-2',
				})(['text-align:center;color:', ';margin-top:2rem;'], function(e) {
					return e.theme.color.lightText;
				}),
				k = (0, u.default)(p.default).withConfig({
					displayName: 'SheetPage__ExpiredNotice',
					componentId: 'sc-1hklb6l-3',
				})(
					[
						'background-color:',
						';height:calc(100vh - 55px);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;section{margin-bottom:1rem;background-color:white;padding:2.5rem 4rem;border-radius:8px;box-shadow:',
						';}p{margin:1rem;}a{color:',
						';}',
					],
					function(e) {
						return e.theme.color.background;
					},
					function(e) {
						return e.theme.boxShadowLight;
					},
					function(e) {
						return e.theme.color.blue;
					}
				),
				I = L;
			(t.default = I),
				(_ = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(_.register(
						H,
						'GET_SHEET',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					),
					_.register(
						L,
						'SheetPage',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					),
					_.register(
						P,
						'WrapperDiv',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					),
					_.register(
						G,
						'StyledDiv',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					),
					_.register(
						j,
						'ExpireDiv',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					),
					_.register(
						k,
						'ExpiredNotice',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					),
					_.register(
						I,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js'
					)),
				(E = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && E(e);
		}.call(this, r(16)(e)));
	},
	243: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 });
			var o,
				a = d(r(3)),
				n = d(r(0)),
				l = d(r(23)),
				i = r(244);
			function d(e) {
				return e && e.__esModule ? e : { default: e };
			}
			r(274),
				r(275),
				(o = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).enterModule) && o(e);
			var s = function(e) {
				var t = e.data,
					r = [],
					o = [].concat(
						(function(e) {
							if (Array.isArray(e)) {
								for (var t = 0, r = Array(e.length); t < e.length; t++)
									r[t] = e[t];
								return r;
							}
							return Array.from(e);
						})(t)
					);
				return (
					Object.keys(t[0]).forEach(function(e) {
						r.push({ headerName: e, field: e });
					}),
					a.default.createElement(
						f,
						{ className: 'ag-theme-material' },
						a.default.createElement(i.AgGridReact, {
							columnDefs: r,
							rowData: o,
							defaultColDef: {
								resizable: !0,
								sortable: !0,
								columnDrag: !0,
								filter: !0,
								width: 225,
							},
						})
					)
				);
			};
			s.propTypes = { data: n.default.array.isRequired };
			var u,
				c,
				f = l.default.div.withConfig({
					displayName: 'Table__Styledtable',
					componentId: 'sc-1n1z6me-0',
				})(
					[
						'height:98%;font-family:',
						';font-size:14px;letter-spacing:1px;background-color:white;width:80%;max-width:',
						';margin:auto;margin-top:20px;border:none;box-shadow:',
						';.ag-header-cell-text{font-family:',
						';font-size:14px;}.ag-row-even{background-color:',
						';}.ag-row-hover{background-color:',
						';}.ag-header{background:',
						';color:',
						';& .ag-header-cell{border-right:1px solid ',
						';}& .ag-column-hover{background:',
						';color:',
						';border-bottom:4px solid ',
						';}}.ag-icon-desc,.ag-icon-asc{background-color:',
						';border-radius:10px;position:relative;top:5px;padding:2px;}.ag-icon-filter{border-radius:4px;position:relative;top:5px;}.ag-filter{background:',
						';box-shadow:',
						';font-family:',
						';}.ag-theme-material .ag-filter input[type="text"],.ag-theme-material .ag-filter input[type="date"]{border-bottom:1px solid ',
						';}',
					],
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return 225 * e.children.props.columnDefs.length + 'px';
					},
					function(e) {
						return e.theme.boxShadowLight;
					},
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.color.background;
					},
					function(e) {
						return e.theme.color.lightBlue;
					},
					function(e) {
						return e.theme.gradient.light;
					},
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.color.backgroundDark;
					},
					function(e) {
						return e.theme.gradient.light;
					},
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.color.red;
					},
					function(e) {
						return e.theme.color.blue;
					},
					function(e) {
						return e.theme.gradient.light;
					},
					function(e) {
						return e.theme.boxShadowLight;
					},
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.color.border;
					}
				),
				p = s;
			(t.default = p),
				(u = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(u.register(
						s,
						'Table',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SwiftTable/Table.js'
					),
					u.register(
						f,
						'Styledtable',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SwiftTable/Table.js'
					),
					u.register(
						p,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SwiftTable/Table.js'
					)),
				(c = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && c(e);
		}.call(this, r(16)(e)));
	},
	26: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(t.ApiCard = t.ErrorDialog = t.Card = void 0);
			var o,
				a,
				n = r(23),
				l = (o = n) && o.__esModule ? o : { default: o };
			(a = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && a(e);
			var i,
				d,
				s = l.default.div.withConfig({
					displayName: 'defaultStyle',
					componentId: 'g21vfe-0',
				})(
					[
						'background-color:white;color:',
						';font-family:',
						';font-size:0.9em;',
					],
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.font.main;
					}
				),
				u = (0, l.default)(s).withConfig({
					displayName: 'defaultStyle__Card',
					componentId: 'g21vfe-1',
				})(
					[
						'border-radius:8px;box-shadow:',
						';input{outline:none;color:',
						';font-family:',
						';background-color:',
						';border:1px solid ',
						';border-radius:5rem;transition:all 0.3s;::placeholder{font-size:1rem;font-weight:400;font-style:italic;font-family:',
						';color:',
						';}&:hover{border:solid 1px ',
						';}&:focus,&:active{border:solid 1px ',
						';}&.true{border:1px solid ',
						';}}',
					],
					function(e) {
						return e.theme.boxShadowLight;
					},
					function(e) {
						return e.theme.color.text;
					},
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.color.input;
					},
					function(e) {
						return e.theme.color.input;
					},
					function(e) {
						return e.theme.font.main;
					},
					function(e) {
						return e.theme.color.lightText;
					},
					function(e) {
						return e.theme.color.border;
					},
					function(e) {
						return e.theme.color.blue;
					},
					function(e) {
						return e.theme.color.red;
					}
				),
				c = l.default.div.withConfig({
					displayName: 'defaultStyle__ErrorDialog',
					componentId: 'g21vfe-2',
				})(
					[
						'text-align:center;opacity:0;color:white;padding:0.5rem 1rem;border-radius:5px;background-color:',
						';transition:all 0.3s;&.true{opacity:1;}',
					],
					function(e) {
						return e.theme.color.red;
					}
				),
				f = (0, l.default)(u).withConfig({
					displayName: 'defaultStyle__ApiCard',
					componentId: 'g21vfe-3',
				})(
					[
						'width:500px;padding:1rem;margin:auto;margin-top:1rem;background-color:#424242;color:',
						';a{margin-left:1rem;color:',
						';}.pill{background:',
						';color:white;padding:0.1rem 0.5rem;border-radius:4px;}.pill-secondary{background-color:#595959;color:white;padding:0.1rem 0.5rem;border-radius:4px;}.gql_query{margin-left:0.5rem;color:',
						';}.query_title{margin-top:0.75rem;}',
					],
					function(e) {
						return e.theme.color.backgroundDarkest;
					},
					function(e) {
						return e.theme.color.aqua;
					},
					function(e) {
						return e.theme.gradient.greenBlue;
					},
					function(e) {
						return e.theme.color.backgroundDark;
					}
				),
				p = s;
			(t.default = p),
				(t.Card = u),
				(t.ErrorDialog = c),
				(t.ApiCard = f),
				(i = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					(i.register(
						s,
						'defaultStyle',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js'
					),
					i.register(
						u,
						'Card',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js'
					),
					i.register(
						c,
						'ErrorDialog',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js'
					),
					i.register(
						f,
						'ApiCard',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js'
					),
					i.register(
						p,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js'
					)),
				(d = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && d(e);
		}.call(this, r(16)(e)));
	},
	276: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(t.PasswordPrompt = void 0);
			var o,
				a = d(r(3)),
				n = d(r(23)),
				l = r(26),
				i = d(l);
			function d(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var s,
				u,
				c = (t.PasswordPrompt = function(e) {
					var t = e.password,
						r = e.setPassword,
						o = e.wrongPassword;
					return a.default.createElement(
						f,
						null,
						a.default.createElement(
							p,
							null,
							a.default.createElement('input', {
								type: 'password',
								autoComplete: 'current-password',
								value: t,
								onChange: function(e) {
									var t = e.target.value;
									return r(t);
								},
								className: o ? o.toString() : void 0,
								placeholder: 'Sheet Password',
							})
						),
						a.default.createElement(
							l.ErrorDialog,
							{ className: o ? o.toString() : void 0 },
							'⚠️ Incorrect Password Provided'
						)
					);
				}),
				f = (0, n.default)(i.default).withConfig({
					displayName: 'PasswordPrompt__StyledDiv',
					componentId: 'qt9nqg-0',
				})(
					[
						'background-color:',
						';height:calc(100vh - 55px);display:flex;flex-direction:column;justify-content:center;align-items:center;',
					],
					function(e) {
						return e.theme.color.background;
					}
				),
				p = (0, n.default)(l.Card).withConfig({
					displayName: 'PasswordPrompt__StyledForm',
					componentId: 'qt9nqg-1',
				})([
					'margin-bottom:1rem;padding:2.5rem 4rem;input{height:30px;padding:0.2rem 1.5rem;font-size:1rem;font-weight:300;width:200px;}',
				]);
			(s = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).default) &&
				(s.register(
					c,
					'PasswordPrompt',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/PasswordPrompt/PasswordPrompt.js'
				),
				s.register(
					f,
					'StyledDiv',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/PasswordPrompt/PasswordPrompt.js'
				),
				s.register(
					p,
					'StyledForm',
					'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/PasswordPrompt/PasswordPrompt.js'
				)),
				(u = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && u(e);
		}.call(this, r(16)(e)));
	},
	277: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(t.RestExample = void 0);
			var o,
				a = i(r(3)),
				n = i(r(0)),
				l = r(26);
			function i(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var d,
				s,
				u = function(e) {
					var t = e.host,
						r = e.id;
					return a.default.createElement(
						l.ApiCard,
						null,
						a.default.createElement('span', { className: 'pill' }, 'REST API:'),
						a.default.createElement(
							'a',
							{ href: t + '/api/sheet/' + r, target: '_blank' },
							t,
							'/api/sheet/',
							r
						)
					);
				};
			(u.propTypes = {
				host: n.default.string.isRequired,
				id: n.default.string.isRequired,
			}),
				(t.RestExample = u),
				(d = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					d.register(
						u,
						'RestExample',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RestExample/RestExample.js'
					),
				(s = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && s(e);
		}.call(this, r(16)(e)));
	},
	278: function(e, t, r) {
		'use strict';
		(function(e) {
			Object.defineProperty(t, '__esModule', { value: !0 }),
				(t.GQLExample = void 0);
			var o,
				a = i(r(3)),
				n = i(r(0)),
				l = r(26);
			function i(e) {
				return e && e.__esModule ? e : { default: e };
			}
			(o = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: r(5)
			).enterModule) && o(e);
			var d,
				s,
				u = function(e) {
					var t = e.host,
						r = e.id;
					return a.default.createElement(
						l.ApiCard,
						null,
						a.default.createElement(
							'p',
							null,
							a.default.createElement(
								'span',
								{ className: 'pill' },
								'GraphQL API:'
							),
							a.default.createElement(
								'a',
								{ href: t + '/graphql', target: '_blank' },
								t,
								'/graphql'
							)
						),
						a.default.createElement(
							'p',
							{ className: 'query_title' },
							' ',
							a.default.createElement(
								'span',
								{ className: 'pill-secondary' },
								'Body:'
							),
							a.default.createElement(
								'span',
								{ className: 'gql_query' },
								'{',
								'sheet( _id: "',
								r,
								'" )',
								'{',
								'sheetData',
								'}',
								'}'
							)
						)
					);
				};
			(u.propTypes = {
				host: n.default.string.isRequired,
				id: n.default.string.isRequired,
			}),
				(t.GQLExample = u),
				(d = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).default) &&
					d.register(
						u,
						'GQLExample',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/GQLExample/GQLExample.js'
					),
				(s = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: r(5)
				).leaveModule) && s(e);
		}.call(this, r(16)(e)));
	},
	279: function(e, t) {
		e.exports = {
			noPassword: 'Password required for this sheet',
			wrongPassword: 'Wrong password provided',
			shortPassword: 'Password too short. Minimum 6 characters',
			longPassword: 'Password too long. Maximum 70 characters',
		};
	},
	280: function(module, exports, __webpack_require__) {
		'use strict';
		(function(module) {
			Object.defineProperty(exports, '__esModule', { value: !0 });
			var _createClass = (function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var o = t[r];
							(o.enumerable = o.enumerable || !1),
								(o.configurable = !0),
								'value' in o && (o.writable = !0),
								Object.defineProperty(e, o.key, o);
						}
					}
					return function(t, r, o) {
						return r && e(t.prototype, r), o && e(t, o), t;
					};
				})(),
				_react = __webpack_require__(3),
				_react2 = _interopRequireDefault(_react),
				_reactRouter = __webpack_require__(281),
				enterModule;
			function _interopRequireDefault(e) {
				return e && e.__esModule ? e : { default: e };
			}
			function _classCallCheck(e, t) {
				if (!(e instanceof t))
					throw new TypeError('Cannot call a class as a function');
			}
			function _possibleConstructorReturn(e, t) {
				if (!e)
					throw new ReferenceError(
						"this hasn't been initialised - super() hasn't been called"
					);
				return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
			}
			function _inherits(e, t) {
				if ('function' != typeof t && null !== t)
					throw new TypeError(
						'Super expression must either be null or a function, not ' +
							typeof t
					);
				(e.prototype = Object.create(t && t.prototype, {
					constructor: {
						value: e,
						enumerable: !1,
						writable: !0,
						configurable: !0,
					},
				})),
					t &&
						(Object.setPrototypeOf
							? Object.setPrototypeOf(e, t)
							: (e.__proto__ = t));
			}
			(enterModule = ('undefined' != typeof reactHotLoaderGlobal
				? reactHotLoaderGlobal
				: __webpack_require__(5)
			).enterModule),
				enterModule && enterModule(module);
			var ScrollToTop = (function(_React$Component) {
					function ScrollToTop() {
						return (
							_classCallCheck(this, ScrollToTop),
							_possibleConstructorReturn(
								this,
								(
									ScrollToTop.__proto__ || Object.getPrototypeOf(ScrollToTop)
								).apply(this, arguments)
							)
						);
					}
					return (
						_inherits(ScrollToTop, _React$Component),
						_createClass(ScrollToTop, [
							{
								key: 'componentDidUpdate',
								value: function(e) {
									this.props.location !== e.location && window.scrollTo(0, 0);
								},
							},
							{
								key: 'render',
								value: function() {
									return this.props.children;
								},
							},
							{
								key: '__reactstandin__regenerateByEval',
								value: function __reactstandin__regenerateByEval(key, code) {
									this[key] = eval(code);
								},
							},
						]),
						ScrollToTop
					);
				})(_react2.default.Component),
				_default = (0, _reactRouter.withRouter)(ScrollToTop),
				reactHotLoader,
				leaveModule;
			(exports.default = _default),
				(reactHotLoader = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: __webpack_require__(5)
				).default),
				reactHotLoader &&
					(reactHotLoader.register(
						ScrollToTop,
						'ScrollToTop',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollToTop/ScrollToTop.js'
					),
					reactHotLoader.register(
						_default,
						'default',
						'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollToTop/ScrollToTop.js'
					)),
				(leaveModule = ('undefined' != typeof reactHotLoaderGlobal
					? reactHotLoaderGlobal
					: __webpack_require__(5)
				).leaveModule),
				leaveModule && leaveModule(module);
		}.call(this, __webpack_require__(16)(module)));
	},
});
