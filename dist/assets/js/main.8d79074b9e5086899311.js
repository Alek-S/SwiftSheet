/******/ (function(modules) {
	// webpackBootstrap
	/******/ // install a JSONP callback for chunk loading
	/******/ function webpackJsonpCallback(data) {
		/******/ var chunkIds = data[0];
		/******/ var moreModules = data[1];
		/******/ var executeModules = data[2]; // add "moreModules" to the modules object, // then flag all "chunkIds" as loaded and fire callback
		/******/
		/******/ /******/ /******/ var moduleId,
			chunkId,
			i = 0,
			resolves = [];
		/******/ for (; i < chunkIds.length; i++) {
			/******/ chunkId = chunkIds[i];
			/******/ if (installedChunks[chunkId]) {
				/******/ resolves.push(installedChunks[chunkId][0]);
				/******/
			}
			/******/ installedChunks[chunkId] = 0;
			/******/
		}
		/******/ for (moduleId in moreModules) {
			/******/ if (
				Object.prototype.hasOwnProperty.call(moreModules, moduleId)
			) {
				/******/ modules[moduleId] = moreModules[moduleId];
				/******/
			}
			/******/
		}
		/******/ if (parentJsonpFunction) parentJsonpFunction(data);
		/******/
		/******/ while (resolves.length) {
			/******/ resolves.shift()();
			/******/
		} // add entry modules from loaded chunk to deferred list
		/******/
		/******/ /******/ deferredModules.push.apply(
			deferredModules,
			executeModules || []
		); // run deferred modules when all chunks ready
		/******/
		/******/ /******/ return checkDeferredModules();
		/******/
	}
	/******/ function checkDeferredModules() {
		/******/ var result;
		/******/ for (var i = 0; i < deferredModules.length; i++) {
			/******/ var deferredModule = deferredModules[i];
			/******/ var fulfilled = true;
			/******/ for (var j = 1; j < deferredModule.length; j++) {
				/******/ var depId = deferredModule[j];
				/******/ if (installedChunks[depId] !== 0) fulfilled = false;
				/******/
			}
			/******/ if (fulfilled) {
				/******/ deferredModules.splice(i--, 1);
				/******/ result = __webpack_require__(
					(__webpack_require__.s = deferredModule[0])
				);
				/******/
			}
			/******/
		}
		/******/ return result;
		/******/
	}
	/******/ function hotDisposeChunk(chunkId) {
		/******/ delete installedChunks[chunkId];
		/******/
	}
	/******/ var parentHotUpdateCallback = window['webpackHotUpdate'];
	/******/ window[
		'webpackHotUpdate'
	] = /******/ function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-next-line no-unused-vars
		/******/ hotAddUpdateChunk(chunkId, moreModules);
		/******/ if (parentHotUpdateCallback)
			parentHotUpdateCallback(chunkId, moreModules);
		/******/
	}; // eslint-disable-next-line no-unused-vars
	/******/
	/******/ /******/ function hotDownloadUpdateChunk(chunkId) {
		/******/ var script = document.createElement('script');
		/******/ script.charset = 'utf-8';
		/******/ script.src =
			__webpack_require__.p +
			'' +
			chunkId +
			'.' +
			hotCurrentHash +
			'.hot-update.js';
		/******/ if (null) script.crossOrigin = null;
		/******/ document.head.appendChild(script);
		/******/
	} // eslint-disable-next-line no-unused-vars
	/******/
	/******/ /******/ function hotDownloadManifest(requestTimeout) {
		/******/ requestTimeout = requestTimeout || 10000;
		/******/ return new Promise(function(resolve, reject) {
			/******/ if (typeof XMLHttpRequest === 'undefined') {
				/******/ return reject(new Error('No browser support'));
				/******/
			}
			/******/ try {
				/******/ var request = new XMLHttpRequest();
				/******/ var requestPath =
					__webpack_require__.p + '' + hotCurrentHash + '.hot-update.json';
				/******/ request.open('GET', requestPath, true);
				/******/ request.timeout = requestTimeout;
				/******/ request.send(null);
				/******/
			} catch (err) {
				/******/ return reject(err);
				/******/
			}
			/******/ request.onreadystatechange = function() {
				/******/ if (request.readyState !== 4) return;
				/******/ if (request.status === 0) {
					/******/ // timeout
					/******/ reject(
						/******/ new Error(
							'Manifest request to ' + requestPath + ' timed out.'
						)
						/******/
					);
					/******/
				} else if (request.status === 404) {
					/******/ // no update available
					/******/ resolve();
					/******/
				} else if (request.status !== 200 && request.status !== 304) {
					/******/ // other failure
					/******/ reject(
						new Error('Manifest request to ' + requestPath + ' failed.')
					);
					/******/
				} else {
					/******/ // success
					/******/ try {
						/******/ var update = JSON.parse(request.responseText);
						/******/
					} catch (e) {
						/******/ reject(e);
						/******/ return;
						/******/
					}
					/******/ resolve(update);
					/******/
				}
				/******/
			};
			/******/
		});
		/******/
	}
	/******/
	/******/ var hotApplyOnUpdate = true; // eslint-disable-next-line no-unused-vars
	/******/ /******/ var hotCurrentHash = '8d79074b9e5086899311';
	/******/ var hotRequestTimeout = 10000;
	/******/ var hotCurrentModuleData = {};
	/******/ var hotCurrentChildModule; // eslint-disable-next-line no-unused-vars
	/******/ /******/ var hotCurrentParents = []; // eslint-disable-next-line no-unused-vars
	/******/ /******/ var hotCurrentParentsTemp = []; // eslint-disable-next-line no-unused-vars
	/******/
	/******/ /******/ function hotCreateRequire(moduleId) {
		/******/ var me = installedModules[moduleId];
		/******/ if (!me) return __webpack_require__;
		/******/ var fn = function(request) {
			/******/ if (me.hot.active) {
				/******/ if (installedModules[request]) {
					/******/ if (
						installedModules[request].parents.indexOf(moduleId) === -1
					) {
						/******/ installedModules[request].parents.push(moduleId);
						/******/
					}
					/******/
				} else {
					/******/ hotCurrentParents = [moduleId];
					/******/ hotCurrentChildModule = request;
					/******/
				}
				/******/ if (me.children.indexOf(request) === -1) {
					/******/ me.children.push(request);
					/******/
				}
				/******/
			} else {
				/******/ console.warn(
					/******/ '[HMR] unexpected require(' +
						/******/ request +
						/******/ ') from disposed module ' +
						/******/ moduleId
					/******/
				);
				/******/ hotCurrentParents = [];
				/******/
			}
			/******/ return __webpack_require__(request);
			/******/
		};
		/******/ var ObjectFactory = function ObjectFactory(name) {
			/******/ return {
				/******/ configurable: true,
				/******/ enumerable: true,
				/******/ get: function() {
					/******/ return __webpack_require__[name];
					/******/
				},
				/******/ set: function(value) {
					/******/ __webpack_require__[name] = value;
					/******/
				},
				/******/
			};
			/******/
		};
		/******/ for (var name in __webpack_require__) {
			/******/ if (
				/******/ Object.prototype.hasOwnProperty.call(
					__webpack_require__,
					name
				) &&
				/******/ name !== 'e' &&
				/******/ name !== 't'
				/******/
			) {
				/******/ Object.defineProperty(fn, name, ObjectFactory(name));
				/******/
			}
			/******/
		}
		/******/ fn.e = function(chunkId) {
			/******/ if (hotStatus === 'ready') hotSetStatus('prepare');
			/******/ hotChunksLoading++;
			/******/ return __webpack_require__
				.e(chunkId)
				.then(finishChunkLoading, function(err) {
					/******/ finishChunkLoading();
					/******/ throw err;
					/******/
				});
			/******/
			/******/ function finishChunkLoading() {
				/******/ hotChunksLoading--;
				/******/ if (hotStatus === 'prepare') {
					/******/ if (!hotWaitingFilesMap[chunkId]) {
						/******/ hotEnsureUpdateChunk(chunkId);
						/******/
					}
					/******/ if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
						/******/ hotUpdateDownloaded();
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		};
		/******/ fn.t = function(value, mode) {
			/******/ if (mode & 1) value = fn(value);
			/******/ return __webpack_require__.t(value, mode & ~1);
			/******/
		};
		/******/ return fn;
		/******/
	} // eslint-disable-next-line no-unused-vars
	/******/
	/******/ /******/ function hotCreateModule(moduleId) {
		/******/ var hot = {
			/******/ // private stuff
			/******/ _acceptedDependencies: {},
			/******/ _declinedDependencies: {},
			/******/ _selfAccepted: false,
			/******/ _selfDeclined: false,
			/******/ _disposeHandlers: [],
			/******/ _main: hotCurrentChildModule !== moduleId, // Module API
			/******/
			/******/ /******/ active: true,
			/******/ accept: function(dep, callback) {
				/******/ if (dep === undefined) hot._selfAccepted = true;
				/******/ else if (typeof dep === 'function') hot._selfAccepted = dep;
				/******/ else if (typeof dep === 'object')
					/******/ for (var i = 0; i < dep.length; i++)
						/******/ hot._acceptedDependencies[dep[i]] =
							callback || function() {};
				/******/ else
					hot._acceptedDependencies[dep] = callback || function() {};
				/******/
			},
			/******/ decline: function(dep) {
				/******/ if (dep === undefined) hot._selfDeclined = true;
				/******/ else if (typeof dep === 'object')
					/******/ for (var i = 0; i < dep.length; i++)
						/******/ hot._declinedDependencies[dep[i]] = true;
				/******/ else hot._declinedDependencies[dep] = true;
				/******/
			},
			/******/ dispose: function(callback) {
				/******/ hot._disposeHandlers.push(callback);
				/******/
			},
			/******/ addDisposeHandler: function(callback) {
				/******/ hot._disposeHandlers.push(callback);
				/******/
			},
			/******/ removeDisposeHandler: function(callback) {
				/******/ var idx = hot._disposeHandlers.indexOf(callback);
				/******/ if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
				/******/
			}, // Management API
			/******/
			/******/ /******/ check: hotCheck,
			/******/ apply: hotApply,
			/******/ status: function(l) {
				/******/ if (!l) return hotStatus;
				/******/ hotStatusHandlers.push(l);
				/******/
			},
			/******/ addStatusHandler: function(l) {
				/******/ hotStatusHandlers.push(l);
				/******/
			},
			/******/ removeStatusHandler: function(l) {
				/******/ var idx = hotStatusHandlers.indexOf(l);
				/******/ if (idx >= 0) hotStatusHandlers.splice(idx, 1);
				/******/
			}, //inherit from previous dispose call
			/******/
			/******/ /******/ data: hotCurrentModuleData[moduleId],
			/******/
		};
		/******/ hotCurrentChildModule = undefined;
		/******/ return hot;
		/******/
	}
	/******/
	/******/ var hotStatusHandlers = [];
	/******/ var hotStatus = 'idle';
	/******/
	/******/ function hotSetStatus(newStatus) {
		/******/ hotStatus = newStatus;
		/******/ for (var i = 0; i < hotStatusHandlers.length; i++)
			/******/ hotStatusHandlers[i].call(null, newStatus);
		/******/
	} // while downloading
	/******/
	/******/ /******/ var hotWaitingFiles = 0;
	/******/ var hotChunksLoading = 0;
	/******/ var hotWaitingFilesMap = {};
	/******/ var hotRequestedFilesMap = {};
	/******/ var hotAvailableFilesMap = {};
	/******/ var hotDeferred; // The update info
	/******/
	/******/ /******/ var hotUpdate, hotUpdateNewHash;
	/******/
	/******/ function toModuleId(id) {
		/******/ var isNumber = +id + '' === id;
		/******/ return isNumber ? +id : id;
		/******/
	}
	/******/
	/******/ function hotCheck(apply) {
		/******/ if (hotStatus !== 'idle') {
			/******/ throw new Error('check() is only allowed in idle status');
			/******/
		}
		/******/ hotApplyOnUpdate = apply;
		/******/ hotSetStatus('check');
		/******/ return hotDownloadManifest(hotRequestTimeout).then(function(
			update
		) {
			/******/ if (!update) {
				/******/ hotSetStatus('idle');
				/******/ return null;
				/******/
			}
			/******/ hotRequestedFilesMap = {};
			/******/ hotWaitingFilesMap = {};
			/******/ hotAvailableFilesMap = update.c;
			/******/ hotUpdateNewHash = update.h;
			/******/
			/******/ hotSetStatus('prepare');
			/******/ var promise = new Promise(function(resolve, reject) {
				/******/ hotDeferred = {
					/******/ resolve: resolve,
					/******/ reject: reject,
					/******/
				};
				/******/
			});
			/******/ hotUpdate = {};
			/******/ /******/ /******/ for (var chunkId in installedChunks) { // eslint-disable-next-line no-lone-blocks
				/******/ /*globals chunkId */
				/******/ hotEnsureUpdateChunk(chunkId);
				/******/
			}
			/******/ if (
				/******/ hotStatus === 'prepare' &&
				/******/ hotChunksLoading === 0 &&
				/******/ hotWaitingFiles === 0
				/******/
			) {
				/******/ hotUpdateDownloaded();
				/******/
			}
			/******/ return promise;
			/******/
		});
		/******/
	} // eslint-disable-next-line no-unused-vars
	/******/
	/******/ /******/ function hotAddUpdateChunk(chunkId, moreModules) {
		/******/ if (
			!hotAvailableFilesMap[chunkId] ||
			!hotRequestedFilesMap[chunkId]
		)
			/******/ return;
		/******/ hotRequestedFilesMap[chunkId] = false;
		/******/ for (var moduleId in moreModules) {
			/******/ if (
				Object.prototype.hasOwnProperty.call(moreModules, moduleId)
			) {
				/******/ hotUpdate[moduleId] = moreModules[moduleId];
				/******/
			}
			/******/
		}
		/******/ if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
			/******/ hotUpdateDownloaded();
			/******/
		}
		/******/
	}
	/******/
	/******/ function hotEnsureUpdateChunk(chunkId) {
		/******/ if (!hotAvailableFilesMap[chunkId]) {
			/******/ hotWaitingFilesMap[chunkId] = true;
			/******/
		} else {
			/******/ hotRequestedFilesMap[chunkId] = true;
			/******/ hotWaitingFiles++;
			/******/ hotDownloadUpdateChunk(chunkId);
			/******/
		}
		/******/
	}
	/******/
	/******/ function hotUpdateDownloaded() {
		/******/ hotSetStatus('ready');
		/******/ var deferred = hotDeferred;
		/******/ hotDeferred = null;
		/******/ if (!deferred) return;
		/******/ if (hotApplyOnUpdate) {
			/******/ // Wrap deferred object in Promise to mark it as a well-handled Promise to
			/******/ // avoid triggering uncaught exception warning in Chrome.
			/******/ // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
			/******/ Promise.resolve()
				/******/ .then(function() {
					/******/ return hotApply(hotApplyOnUpdate);
					/******/
				})
				/******/ .then(
					/******/ function(result) {
						/******/ deferred.resolve(result);
						/******/
					},
					/******/ function(err) {
						/******/ deferred.reject(err);
						/******/
					}
					/******/
				);
			/******/
		} else {
			/******/ var outdatedModules = [];
			/******/ for (var id in hotUpdate) {
				/******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
					/******/ outdatedModules.push(toModuleId(id));
					/******/
				}
				/******/
			}
			/******/ deferred.resolve(outdatedModules);
			/******/
		}
		/******/
	}
	/******/
	/******/ function hotApply(options) {
		/******/ if (hotStatus !== 'ready')
			/******/ throw new Error('apply() is only allowed in ready status');
		/******/ options = options || {};
		/******/
		/******/ var cb;
		/******/ var i;
		/******/ var j;
		/******/ var module;
		/******/ var moduleId;
		/******/
		/******/ function getAffectedStuff(updateModuleId) {
			/******/ var outdatedModules = [updateModuleId];
			/******/ var outdatedDependencies = {};
			/******/
			/******/ var queue = outdatedModules.slice().map(function(id) {
				/******/ return {
					/******/ chain: [id],
					/******/ id: id,
					/******/
				};
				/******/
			});
			/******/ while (queue.length > 0) {
				/******/ var queueItem = queue.pop();
				/******/ var moduleId = queueItem.id;
				/******/ var chain = queueItem.chain;
				/******/ module = installedModules[moduleId];
				/******/ if (!module || module.hot._selfAccepted) continue;
				/******/ if (module.hot._selfDeclined) {
					/******/ return {
						/******/ type: 'self-declined',
						/******/ chain: chain,
						/******/ moduleId: moduleId,
						/******/
					};
					/******/
				}
				/******/ if (module.hot._main) {
					/******/ return {
						/******/ type: 'unaccepted',
						/******/ chain: chain,
						/******/ moduleId: moduleId,
						/******/
					};
					/******/
				}
				/******/ for (var i = 0; i < module.parents.length; i++) {
					/******/ var parentId = module.parents[i];
					/******/ var parent = installedModules[parentId];
					/******/ if (!parent) continue;
					/******/ if (parent.hot._declinedDependencies[moduleId]) {
						/******/ return {
							/******/ type: 'declined',
							/******/ chain: chain.concat([parentId]),
							/******/ moduleId: moduleId,
							/******/ parentId: parentId,
							/******/
						};
						/******/
					}
					/******/ if (outdatedModules.indexOf(parentId) !== -1) continue;
					/******/ if (parent.hot._acceptedDependencies[moduleId]) {
						/******/ if (!outdatedDependencies[parentId])
							/******/ outdatedDependencies[parentId] = [];
						/******/ addAllToSet(outdatedDependencies[parentId], [moduleId]);
						/******/ continue;
						/******/
					}
					/******/ delete outdatedDependencies[parentId];
					/******/ outdatedModules.push(parentId);
					/******/ queue.push({
						/******/ chain: chain.concat([parentId]),
						/******/ id: parentId,
						/******/
					});
					/******/
				}
				/******/
			}
			/******/
			/******/ return {
				/******/ type: 'accepted',
				/******/ moduleId: updateModuleId,
				/******/ outdatedModules: outdatedModules,
				/******/ outdatedDependencies: outdatedDependencies,
				/******/
			};
			/******/
		}
		/******/
		/******/ function addAllToSet(a, b) {
			/******/ for (var i = 0; i < b.length; i++) {
				/******/ var item = b[i];
				/******/ if (a.indexOf(item) === -1) a.push(item);
				/******/
			}
			/******/
		} // at begin all updates modules are outdated // the "outdated" status can propagate to parents if they don't accept the children
		/******/
		/******/ /******/ /******/ var outdatedDependencies = {};
		/******/ var outdatedModules = [];
		/******/ var appliedUpdate = {};
		/******/
		/******/ var warnUnexpectedRequire = function warnUnexpectedRequire() {
			/******/ console.warn(
				/******/ '[HMR] unexpected require(' +
					result.moduleId +
					') to disposed module'
				/******/
			);
			/******/
		};
		/******/
		/******/ for (var id in hotUpdate) {
			/******/ if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
				/******/ moduleId = toModuleId(id); /** @type {TODO} */
				/******/ /******/ var result;
				/******/ if (hotUpdate[id]) {
					/******/ result = getAffectedStuff(moduleId);
					/******/
				} else {
					/******/ result = {
						/******/ type: 'disposed',
						/******/ moduleId: id,
						/******/
					};
					/******/
				} /** @type {Error|false} */
				/******/ /******/ var abortError = false;
				/******/ var doApply = false;
				/******/ var doDispose = false;
				/******/ var chainInfo = '';
				/******/ if (result.chain) {
					/******/ chainInfo =
						'\nUpdate propagation: ' + result.chain.join(' -> ');
					/******/
				}
				/******/ switch (result.type) {
					/******/ case 'self-declined':
						/******/ if (options.onDeclined) options.onDeclined(result);
						/******/ if (!options.ignoreDeclined)
							/******/ abortError = new Error(
								/******/ 'Aborted because of self decline: ' +
									/******/ result.moduleId +
									/******/ chainInfo
								/******/
							);
						/******/ break;
					/******/ case 'declined':
						/******/ if (options.onDeclined) options.onDeclined(result);
						/******/ if (!options.ignoreDeclined)
							/******/ abortError = new Error(
								/******/ 'Aborted because of declined dependency: ' +
									/******/ result.moduleId +
									/******/ ' in ' +
									/******/ result.parentId +
									/******/ chainInfo
								/******/
							);
						/******/ break;
					/******/ case 'unaccepted':
						/******/ if (options.onUnaccepted) options.onUnaccepted(result);
						/******/ if (!options.ignoreUnaccepted)
							/******/ abortError = new Error(
								/******/ 'Aborted because ' +
									moduleId +
									' is not accepted' +
									chainInfo
								/******/
							);
						/******/ break;
					/******/ case 'accepted':
						/******/ if (options.onAccepted) options.onAccepted(result);
						/******/ doApply = true;
						/******/ break;
					/******/ case 'disposed':
						/******/ if (options.onDisposed) options.onDisposed(result);
						/******/ doDispose = true;
						/******/ break;
					/******/ default:
						/******/ throw new Error('Unexception type ' + result.type);
					/******/
				}
				/******/ if (abortError) {
					/******/ hotSetStatus('abort');
					/******/ return Promise.reject(abortError);
					/******/
				}
				/******/ if (doApply) {
					/******/ appliedUpdate[moduleId] = hotUpdate[moduleId];
					/******/ addAllToSet(outdatedModules, result.outdatedModules);
					/******/ for (moduleId in result.outdatedDependencies) {
						/******/ if (
							/******/ Object.prototype.hasOwnProperty.call(
								/******/ result.outdatedDependencies,
								/******/ moduleId
								/******/
							)
							/******/
						) {
							/******/ if (!outdatedDependencies[moduleId])
								/******/ outdatedDependencies[moduleId] = [];
							/******/ addAllToSet(
								/******/ outdatedDependencies[moduleId],
								/******/ result.outdatedDependencies[moduleId]
								/******/
							);
							/******/
						}
						/******/
					}
					/******/
				}
				/******/ if (doDispose) {
					/******/ addAllToSet(outdatedModules, [result.moduleId]);
					/******/ appliedUpdate[moduleId] = warnUnexpectedRequire;
					/******/
				}
				/******/
			}
			/******/
		} // Store self accepted outdated modules to require them later by the module system
		/******/
		/******/ /******/ var outdatedSelfAcceptedModules = [];
		/******/ for (i = 0; i < outdatedModules.length; i++) {
			/******/ moduleId = outdatedModules[i];
			/******/ if (
				/******/ installedModules[moduleId] &&
				/******/ installedModules[moduleId].hot._selfAccepted
				/******/
			)
				/******/ outdatedSelfAcceptedModules.push({
					/******/ module: moduleId,
					/******/ errorHandler: installedModules[moduleId].hot._selfAccepted,
					/******/
				});
			/******/
		} // Now in "dispose" phase
		/******/
		/******/ /******/ hotSetStatus('dispose');
		/******/ Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
			/******/ if (hotAvailableFilesMap[chunkId] === false) {
				/******/ hotDisposeChunk(chunkId);
				/******/
			}
			/******/
		});
		/******/
		/******/ var idx;
		/******/ var queue = outdatedModules.slice();
		/******/ while (queue.length > 0) {
			/******/ moduleId = queue.pop();
			/******/ module = installedModules[moduleId];
			/******/ if (!module) continue;
			/******/
			/******/ var data = {}; // Call dispose handlers
			/******/
			/******/ /******/ var disposeHandlers = module.hot._disposeHandlers;
			/******/ for (j = 0; j < disposeHandlers.length; j++) {
				/******/ cb = disposeHandlers[j];
				/******/ cb(data);
				/******/
			}
			/******/ hotCurrentModuleData[moduleId] = data; // disable module (this disables requires from this module)
			/******/
			/******/ /******/ module.hot.active = false; // remove module from cache
			/******/
			/******/ /******/ delete installedModules[moduleId]; // when disposing there is no need to call dispose handler
			/******/
			/******/ /******/ delete outdatedDependencies[moduleId]; // remove "parents" references from all children
			/******/
			/******/ /******/ for (j = 0; j < module.children.length; j++) {
				/******/ var child = installedModules[module.children[j]];
				/******/ if (!child) continue;
				/******/ idx = child.parents.indexOf(moduleId);
				/******/ if (idx >= 0) {
					/******/ child.parents.splice(idx, 1);
					/******/
				}
				/******/
			}
			/******/
		} // remove outdated dependency from module children
		/******/
		/******/ /******/ var dependency;
		/******/ var moduleOutdatedDependencies;
		/******/ for (moduleId in outdatedDependencies) {
			/******/ if (
				/******/ Object.prototype.hasOwnProperty.call(
					outdatedDependencies,
					moduleId
				)
				/******/
			) {
				/******/ module = installedModules[moduleId];
				/******/ if (module) {
					/******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
					/******/ for (j = 0; j < moduleOutdatedDependencies.length; j++) {
						/******/ dependency = moduleOutdatedDependencies[j];
						/******/ idx = module.children.indexOf(dependency);
						/******/ if (idx >= 0) module.children.splice(idx, 1);
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		} // Not in "apply" phase
		/******/
		/******/ /******/ hotSetStatus('apply');
		/******/
		/******/ hotCurrentHash = hotUpdateNewHash; // insert new code
		/******/
		/******/ /******/ for (moduleId in appliedUpdate) {
			/******/ if (
				Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)
			) {
				/******/ modules[moduleId] = appliedUpdate[moduleId];
				/******/
			}
			/******/
		} // call accept handlers
		/******/
		/******/ /******/ var error = null;
		/******/ for (moduleId in outdatedDependencies) {
			/******/ if (
				/******/ Object.prototype.hasOwnProperty.call(
					outdatedDependencies,
					moduleId
				)
				/******/
			) {
				/******/ module = installedModules[moduleId];
				/******/ if (module) {
					/******/ moduleOutdatedDependencies = outdatedDependencies[moduleId];
					/******/ var callbacks = [];
					/******/ for (i = 0; i < moduleOutdatedDependencies.length; i++) {
						/******/ dependency = moduleOutdatedDependencies[i];
						/******/ cb = module.hot._acceptedDependencies[dependency];
						/******/ if (cb) {
							/******/ if (callbacks.indexOf(cb) !== -1) continue;
							/******/ callbacks.push(cb);
							/******/
						}
						/******/
					}
					/******/ for (i = 0; i < callbacks.length; i++) {
						/******/ cb = callbacks[i];
						/******/ try {
							/******/ cb(moduleOutdatedDependencies);
							/******/
						} catch (err) {
							/******/ if (options.onErrored) {
								/******/ options.onErrored({
									/******/ type: 'accept-errored',
									/******/ moduleId: moduleId,
									/******/ dependencyId: moduleOutdatedDependencies[i],
									/******/ error: err,
									/******/
								});
								/******/
							}
							/******/ if (!options.ignoreErrored) {
								/******/ if (!error) error = err;
								/******/
							}
							/******/
						}
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		} // Load self accepted modules
		/******/
		/******/ /******/ for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
			/******/ var item = outdatedSelfAcceptedModules[i];
			/******/ moduleId = item.module;
			/******/ hotCurrentParents = [moduleId];
			/******/ try {
				/******/ __webpack_require__(moduleId);
				/******/
			} catch (err) {
				/******/ if (typeof item.errorHandler === 'function') {
					/******/ try {
						/******/ item.errorHandler(err);
						/******/
					} catch (err2) {
						/******/ if (options.onErrored) {
							/******/ options.onErrored({
								/******/ type: 'self-accept-error-handler-errored',
								/******/ moduleId: moduleId,
								/******/ error: err2,
								/******/ originalError: err,
								/******/
							});
							/******/
						}
						/******/ if (!options.ignoreErrored) {
							/******/ if (!error) error = err2;
							/******/
						}
						/******/ if (!error) error = err;
						/******/
					}
					/******/
				} else {
					/******/ if (options.onErrored) {
						/******/ options.onErrored({
							/******/ type: 'self-accept-errored',
							/******/ moduleId: moduleId,
							/******/ error: err,
							/******/
						});
						/******/
					}
					/******/ if (!options.ignoreErrored) {
						/******/ if (!error) error = err;
						/******/
					}
					/******/
				}
				/******/
			}
			/******/
		} // handle errors in accept handlers and self accepted module load
		/******/
		/******/ /******/ if (error) {
			/******/ hotSetStatus('fail');
			/******/ return Promise.reject(error);
			/******/
		}
		/******/
		/******/ hotSetStatus('idle');
		/******/ return new Promise(function(resolve) {
			/******/ resolve(outdatedModules);
			/******/
		});
		/******/
	} // The module cache
	/******/
	/******/ /******/ var installedModules = {}; // object to store loaded and loading chunks // undefined = chunk not loaded, null = chunk preloaded/prefetched // Promise = chunk loading, 0 = chunk loaded
	/******/
	/******/ /******/ /******/ /******/ var installedChunks = {
		/******/ main: 0,
		/******/
	};
	/******/
	/******/ var deferredModules = []; // The require function
	/******/
	/******/ /******/ function __webpack_require__(moduleId) {
		/******/
		/******/ // Check if module is in cache
		/******/ if (installedModules[moduleId]) {
			/******/ return installedModules[moduleId].exports;
			/******/
		} // Create a new module (and put it into the cache)
		/******/ /******/ var module = (installedModules[moduleId] = {
			/******/ i: moduleId,
			/******/ l: false,
			/******/ exports: {},
			/******/ hot: hotCreateModule(moduleId),
			/******/ parents: ((hotCurrentParentsTemp = hotCurrentParents),
			(hotCurrentParents = []),
			hotCurrentParentsTemp),
			/******/ children: [],
			/******/
		}); // Execute the module function
		/******/
		/******/ /******/ modules[moduleId].call(
			module.exports,
			module,
			module.exports,
			hotCreateRequire(moduleId)
		); // Flag the module as loaded
		/******/
		/******/ /******/ module.l = true; // Return the exports of the module
		/******/
		/******/ /******/ return module.exports;
		/******/
	} // expose the modules object (__webpack_modules__)
	/******/
	/******/
	/******/ /******/ __webpack_require__.m = modules; // expose the module cache
	/******/
	/******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
	/******/
	/******/ /******/ __webpack_require__.d = function(exports, name, getter) {
		/******/ if (!__webpack_require__.o(exports, name)) {
			/******/ Object.defineProperty(exports, name, {
				enumerable: true,
				get: getter,
			});
			/******/
		}
		/******/
	}; // define __esModule on exports
	/******/
	/******/ /******/ __webpack_require__.r = function(exports) {
		/******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
			/******/ Object.defineProperty(exports, Symbol.toStringTag, {
				value: 'Module',
			});
			/******/
		}
		/******/ Object.defineProperty(exports, '__esModule', { value: true });
		/******/
	}; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
	/******/
	/******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
		value,
		mode
	) {
		/******/ if (mode & 1) value = __webpack_require__(value);
		/******/ if (mode & 8) return value;
		/******/ if (
			mode & 4 &&
			typeof value === 'object' &&
			value &&
			value.__esModule
		)
			return value;
		/******/ var ns = Object.create(null);
		/******/ __webpack_require__.r(ns);
		/******/ Object.defineProperty(ns, 'default', {
			enumerable: true,
			value: value,
		});
		/******/ if (mode & 2 && typeof value != 'string')
			for (var key in value)
				__webpack_require__.d(
					ns,
					key,
					function(key) {
						return value[key];
					}.bind(null, key)
				);
		/******/ return ns;
		/******/
	}; // getDefaultExport function for compatibility with non-harmony modules
	/******/
	/******/ /******/ __webpack_require__.n = function(module) {
		/******/ var getter =
			module && module.__esModule
				? /******/ function getDefault() {
						return module['default'];
				  }
				: /******/ function getModuleExports() {
						return module;
				  };
		/******/ __webpack_require__.d(getter, 'a', getter);
		/******/ return getter;
		/******/
	}; // Object.prototype.hasOwnProperty.call
	/******/
	/******/ /******/ __webpack_require__.o = function(object, property) {
		return Object.prototype.hasOwnProperty.call(object, property);
	}; // __webpack_public_path__
	/******/
	/******/ /******/ __webpack_require__.p = ''; // __webpack_hash__
	/******/
	/******/ /******/ __webpack_require__.h = function() {
		return hotCurrentHash;
	};
	/******/
	/******/ var jsonpArray = (window['webpackJsonp'] =
		window['webpackJsonp'] || []);
	/******/ var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
	/******/ jsonpArray.push = webpackJsonpCallback;
	/******/ jsonpArray = jsonpArray.slice();
	/******/ for (var i = 0; i < jsonpArray.length; i++)
		webpackJsonpCallback(jsonpArray[i]);
	/******/ var parentJsonpFunction = oldJsonpFunction; // add entry module to deferred list
	/******/
	/******/
	/******/ /******/ deferredModules.push(['./frontend/root.js', 'vendor']); // run deferred modules when ready
	/******/ /******/ return checkDeferredModules();
	/******/
})(
	/************************************************************************/
	/******/ {
		/***/ './frontend/components/Filedrop/Filedrop.js':
			/*!**************************************************!*\
  !*** ./frontend/components/Filedrop/Filedrop.js ***!
  \**************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _reactDropzone = __webpack_require__(/*! react-dropzone */ \"./node_modules/react-dropzone/dist/es/index.js\");\n\nvar _reactDropzone2 = _interopRequireDefault(_reactDropzone);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/**\n * @function\n * Area for drag & drop file uploads of csv\n * @param {bool} - props.firstRowHeader - is first row a header\n * @returns {jsx} <Filedrop />\n */\nvar Filedrop = function Filedrop(_ref) {\n\tvar firstRowHeader = _ref.firstRowHeader,\n\t    expireIn = _ref.expireIn,\n\t    setExpireIn = _ref.setExpireIn,\n\t    setHeader = _ref.setHeader,\n\t    password = _ref.password,\n\t    setPassword = _ref.setPassword,\n\t    onDrop = _ref.onDrop,\n\t    wrongPassword = _ref.wrongPassword;\n\n\tvar _useState = (0, _react.useState)(false),\n\t    _useState2 = _slicedToArray(_useState, 2),\n\t    dragging = _useState2[0],\n\t    setDragging = _useState2[1];\n\n\tvar _useState3 = (0, _react.useState)(''),\n\t    _useState4 = _slicedToArray(_useState3, 2),\n\t    uploadErrorMessage = _useState4[0],\n\t    setUploadErrorMessage = _useState4[1];\n\n\tvar MAX_SIZE = 2500000;\n\tvar FILE_FORMAT = 'text/csv';\n\n\t/**\n  * @function\n  * Set expireIn state, in Hrs\n  * @param {object} e - dom event\n  */\n\tvar _handleChange = function _handleChange(e) {\n\t\te.preventDefault();\n\t\tsetExpireIn(parseInt(e.target.value));\n\t};\n\n\t/**\n  * @function\n  * Toggle first row of CSV header boolean\n  * @param {object} e - dom event\n  */\n\tvar _toggleHeader = function _toggleHeader(e) {\n\t\te.preventDefault();\n\t\tsetHeader(!firstRowHeader);\n\t};\n\n\tvar _handleRejection = function _handleRejection(e) {\n\t\tvar _e$ = e[0],\n\t\t    size = _e$.size,\n\t\t    type = _e$.type;\n\n\n\t\tif (size >= MAX_SIZE) {\n\t\t\tsetUploadErrorMessage('⚠️ Woops! Bit too large. Upload limit is currently 2.5MB.');\n\t\t} else if (type !== FILE_FORMAT) {\n\t\t\tsetUploadErrorMessage('⚠️ Woops! Only CSV file types currently supported');\n\t\t} else {\n\t\t\tsetUploadErrorMessage('⚠️ Woops! Something went wrong. Check that file is formatted correctly');\n\t\t}\n\t\tconsole.warn('upload rejected', e);\n\t};\n\n\treturn _react2.default.createElement(\n\t\tStyledSection,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\tStyledDropzone,\n\t\t\t{\n\t\t\t\tonDrop: onDrop,\n\t\t\t\taccept: FILE_FORMAT,\n\t\t\t\tmaxSize: MAX_SIZE,\n\t\t\t\tminSize: 8,\n\t\t\t\tmultiple: false,\n\t\t\t\tdragging: dragging ? 'true' : undefined,\n\t\t\t\tonDragEnter: function onDragEnter() {\n\t\t\t\t\treturn setDragging(true);\n\t\t\t\t},\n\t\t\t\tonDragLeave: function onDragLeave() {\n\t\t\t\t\treturn setDragging(false);\n\t\t\t\t},\n\t\t\t\tonDropRejected: _handleRejection\n\t\t\t},\n\t\t\tdragging ? _react2.default.createElement('img', {\n\t\t\t\tsrc: './assets/images/upload-cloud-darkBlue.svg',\n\t\t\t\talt: 'upload-cloud-logo'\n\t\t\t}) : _react2.default.createElement('img', {\n\t\t\t\tsrc: './assets/images/upload-cloud-light.svg',\n\t\t\t\talt: 'upload-cloud-logo'\n\t\t\t}),\n\t\t\t_react2.default.createElement(\n\t\t\t\tStyledText,\n\t\t\t\t{ dragging: dragging },\n\t\t\t\tdragging ? 'Drop' : 'Drag',\n\t\t\t\t' CSV file here'\n\t\t\t)\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\tUploadError,\n\t\t\t{ className: uploadErrorMessage ? 'true' : undefined },\n\t\t\tuploadErrorMessage\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\tOptions,\n\t\t\t{ role: 'form', 'aria-label': 'preferences' },\n\t\t\t_react2.default.createElement(\n\t\t\t\t'section',\n\t\t\t\t{ 'aria-label': 'set password' },\n\t\t\t\t'Password:',\n\t\t\t\t_react2.default.createElement('input', {\n\t\t\t\t\tvalue: password,\n\t\t\t\t\tclassName: wrongPassword ? wrongPassword.toString() : undefined,\n\t\t\t\t\tonChange: function onChange(e) {\n\t\t\t\t\t\treturn setPassword(e.target.value);\n\t\t\t\t\t},\n\t\t\t\t\ttype: 'password',\n\t\t\t\t\tplaceholder: 'enter password',\n\t\t\t\t\tautoComplete: 'new-password'\n\t\t\t\t})\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t'section',\n\t\t\t\t{ 'aria-label': 'set expiration' },\n\t\t\t\t'Expires In:',\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'select',\n\t\t\t\t\t{ value: expireIn, onChange: _handleChange },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ value: 1 },\n\t\t\t\t\t\t'1 Hour'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ value: 4 },\n\t\t\t\t\t\t'4 Hours'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ value: 8 },\n\t\t\t\t\t\t'8 Hours'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ value: 24 },\n\t\t\t\t\t\t'1 Day'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ value: 72 },\n\t\t\t\t\t\t'3 Days'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'option',\n\t\t\t\t\t\t{ value: 120 },\n\t\t\t\t\t\t'5 Days'\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t'section',\n\t\t\t\t{ 'aria-label': 'toggle first row header' },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tHeaderToggle,\n\t\t\t\t\t{ active: firstRowHeader },\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'span',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'First Row Header:'\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'button',\n\t\t\t\t\t\t{ onClick: _toggleHeader },\n\t\t\t\t\t\tfirstRowHeader ? 'Yes' : 'No'\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t)\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\tUploadError,\n\t\t\t{\n\t\t\t\tclassName: wrongPassword ? wrongPassword.toString() : undefined\n\t\t\t},\n\t\t\t'\\u26A0\\uFE0F Check Password Length'\n\t\t)\n\t);\n};\n\nvar StyledSection = _styledComponents2.default.section.withConfig({\n\tdisplayName: 'Filedrop__StyledSection',\n\tcomponentId: 'sc-1u7cgvl-0'\n})(['display:flex;flex-direction:column;align-items:center;']);\n\nvar StyledDropzone = (0, _styledComponents2.default)(_reactDropzone2.default).withConfig({\n\tdisplayName: 'Filedrop__StyledDropzone',\n\tcomponentId: 'sc-1u7cgvl-1'\n})(['background-color:', ';border:dashed 2px ', ';border-radius:5px;height:250px;width:70%;margin:auto;margin-top:3rem;img{display:block;height:200px;width:80%;margin:auto;}'], function (props) {\n\treturn props.dragging ? props.theme.color.blue : '#fff';\n}, function (props) {\n\treturn props.dragging ? props.theme.color.darkBlue : props.theme.color.border;\n});\n\nvar StyledText = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'Filedrop__StyledText',\n\tcomponentId: 'sc-1u7cgvl-2'\n})(['color:', ';font-size:1.2rem;text-align:center;background-color:transparent;'], function (props) {\n\treturn props.dragging ? props.theme.color.darkBlue : props.theme.color.lightText;\n});\n\nvar Options = (0, _styledComponents2.default)(_defaultStyle.Card).withConfig({\n\tdisplayName: 'Filedrop__Options',\n\tcomponentId: 'sc-1u7cgvl-3'\n})(['padding-top:1.75rem;padding-bottom:1.75rem;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-evenly;align-items:center;width:70%;margin:auto;text-align:center;margin-top:3.5rem;input{margin:0 2rem 0 0.25rem;padding-left:1rem;width:140px;font-size:0.9rem;font-weight:400;height:25px;::placeholder{color:', ';}}select{margin-left:0.25rem;}'], function (props) {\n\treturn props.theme.color.backgroundDarkest;\n});\n\nvar HeaderToggle = _styledComponents2.default.label.withConfig({\n\tdisplayName: 'Filedrop__HeaderToggle',\n\tcomponentId: 'sc-1u7cgvl-4'\n})(['margin-left:2rem;button{color:white;cursor:pointer;outline:none;background:', ';box-shadow:', ';border:none;font-family:', ';font-size:1rem;border-radius:4px;margin-left:1rem;padding-top:5px;padding-bottom:5px;width:70px;}'], function (props) {\n\treturn props.active ? props.theme.gradient.greenBlue : props.theme.color.backgroundDarkest;\n}, function (props) {\n\treturn props.active ? props.theme.boxShadow : '';\n}, function (props) {\n\treturn props.theme.font.main;\n});\n\nFiledrop.propTypes = {\n\tfirstRowHeader: _propTypes2.default.bool,\n\texpireIn: _propTypes2.default.number,\n\tsetExpireIn: _propTypes2.default.func,\n\tsetHeader: _propTypes2.default.func,\n\tpassword: _propTypes2.default.string,\n\tsetPassword: _propTypes2.default.func,\n\tonDrop: _propTypes2.default.func\n};\n\nvar UploadError = (0, _styledComponents2.default)(_defaultStyle.ErrorDialog).withConfig({\n\tdisplayName: 'Filedrop__UploadError',\n\tcomponentId: 'sc-1u7cgvl-5'\n})(['min-width:200px;width:fit-content;margin-top:2rem;']);\n\nvar _default = Filedrop;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(Filedrop, 'Filedrop', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(StyledSection, 'StyledSection', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(StyledDropzone, 'StyledDropzone', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(StyledText, 'StyledText', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(Options, 'Options', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(HeaderToggle, 'HeaderToggle', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(UploadError, 'UploadError', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Filedrop/Filedrop.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL0ZpbGVkcm9wL0ZpbGVkcm9wLmpzPzdlMTAiXSwibmFtZXMiOlsiRmlsZWRyb3AiLCJmaXJzdFJvd0hlYWRlciIsImV4cGlyZUluIiwic2V0RXhwaXJlSW4iLCJzZXRIZWFkZXIiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwib25Ecm9wIiwid3JvbmdQYXNzd29yZCIsImRyYWdnaW5nIiwic2V0RHJhZ2dpbmciLCJ1cGxvYWRFcnJvck1lc3NhZ2UiLCJzZXRVcGxvYWRFcnJvck1lc3NhZ2UiLCJNQVhfU0laRSIsIkZJTEVfRk9STUFUIiwiX2hhbmRsZUNoYW5nZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInBhcnNlSW50IiwidGFyZ2V0IiwidmFsdWUiLCJfdG9nZ2xlSGVhZGVyIiwiX2hhbmRsZVJlamVjdGlvbiIsInNpemUiLCJ0eXBlIiwiY29uc29sZSIsIndhcm4iLCJ1bmRlZmluZWQiLCJ0b1N0cmluZyIsIlN0eWxlZFNlY3Rpb24iLCJzdHlsZWQiLCJzZWN0aW9uIiwiU3R5bGVkRHJvcHpvbmUiLCJEcm9wem9uZSIsInByb3BzIiwidGhlbWUiLCJjb2xvciIsImJsdWUiLCJkYXJrQmx1ZSIsImJvcmRlciIsIlN0eWxlZFRleHQiLCJkZWZhdWx0U3R5bGUiLCJsaWdodFRleHQiLCJPcHRpb25zIiwiQ2FyZCIsImJhY2tncm91bmREYXJrZXN0IiwiSGVhZGVyVG9nZ2xlIiwibGFiZWwiLCJhY3RpdmUiLCJncmFkaWVudCIsImdyZWVuQmx1ZSIsImJveFNoYWRvdyIsImZvbnQiLCJtYWluIiwicHJvcFR5cGVzIiwiUHJvcFR5cGVzIiwiYm9vbCIsIm51bWJlciIsImZ1bmMiLCJzdHJpbmciLCJVcGxvYWRFcnJvciIsIkVycm9yRGlhbG9nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1BLElB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QXJCOztBQVVBLElBQU1FLGNBQWMsZ0NBQU9DLHlCQUFQLENBQWQ7QUFBQTtBQUFBO0FBQUEsMERBQU47O2VBTWU3RCxROzs7Ozs7Ozs7Ozt5QkExT1RBLFE7eUJBaUlBNkIsYTt5QkFNQUcsYzt5QkFvQkFRLFU7eUJBUUFHLE87eUJBZ0NBRyxZO3lCQWlDQWMsVyIsImZpbGUiOiIuL2Zyb250ZW5kL2NvbXBvbmVudHMvRmlsZWRyb3AvRmlsZWRyb3AuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBEcm9wem9uZSBmcm9tICdyZWFjdC1kcm9wem9uZSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGRlZmF1bHRTdHlsZSwgeyBDYXJkLCBFcnJvckRpYWxvZyB9IGZyb20gJy4uLy4uL2RlZmF1bHRTdHlsZSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBBcmVhIGZvciBkcmFnICYgZHJvcCBmaWxlIHVwbG9hZHMgb2YgY3N2XG4gKiBAcGFyYW0ge2Jvb2x9IC0gcHJvcHMuZmlyc3RSb3dIZWFkZXIgLSBpcyBmaXJzdCByb3cgYSBoZWFkZXJcbiAqIEByZXR1cm5zIHtqc3h9IDxGaWxlZHJvcCAvPlxuICovXG5jb25zdCBGaWxlZHJvcCA9ICh7XG5cdGZpcnN0Um93SGVhZGVyLFxuXHRleHBpcmVJbixcblx0c2V0RXhwaXJlSW4sXG5cdHNldEhlYWRlcixcblx0cGFzc3dvcmQsXG5cdHNldFBhc3N3b3JkLFxuXHRvbkRyb3AsXG5cdHdyb25nUGFzc3dvcmQsXG59KSA9PiB7XG5cdGNvbnN0IFtkcmFnZ2luZywgc2V0RHJhZ2dpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXHRjb25zdCBbdXBsb2FkRXJyb3JNZXNzYWdlLCBzZXRVcGxvYWRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoJycpO1xuXHRjb25zdCBNQVhfU0laRSA9IDI1MDAwMDA7XG5cdGNvbnN0IEZJTEVfRk9STUFUID0gJ3RleHQvY3N2JztcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG5cdCAqIFNldCBleHBpcmVJbiBzdGF0ZSwgaW4gSHJzXG5cdCAqIEBwYXJhbSB7b2JqZWN0fSBlIC0gZG9tIGV2ZW50XG5cdCAqL1xuXHRjb25zdCBfaGFuZGxlQ2hhbmdlID0gZSA9PiB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdHNldEV4cGlyZUluKHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKSk7XG5cdH07XG5cblx0LyoqXG5cdCAqIEBmdW5jdGlvblxuXHQgKiBUb2dnbGUgZmlyc3Qgcm93IG9mIENTViBoZWFkZXIgYm9vbGVhblxuXHQgKiBAcGFyYW0ge29iamVjdH0gZSAtIGRvbSBldmVudFxuXHQgKi9cblx0Y29uc3QgX3RvZ2dsZUhlYWRlciA9IGUgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRzZXRIZWFkZXIoIWZpcnN0Um93SGVhZGVyKTtcblx0fTtcblxuXHRjb25zdCBfaGFuZGxlUmVqZWN0aW9uID0gZSA9PiB7XG5cdFx0Y29uc3QgeyBzaXplLCB0eXBlIH0gPSBlWzBdO1xuXG5cdFx0aWYgKHNpemUgPj0gTUFYX1NJWkUpIHtcblx0XHRcdHNldFVwbG9hZEVycm9yTWVzc2FnZShcblx0XHRcdFx0J+KaoO+4jyBXb29wcyEgQml0IHRvbyBsYXJnZS4gVXBsb2FkIGxpbWl0IGlzIGN1cnJlbnRseSAyLjVNQi4nXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSBpZiAodHlwZSAhPT0gRklMRV9GT1JNQVQpIHtcblx0XHRcdHNldFVwbG9hZEVycm9yTWVzc2FnZShcblx0XHRcdFx0J+KaoO+4jyBXb29wcyEgT25seSBDU1YgZmlsZSB0eXBlcyBjdXJyZW50bHkgc3VwcG9ydGVkJ1xuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c2V0VXBsb2FkRXJyb3JNZXNzYWdlKFxuXHRcdFx0XHQn4pqg77iPIFdvb3BzISBTb21ldGhpbmcgd2VudCB3cm9uZy4gQ2hlY2sgdGhhdCBmaWxlIGlzIGZvcm1hdHRlZCBjb3JyZWN0bHknXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRjb25zb2xlLndhcm4oJ3VwbG9hZCByZWplY3RlZCcsIGUpO1xuXHR9O1xuXG5cdHJldHVybiAoXG5cdFx0PFN0eWxlZFNlY3Rpb24+XG5cdFx0XHQ8U3R5bGVkRHJvcHpvbmVcblx0XHRcdFx0b25Ecm9wPXtvbkRyb3B9XG5cdFx0XHRcdGFjY2VwdD17RklMRV9GT1JNQVR9XG5cdFx0XHRcdG1heFNpemU9e01BWF9TSVpFfVxuXHRcdFx0XHRtaW5TaXplPXs4fVxuXHRcdFx0XHRtdWx0aXBsZT17ZmFsc2V9XG5cdFx0XHRcdGRyYWdnaW5nPXtkcmFnZ2luZyA/ICd0cnVlJyA6IHVuZGVmaW5lZH1cblx0XHRcdFx0b25EcmFnRW50ZXI9eygpID0+IHNldERyYWdnaW5nKHRydWUpfVxuXHRcdFx0XHRvbkRyYWdMZWF2ZT17KCkgPT4gc2V0RHJhZ2dpbmcoZmFsc2UpfVxuXHRcdFx0XHRvbkRyb3BSZWplY3RlZD17X2hhbmRsZVJlamVjdGlvbn1cblx0XHRcdD5cblx0XHRcdFx0e2RyYWdnaW5nID8gKFxuXHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdHNyYz1cIi4vYXNzZXRzL2ltYWdlcy91cGxvYWQtY2xvdWQtZGFya0JsdWUuc3ZnXCJcblx0XHRcdFx0XHRcdGFsdD1cInVwbG9hZC1jbG91ZC1sb2dvXCJcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpIDogKFxuXHRcdFx0XHRcdDxpbWdcblx0XHRcdFx0XHRcdHNyYz1cIi4vYXNzZXRzL2ltYWdlcy91cGxvYWQtY2xvdWQtbGlnaHQuc3ZnXCJcblx0XHRcdFx0XHRcdGFsdD1cInVwbG9hZC1jbG91ZC1sb2dvXCJcblx0XHRcdFx0XHQvPlxuXHRcdFx0XHQpfVxuXHRcdFx0XHQ8U3R5bGVkVGV4dCBkcmFnZ2luZz17ZHJhZ2dpbmd9PlxuXHRcdFx0XHRcdHtkcmFnZ2luZyA/ICdEcm9wJyA6ICdEcmFnJ30gQ1NWIGZpbGUgaGVyZVxuXHRcdFx0XHQ8L1N0eWxlZFRleHQ+XG5cdFx0XHQ8L1N0eWxlZERyb3B6b25lPlxuXHRcdFx0PFVwbG9hZEVycm9yIGNsYXNzTmFtZT17dXBsb2FkRXJyb3JNZXNzYWdlID8gJ3RydWUnIDogdW5kZWZpbmVkfT5cblx0XHRcdFx0e3VwbG9hZEVycm9yTWVzc2FnZX1cblx0XHRcdDwvVXBsb2FkRXJyb3I+XG5cdFx0XHQ8T3B0aW9ucyByb2xlPVwiZm9ybVwiIGFyaWEtbGFiZWw9XCJwcmVmZXJlbmNlc1wiPlxuXHRcdFx0XHQ8c2VjdGlvbiBhcmlhLWxhYmVsPVwic2V0IHBhc3N3b3JkXCI+XG5cdFx0XHRcdFx0UGFzc3dvcmQ6XG5cdFx0XHRcdFx0PGlucHV0XG5cdFx0XHRcdFx0XHR2YWx1ZT17cGFzc3dvcmR9XG5cdFx0XHRcdFx0XHRjbGFzc05hbWU9e3dyb25nUGFzc3dvcmQgPyB3cm9uZ1Bhc3N3b3JkLnRvU3RyaW5nKCkgOiB1bmRlZmluZWR9XG5cdFx0XHRcdFx0XHRvbkNoYW5nZT17ZSA9PiBzZXRQYXNzd29yZChlLnRhcmdldC52YWx1ZSl9XG5cdFx0XHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxuXHRcdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJlbnRlciBwYXNzd29yZFwiXG5cdFx0XHRcdFx0XHRhdXRvQ29tcGxldGU9XCJuZXctcGFzc3dvcmRcIlxuXHRcdFx0XHRcdC8+XG5cdFx0XHRcdDwvc2VjdGlvbj5cblxuXHRcdFx0XHQ8c2VjdGlvbiBhcmlhLWxhYmVsPVwic2V0IGV4cGlyYXRpb25cIj5cblx0XHRcdFx0XHRFeHBpcmVzIEluOlxuXHRcdFx0XHRcdDxzZWxlY3QgdmFsdWU9e2V4cGlyZUlufSBvbkNoYW5nZT17X2hhbmRsZUNoYW5nZX0+XG5cdFx0XHRcdFx0XHQ8b3B0aW9uIHZhbHVlPXsxfT4xIEhvdXI8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9ezR9PjQgSG91cnM8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9ezh9PjggSG91cnM8L29wdGlvbj5cblx0XHRcdFx0XHRcdDxvcHRpb24gdmFsdWU9ezI0fT4xIERheTwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT17NzJ9PjMgRGF5czwvb3B0aW9uPlxuXHRcdFx0XHRcdFx0PG9wdGlvbiB2YWx1ZT17MTIwfT41IERheXM8L29wdGlvbj5cblx0XHRcdFx0XHQ8L3NlbGVjdD5cblx0XHRcdFx0PC9zZWN0aW9uPlxuXG5cdFx0XHRcdDxzZWN0aW9uIGFyaWEtbGFiZWw9XCJ0b2dnbGUgZmlyc3Qgcm93IGhlYWRlclwiPlxuXHRcdFx0XHRcdDxIZWFkZXJUb2dnbGUgYWN0aXZlPXtmaXJzdFJvd0hlYWRlcn0+XG5cdFx0XHRcdFx0XHQ8c3Bhbj5GaXJzdCBSb3cgSGVhZGVyOjwvc3Bhbj5cblx0XHRcdFx0XHRcdDxidXR0b24gb25DbGljaz17X3RvZ2dsZUhlYWRlcn0+XG5cdFx0XHRcdFx0XHRcdHtmaXJzdFJvd0hlYWRlciA/ICdZZXMnIDogJ05vJ31cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvSGVhZGVyVG9nZ2xlPlxuXHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHQ8L09wdGlvbnM+XG5cblx0XHRcdDxVcGxvYWRFcnJvclxuXHRcdFx0XHRjbGFzc05hbWU9e3dyb25nUGFzc3dvcmQgPyB3cm9uZ1Bhc3N3b3JkLnRvU3RyaW5nKCkgOiB1bmRlZmluZWR9XG5cdFx0XHQ+XG5cdFx0XHRcdOKaoO+4jyBDaGVjayBQYXNzd29yZCBMZW5ndGhcblx0XHRcdDwvVXBsb2FkRXJyb3I+XG5cdFx0PC9TdHlsZWRTZWN0aW9uPlxuXHQpO1xufTtcblxuY29uc3QgU3R5bGVkU2VjdGlvbiA9IHN0eWxlZC5zZWN0aW9uYFxuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgU3R5bGVkRHJvcHpvbmUgPSBzdHlsZWQoRHJvcHpvbmUpYFxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+XG5cdFx0cHJvcHMuZHJhZ2dpbmcgPyBwcm9wcy50aGVtZS5jb2xvci5ibHVlIDogJyNmZmYnfTtcblx0Ym9yZGVyOiBkYXNoZWQgMnB4XG5cdFx0JHtwcm9wcyA9PlxuXHRcdFx0cHJvcHMuZHJhZ2dpbmcgPyBwcm9wcy50aGVtZS5jb2xvci5kYXJrQmx1ZSA6IHByb3BzLnRoZW1lLmNvbG9yLmJvcmRlcn07XG5cdGJvcmRlci1yYWRpdXM6IDVweDtcblx0aGVpZ2h0OiAyNTBweDtcblx0d2lkdGg6IDcwJTtcblx0bWFyZ2luOiBhdXRvO1xuXHRtYXJnaW4tdG9wOiAzcmVtO1xuXG5cdGltZyB7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0aGVpZ2h0OiAyMDBweDtcblx0XHR3aWR0aDogODAlO1xuXHRcdG1hcmdpbjogYXV0bztcblx0fVxuYDtcblxuY29uc3QgU3R5bGVkVGV4dCA9IHN0eWxlZChkZWZhdWx0U3R5bGUpYFxuXHRjb2xvcjogJHtwcm9wcyA9PlxuXHRcdHByb3BzLmRyYWdnaW5nID8gcHJvcHMudGhlbWUuY29sb3IuZGFya0JsdWUgOiBwcm9wcy50aGVtZS5jb2xvci5saWdodFRleHR9O1xuXHRmb250LXNpemU6IDEuMnJlbTtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbmA7XG5cbmNvbnN0IE9wdGlvbnMgPSBzdHlsZWQoQ2FyZClgXG5cdHBhZGRpbmctdG9wOiAxLjc1cmVtO1xuXHRwYWRkaW5nLWJvdHRvbTogMS43NXJlbTtcblxuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRmbGV4LXdyYXA6IHdyYXA7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtZXZlbmx5O1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHR3aWR0aDogNzAlO1xuXHRtYXJnaW46IGF1dG87XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0bWFyZ2luLXRvcDogMy41cmVtO1xuXG5cdGlucHV0IHtcblx0XHRtYXJnaW46IDAgMnJlbSAwIDAuMjVyZW07XG5cdFx0cGFkZGluZy1sZWZ0OiAxcmVtO1xuXHRcdHdpZHRoOiAxNDBweDtcblx0XHRmb250LXNpemU6IDAuOXJlbTtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdGhlaWdodDogMjVweDtcblxuXHRcdDo6cGxhY2Vob2xkZXIge1xuXHRcdFx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYmFja2dyb3VuZERhcmtlc3R9O1xuXHRcdH1cblx0fVxuXG5cdHNlbGVjdCB7XG5cdFx0bWFyZ2luLWxlZnQ6IDAuMjVyZW07XG5cdH1cbmA7XG5cbmNvbnN0IEhlYWRlclRvZ2dsZSA9IHN0eWxlZC5sYWJlbGBcblx0bWFyZ2luLWxlZnQ6IDJyZW07XG5cblx0YnV0dG9uIHtcblx0XHRjb2xvcjogd2hpdGU7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0YmFja2dyb3VuZDogJHtwcm9wcyA9PlxuXHRcdFx0cHJvcHMuYWN0aXZlXG5cdFx0XHRcdD8gcHJvcHMudGhlbWUuZ3JhZGllbnQuZ3JlZW5CbHVlXG5cdFx0XHRcdDogcHJvcHMudGhlbWUuY29sb3IuYmFja2dyb3VuZERhcmtlc3R9O1xuXHRcdGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gKHByb3BzLmFjdGl2ZSA/IHByb3BzLnRoZW1lLmJveFNoYWRvdyA6ICcnKX07XG5cdFx0Ym9yZGVyOiBub25lO1xuXHRcdGZvbnQtZmFtaWx5OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnQubWFpbn07XG5cdFx0Zm9udC1zaXplOiAxcmVtO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRtYXJnaW4tbGVmdDogMXJlbTtcblx0XHRwYWRkaW5nLXRvcDogNXB4O1xuXHRcdHBhZGRpbmctYm90dG9tOiA1cHg7XG5cdFx0d2lkdGg6IDcwcHg7XG5cdH1cbmA7XG5cbkZpbGVkcm9wLnByb3BUeXBlcyA9IHtcblx0Zmlyc3RSb3dIZWFkZXI6IFByb3BUeXBlcy5ib29sLFxuXHRleHBpcmVJbjogUHJvcFR5cGVzLm51bWJlcixcblx0c2V0RXhwaXJlSW46IFByb3BUeXBlcy5mdW5jLFxuXHRzZXRIZWFkZXI6IFByb3BUeXBlcy5mdW5jLFxuXHRwYXNzd29yZDogUHJvcFR5cGVzLnN0cmluZyxcblx0c2V0UGFzc3dvcmQ6IFByb3BUeXBlcy5mdW5jLFxuXHRvbkRyb3A6IFByb3BUeXBlcy5mdW5jLFxufTtcblxuY29uc3QgVXBsb2FkRXJyb3IgPSBzdHlsZWQoRXJyb3JEaWFsb2cpYFxuXHRtaW4td2lkdGg6IDIwMHB4O1xuXHR3aWR0aDogZml0LWNvbnRlbnQ7XG5cdG1hcmdpbi10b3A6IDJyZW07XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBGaWxlZHJvcDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/components/Filedrop/Filedrop.js\n"
				);

				/***/
			},

		/***/ './frontend/components/Footer/Footer.js':
			/*!**********************************************!*\
  !*** ./frontend/components/Footer/Footer.js ***!
  \**********************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.default = Footer;\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/** @function\n * @name Footer\n * Bottom footer element of page - always viewable\n *\n * @returns {JSX}\n */\nfunction Footer() {\n\treturn _react2.default.createElement(\n\t\tStyledfooter,\n\t\tnull,\n\t\t'Created by',\n\t\t' ',\n\t\t_react2.default.createElement(\n\t\t\t'a',\n\t\t\t{ href: 'https://www.alekshnayder.com/', target: '_blank', rel: 'noopener' },\n\t\t\t'Alek Shnayder'\n\t\t)\n\t);\n}\n\nvar Styledfooter = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'Footer__Styledfooter',\n\tcomponentId: 'd380t0-0'\n})(['box-sizing:border-box;padding:1rem;padding-top:1.25rem;text-align:center;width:100%;& a{color:', ';}'], function (props) {\n\treturn props.theme.color.text;\n});\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(Footer, 'Footer', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Footer/Footer.js');\n\treactHotLoader.register(Styledfooter, 'Styledfooter', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Footer/Footer.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuanM/MGE0NyJdLCJuYW1lcyI6WyJGb290ZXIiLCJTdHlsZWRmb290ZXIiLCJkZWZhdWx0U3R5bGUiLCJwcm9wcyIsInRoZW1lIiwiY29sb3IiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFVd0JBLE07O0FBVnhCOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7O0FBTWUsU0FBU0EsTUFBVCxHQUFrQjtBQUNoQyxRQUNDO0FBQUMsY0FBRDtBQUFBO0FBQUE7QUFDWSxLQURaO0FBRUM7QUFBQTtBQUFBLEtBQUcsTUFBSywrQkFBUixFQUF3QyxRQUFPLFFBQS9DLEVBQXdELEtBQUksVUFBNUQ7QUFBQTtBQUFBO0FBRkQsRUFERDtBQVFBOztBQUVELElBQU1DLGVBQWUsZ0NBQU9DLHNCQUFQLENBQWY7QUFBQTtBQUFBO0FBQUEsNkdBUUs7QUFBQSxRQUFTQyxNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JDLElBQTNCO0FBQUEsQ0FSTCxDQUFOOzs7Ozs7Ozs7O3lCQVh3Qk4sTTt5QkFXbEJDLFkiLCJmaWxlIjoiLi9mcm9udGVuZC9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgZGVmYXVsdFN0eWxlIGZyb20gJy4uLy4uL2RlZmF1bHRTdHlsZSc7XG5cbi8qKiBAZnVuY3Rpb25cbiAqIEBuYW1lIEZvb3RlclxuICogQm90dG9tIGZvb3RlciBlbGVtZW50IG9mIHBhZ2UgLSBhbHdheXMgdmlld2FibGVcbiAqXG4gKiBAcmV0dXJucyB7SlNYfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIoKSB7XG5cdHJldHVybiAoXG5cdFx0PFN0eWxlZGZvb3Rlcj5cblx0XHRcdENyZWF0ZWQgYnl7JyAnfVxuXHRcdFx0PGEgaHJlZj1cImh0dHBzOi8vd3d3LmFsZWtzaG5heWRlci5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5cblx0XHRcdFx0QWxlayBTaG5heWRlclxuXHRcdFx0PC9hPlxuXHRcdDwvU3R5bGVkZm9vdGVyPlxuXHQpO1xufVxuXG5jb25zdCBTdHlsZWRmb290ZXIgPSBzdHlsZWQoZGVmYXVsdFN0eWxlKWBcblx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0cGFkZGluZzogMXJlbTtcblx0cGFkZGluZy10b3A6IDEuMjVyZW07XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0d2lkdGg6IDEwMCU7XG5cblx0JiBhIHtcblx0XHRjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci50ZXh0fTtcblx0fVxuYDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/components/Footer/Footer.js\n"
				);

				/***/
			},

		/***/ './frontend/components/GQLExample/GQLExample.js':
			/*!******************************************************!*\
  !*** ./frontend/components/GQLExample/GQLExample.js ***!
  \******************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.GQLExample = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/**\n * @function\n * Card providing link to GraphQL api endpoint & body of sheet\n * @param {string} - props.host - host origin\n * @param {string} - props.id - sheet ID\n * @returns {jsx} <RestExample />\n */\nvar GQLExample = function GQLExample(_ref) {\n\tvar host = _ref.host,\n\t    id = _ref.id;\n\treturn _react2.default.createElement(\n\t\t_defaultStyle.ApiCard,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\t'p',\n\t\t\tnull,\n\t\t\t_react2.default.createElement(\n\t\t\t\t'span',\n\t\t\t\t{ className: 'pill' },\n\t\t\t\t'GraphQL API:'\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t'a',\n\t\t\t\t{ href: host + '/graphql', target: '_blank' },\n\t\t\t\thost,\n\t\t\t\t'/graphql'\n\t\t\t)\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\t'p',\n\t\t\t{ className: 'query_title' },\n\t\t\t' ',\n\t\t\t_react2.default.createElement(\n\t\t\t\t'span',\n\t\t\t\t{ className: 'pill-secondary' },\n\t\t\t\t'Body:'\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t'span',\n\t\t\t\t{ className: 'gql_query' },\n\t\t\t\t'{',\n\t\t\t\t'sheet( _id: \"',\n\t\t\t\tid,\n\t\t\t\t'\" )',\n\t\t\t\t'{',\n\t\t\t\t'sheetData',\n\t\t\t\t'}',\n\t\t\t\t'}'\n\t\t\t)\n\t\t)\n\t);\n};\n\nGQLExample.propTypes = {\n\thost: _propTypes2.default.string.isRequired,\n\tid: _propTypes2.default.string.isRequired\n};\n\nexports.GQLExample = GQLExample;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(GQLExample, 'GQLExample', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/GQLExample/GQLExample.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL0dRTEV4YW1wbGUvR1FMRXhhbXBsZS5qcz9iZDE4Il0sIm5hbWVzIjpbIkdRTEV4YW1wbGUiLCJob3N0IiwiaWQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7QUFFQTs7Ozs7OztBQU9BLElBQU1BLGFBQWEsU0FBYkEsVUFBYTtBQUFBLEtBQUdDLElBQUgsUUFBR0EsSUFBSDtBQUFBLEtBQVNDLEVBQVQsUUFBU0EsRUFBVDtBQUFBLFFBQ2xCO0FBQUMsdUJBQUQ7QUFBQTtBQUNDO0FBQUE7QUFBQTtBQUNDO0FBQUE7QUFBQSxNQUFNLFdBQVUsTUFBaEI7QUFBQTtBQUFBLElBREQ7QUFFQztBQUFBO0FBQUEsTUFBRyxNQUFTRCxJQUFULGFBQUgsRUFBNEIsUUFBTyxRQUFuQztBQUNFQSxRQURGO0FBQUE7QUFBQTtBQUZELEdBREQ7QUFPQztBQUFBO0FBQUEsS0FBRyxXQUFVLGFBQWI7QUFDRSxNQURGO0FBRUM7QUFBQTtBQUFBLE1BQU0sV0FBVSxnQkFBaEI7QUFBQTtBQUFBLElBRkQ7QUFHQztBQUFBO0FBQUEsTUFBTSxXQUFVLFdBQWhCO0FBQ0UsT0FERjtBQUFBO0FBRWVDLE1BRmY7QUFBQTtBQUVzQixPQUZ0QjtBQUFBO0FBSUUsT0FKRjtBQUtFO0FBTEY7QUFIRDtBQVBELEVBRGtCO0FBQUEsQ0FBbkI7O0FBc0JBRixXQUFXRyxTQUFYLEdBQXVCO0FBQ3RCRixPQUFNRyxvQkFBVUMsTUFBVixDQUFpQkMsVUFERDtBQUV0QkosS0FBSUUsb0JBQVVDLE1BQVYsQ0FBaUJDO0FBRkMsQ0FBdkI7O1FBS1NOLFUsR0FBQUEsVTs7Ozs7Ozs7Ozt5QkEzQkhBLFUiLCJmaWxlIjoiLi9mcm9udGVuZC9jb21wb25lbnRzL0dRTEV4YW1wbGUvR1FMRXhhbXBsZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQXBpQ2FyZCB9IGZyb20gJy4uLy4uL2RlZmF1bHRTdHlsZSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBDYXJkIHByb3ZpZGluZyBsaW5rIHRvIEdyYXBoUUwgYXBpIGVuZHBvaW50ICYgYm9keSBvZiBzaGVldFxuICogQHBhcmFtIHtzdHJpbmd9IC0gcHJvcHMuaG9zdCAtIGhvc3Qgb3JpZ2luXG4gKiBAcGFyYW0ge3N0cmluZ30gLSBwcm9wcy5pZCAtIHNoZWV0IElEXG4gKiBAcmV0dXJucyB7anN4fSA8UmVzdEV4YW1wbGUgLz5cbiAqL1xuY29uc3QgR1FMRXhhbXBsZSA9ICh7IGhvc3QsIGlkIH0pID0+IChcblx0PEFwaUNhcmQ+XG5cdFx0PHA+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJwaWxsXCI+R3JhcGhRTCBBUEk6PC9zcGFuPlxuXHRcdFx0PGEgaHJlZj17YCR7aG9zdH0vZ3JhcGhxbGB9IHRhcmdldD1cIl9ibGFua1wiPlxuXHRcdFx0XHR7aG9zdH0vZ3JhcGhxbFxuXHRcdFx0PC9hPlxuXHRcdDwvcD5cblx0XHQ8cCBjbGFzc05hbWU9XCJxdWVyeV90aXRsZVwiPlxuXHRcdFx0eycgJ31cblx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cInBpbGwtc2Vjb25kYXJ5XCI+Qm9keTo8L3NwYW4+XG5cdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJncWxfcXVlcnlcIj5cblx0XHRcdFx0eyd7J31cblx0XHRcdFx0c2hlZXQoIF9pZDogXCJ7aWR9XCIgKXsneyd9XG5cdFx0XHRcdHNoZWV0RGF0YVxuXHRcdFx0XHR7J30nfVxuXHRcdFx0XHR7J30nfVxuXHRcdFx0PC9zcGFuPlxuXHRcdDwvcD5cblx0PC9BcGlDYXJkPlxuKTtcblxuR1FMRXhhbXBsZS5wcm9wVHlwZXMgPSB7XG5cdGhvc3Q6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0aWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCB7IEdRTEV4YW1wbGUgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/components/GQLExample/GQLExample.js\n"
				);

				/***/
			},

		/***/ './frontend/components/Header/Header.js':
			/*!**********************************************!*\
  !*** ./frontend/components/Header/Header.js ***!
  \**********************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/**\n * @function\n * @name Header\n * Top header element of page - always viewable\n *\n * @returns {JSX}\n */\nvar Header = function Header(props) {\n\tvar _useState = (0, _react.useState)('large'),\n\t    _useState2 = _slicedToArray(_useState, 2),\n\t    headerSize = _useState2[0],\n\t    setHeaderSize = _useState2[1];\n\n\t(0, _react.useEffect)(function () {\n\t\twindow.addEventListener('scroll', _handleScroll);\n\n\t\treturn function () {\n\t\t\twindow.removeEventListener('scroll', _handleScroll);\n\t\t};\n\t});\n\n\t/**\n  * @function\n  * Updates headerSize state\n  * depending on how far scrolled from top\n  */\n\tvar _handleScroll = function _handleScroll() {\n\t\tvar scrollTop = document.documentElement.scrollTop;\n\t\tvar resize = 50; //distance from top in px at which to resize header\n\n\t\tif (scrollTop > resize && headerSize !== 'small') {\n\t\t\tsetHeaderSize('small');\n\t\t} else if (scrollTop <= resize && headerSize !== 'large') {\n\t\t\tsetHeaderSize('large');\n\t\t}\n\t};\n\n\treturn _react2.default.createElement(\n\t\tNav,\n\t\t{ className: headerSize },\n\t\t_react2.default.createElement(\n\t\t\t_reactRouterDom.Link,\n\t\t\t{ to: '/' },\n\t\t\t_react2.default.createElement('img', { src: './assets/images/logo.svg', alt: 'logo' }),\n\t\t\t' ',\n\t\t\t_react2.default.createElement(\n\t\t\t\t'h1',\n\t\t\t\tnull,\n\t\t\t\t'SwiftSheet'\n\t\t\t)\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\tTagline,\n\t\t\t{ className: 'tagline' },\n\t\t\t_react2.default.createElement(\n\t\t\t\t'h2',\n\t\t\t\tnull,\n\t\t\t\t'Fast and ephemeral data sharing.'\n\t\t\t)\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\tNavSection,\n\t\t\t{ className: headerSize },\n\t\t\t_react2.default.createElement(\n\t\t\t\tStyledNavLink,\n\t\t\t\t{ to: '/upload' },\n\t\t\t\t'Upload'\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\tStyledNavLink,\n\t\t\t\t{ to: '/view' },\n\t\t\t\t'View'\n\t\t\t)\n\t\t)\n\t);\n};\n\nvar Nav = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'Header__Nav',\n\tcomponentId: 'sc-10rcavb-0'\n})(['position:fixed;border-bottom:solid 1px ', ';padding:0.8rem;transition:all 0.3s;width:100%;z-index:50;a{text-decoration:none;}& img,h1{display:inline;transition:all 0.3s;}& img{height:50px;}& h1{font-family:', ';font-size:2.5rem;letter-spacing:4px;margin-left:0.5rem;position:relative;top:-0.7rem;color:', ';}&.small{padding:0.4rem;padding-left:0.8rem;padding-bottom:0.15rem;img{height:25px;}h1{font-size:1.5rem;top:-0.3rem;}.tagline{display:none;}}'], function (props) {\n\treturn props.theme.color.border;\n}, function (props) {\n\treturn props.theme.font.header;\n}, function (props) {\n\treturn props.theme.color.text;\n});\n\nvar NavSection = _styledComponents2.default.ul.withConfig({\n\tdisplayName: 'Header__NavSection',\n\tcomponentId: 'sc-10rcavb-1'\n})(['position:absolute;top:1.75rem;right:2rem;transition:all 0.3s;&.small{top:0.6rem;}&.small *{font-size:1rem;}']);\n\nvar StyledNavLink = (0, _styledComponents2.default)(_reactRouterDom.NavLink).withConfig({\n\tdisplayName: 'Header__StyledNavLink',\n\tcomponentId: 'sc-10rcavb-2'\n})(['font-size:1.25rem;color:', ';padding-right:2rem;padding-left:2rem;transition:all 0.3s;border-left:solid 1px ', ';&.active{font-weight:500;color:', ';}@media (max-width:550px){&{font-size:1.1rem;padding-right:1rem;padding-left:1rem;}}'], function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.color.border;\n}, function (props) {\n\treturn props.theme.color.red;\n});\n\nvar Tagline = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'Header__Tagline',\n\tcomponentId: 'sc-10rcavb-3'\n})(['color:', ';position:absolute;display:inline-block;margin-left:2rem;margin-top:0.5rem;padding:0.75rem 2rem;border-left:solid 1px ', ';@media (max-width:835px){&{display:none;}}'], function (props) {\n\treturn props.theme.color.lightText;\n}, function (props) {\n\treturn props.theme.color.border;\n});\n\nvar _default = Header;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(Header, 'Header', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js');\n\treactHotLoader.register(Nav, 'Nav', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js');\n\treactHotLoader.register(NavSection, 'NavSection', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js');\n\treactHotLoader.register(StyledNavLink, 'StyledNavLink', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js');\n\treactHotLoader.register(Tagline, 'Tagline', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/Header/Header.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL0hlYWRlci9IZWFkZXIuanM/YzUwYiJdLCJuYW1lcyI6WyJIZWFkZXIiLCJoZWFkZXJTaXplIiwic2V0SGVhZGVyU2l6ZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJfaGFuZGxlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNjcm9sbFRvcCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50IiwicmVzaXplIiwiTmF2IiwiZGVmYXVsdFN0eWxlIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9yIiwiYm9yZGVyIiwiZm9udCIsImhlYWRlciIsInRleHQiLCJOYXZTZWN0aW9uIiwic3R5bGVkIiwidWwiLCJTdHlsZWROYXZMaW5rIiwiTmF2TGluayIsInJlZCIsIlRhZ2xpbmUiLCJkaXYiLCJsaWdodFRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7OztBQUVBOzs7Ozs7O0FBT0EsSUFBTUEsU0FBUyxTQUFUQSxNQUFTLFFBQVM7QUFBQSxpQkFDYSxxQkFBUyxPQUFULENBRGI7QUFBQTtBQUFBLEtBQ2hCQyxVQURnQjtBQUFBLEtBQ0pDLGFBREk7O0FBR3ZCLHVCQUFVLFlBQU07QUFDZkMsU0FBT0MsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0NDLGFBQWxDOztBQUVBLFNBQU8sWUFBTTtBQUNaRixVQUFPRyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQ0QsYUFBckM7QUFDQSxHQUZEO0FBR0EsRUFORDs7QUFRQTs7Ozs7QUFLQSxLQUFNQSxnQkFBZ0IsU0FBaEJBLGFBQWdCLEdBQU07QUFDM0IsTUFBTUUsWUFBWUMsU0FBU0MsZUFBVCxDQUF5QkYsU0FBM0M7QUFDQSxNQUFNRyxTQUFTLEVBQWYsQ0FGMkIsQ0FFUjs7QUFFbkIsTUFBSUgsWUFBWUcsTUFBWixJQUFzQlQsZUFBZSxPQUF6QyxFQUFrRDtBQUNqREMsaUJBQWMsT0FBZDtBQUNBLEdBRkQsTUFFTyxJQUFJSyxhQUFhRyxNQUFiLElBQXVCVCxlQUFlLE9BQTFDLEVBQW1EO0FBQ3pEQyxpQkFBYyxPQUFkO0FBQ0E7QUFDRCxFQVREOztBQVdBLFFBQ0M7QUFBQyxLQUFEO0FBQUEsSUFBSyxXQUFXRCxVQUFoQjtBQUNDO0FBQUMsdUJBQUQ7QUFBQSxLQUFNLElBQUcsR0FBVDtBQUNDLDBDQUFLLEtBQUksMEJBQVQsRUFBb0MsS0FBSSxNQUF4QyxHQUREO0FBQUE7QUFDbUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURuRCxHQUREO0FBSUM7QUFBQyxVQUFEO0FBQUEsS0FBUyxXQUFVLFNBQW5CO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURELEdBSkQ7QUFRQztBQUFDLGFBQUQ7QUFBQSxLQUFZLFdBQVdBLFVBQXZCO0FBQ0M7QUFBQyxpQkFBRDtBQUFBLE1BQWUsSUFBRyxTQUFsQjtBQUFBO0FBQUEsSUFERDtBQUVDO0FBQUMsaUJBQUQ7QUFBQSxNQUFlLElBQUcsT0FBbEI7QUFBQTtBQUFBO0FBRkQ7QUFSRCxFQUREO0FBZUEsQ0ExQ0Q7O0FBNENBLElBQU1VLE1BQU0sZ0NBQU9DLHNCQUFQLENBQU47QUFBQTtBQUFBO0FBQUEseWNBRXNCO0FBQUEsUUFBU0MsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCQyxNQUEzQjtBQUFBLENBRnRCLEVBcUJXO0FBQUEsUUFBU0gsTUFBTUMsS0FBTixDQUFZRyxJQUFaLENBQWlCQyxNQUExQjtBQUFBLENBckJYLEVBMkJLO0FBQUEsUUFBU0wsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCSSxJQUEzQjtBQUFBLENBM0JMLENBQU47O0FBZ0RBLElBQU1DLGFBQWFDLDJCQUFPQyxFQUFwQjtBQUFBO0FBQUE7QUFBQSxtSEFBTjs7QUFhQSxJQUFNQyxnQkFBZ0IsZ0NBQU9DLHVCQUFQLENBQWhCO0FBQUE7QUFBQTtBQUFBLGtQQUVJO0FBQUEsUUFBU1gsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCSSxJQUEzQjtBQUFBLENBRkosRUFNb0I7QUFBQSxRQUFTTixNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JDLE1BQTNCO0FBQUEsQ0FOcEIsRUFVSztBQUFBLFFBQVNILE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQlUsR0FBM0I7QUFBQSxDQVZMLENBQU47O0FBc0JBLElBQU1DLFVBQVVMLDJCQUFPTSxHQUFqQjtBQUFBO0FBQUE7QUFBQSx3TEFDSTtBQUFBLFFBQVNkLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQmEsU0FBM0I7QUFBQSxDQURKLEVBT29CO0FBQUEsUUFBU2YsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCQyxNQUEzQjtBQUFBLENBUHBCLENBQU47O2VBZ0JlaEIsTTs7Ozs7Ozs7Ozs7eUJBL0lUQSxNO3lCQTRDQVcsRzt5QkFnREFTLFU7eUJBYUFHLGE7eUJBc0JBRyxPIiwiZmlsZSI6Ii4vZnJvbnRlbmQvY29tcG9uZW50cy9IZWFkZXIvSGVhZGVyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBkZWZhdWx0U3R5bGUgZnJvbSAnLi4vLi4vZGVmYXVsdFN0eWxlJztcbmltcG9ydCB7IExpbmssIE5hdkxpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIEhlYWRlclxuICogVG9wIGhlYWRlciBlbGVtZW50IG9mIHBhZ2UgLSBhbHdheXMgdmlld2FibGVcbiAqXG4gKiBAcmV0dXJucyB7SlNYfVxuICovXG5jb25zdCBIZWFkZXIgPSBwcm9wcyA9PiB7XG5cdGNvbnN0IFtoZWFkZXJTaXplLCBzZXRIZWFkZXJTaXplXSA9IHVzZVN0YXRlKCdsYXJnZScpO1xuXG5cdHVzZUVmZmVjdCgoKSA9PiB7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIF9oYW5kbGVTY3JvbGwpO1xuXG5cdFx0cmV0dXJuICgpID0+IHtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBfaGFuZGxlU2Nyb2xsKTtcblx0XHR9O1xuXHR9KTtcblxuXHQvKipcblx0ICogQGZ1bmN0aW9uXG5cdCAqIFVwZGF0ZXMgaGVhZGVyU2l6ZSBzdGF0ZVxuXHQgKiBkZXBlbmRpbmcgb24gaG93IGZhciBzY3JvbGxlZCBmcm9tIHRvcFxuXHQgKi9cblx0Y29uc3QgX2hhbmRsZVNjcm9sbCA9ICgpID0+IHtcblx0XHRjb25zdCBzY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuXHRcdGNvbnN0IHJlc2l6ZSA9IDUwOyAvL2Rpc3RhbmNlIGZyb20gdG9wIGluIHB4IGF0IHdoaWNoIHRvIHJlc2l6ZSBoZWFkZXJcblxuXHRcdGlmIChzY3JvbGxUb3AgPiByZXNpemUgJiYgaGVhZGVyU2l6ZSAhPT0gJ3NtYWxsJykge1xuXHRcdFx0c2V0SGVhZGVyU2l6ZSgnc21hbGwnKTtcblx0XHR9IGVsc2UgaWYgKHNjcm9sbFRvcCA8PSByZXNpemUgJiYgaGVhZGVyU2l6ZSAhPT0gJ2xhcmdlJykge1xuXHRcdFx0c2V0SGVhZGVyU2l6ZSgnbGFyZ2UnKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8TmF2IGNsYXNzTmFtZT17aGVhZGVyU2l6ZX0+XG5cdFx0XHQ8TGluayB0bz1cIi9cIj5cblx0XHRcdFx0PGltZyBzcmM9XCIuL2Fzc2V0cy9pbWFnZXMvbG9nby5zdmdcIiBhbHQ9XCJsb2dvXCIgLz4gPGgxPlN3aWZ0U2hlZXQ8L2gxPlxuXHRcdFx0PC9MaW5rPlxuXHRcdFx0PFRhZ2xpbmUgY2xhc3NOYW1lPVwidGFnbGluZVwiPlxuXHRcdFx0XHQ8aDI+RmFzdCBhbmQgZXBoZW1lcmFsIGRhdGEgc2hhcmluZy48L2gyPlxuXHRcdFx0PC9UYWdsaW5lPlxuXG5cdFx0XHQ8TmF2U2VjdGlvbiBjbGFzc05hbWU9e2hlYWRlclNpemV9PlxuXHRcdFx0XHQ8U3R5bGVkTmF2TGluayB0bz1cIi91cGxvYWRcIj5VcGxvYWQ8L1N0eWxlZE5hdkxpbms+XG5cdFx0XHRcdDxTdHlsZWROYXZMaW5rIHRvPVwiL3ZpZXdcIj5WaWV3PC9TdHlsZWROYXZMaW5rPlxuXHRcdFx0PC9OYXZTZWN0aW9uPlxuXHRcdDwvTmF2PlxuXHQpO1xufTtcblxuY29uc3QgTmF2ID0gc3R5bGVkKGRlZmF1bHRTdHlsZSlgXG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0Ym9yZGVyLWJvdHRvbTogc29saWQgMXB4ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYm9yZGVyfTtcblx0cGFkZGluZzogMC44cmVtO1xuXHR0cmFuc2l0aW9uOiBhbGwgMC4zcztcblx0d2lkdGg6IDEwMCU7XG5cdHotaW5kZXg6IDUwO1xuXG5cdGEge1xuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0fVxuXG5cdCYgaW1nLFxuXHRoMSB7XG5cdFx0ZGlzcGxheTogaW5saW5lO1xuXHRcdHRyYW5zaXRpb246IGFsbCAwLjNzO1xuXHR9XG5cdCYgaW1nIHtcblx0XHRoZWlnaHQ6IDUwcHg7XG5cdH1cblx0JiBoMSB7XG5cdFx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5oZWFkZXJ9O1xuXHRcdGZvbnQtc2l6ZTogMi41cmVtO1xuXHRcdGxldHRlci1zcGFjaW5nOiA0cHg7XG5cdFx0bWFyZ2luLWxlZnQ6IDAuNXJlbTtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0dG9wOiAtMC43cmVtO1xuXHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnRleHR9O1xuXHR9XG5cblx0Ji5zbWFsbCB7XG5cdFx0cGFkZGluZzogMC40cmVtO1xuXHRcdHBhZGRpbmctbGVmdDogMC44cmVtO1xuXHRcdHBhZGRpbmctYm90dG9tOiAwLjE1cmVtO1xuXG5cdFx0aW1nIHtcblx0XHRcdGhlaWdodDogMjVweDtcblx0XHR9XG5cdFx0aDEge1xuXHRcdFx0Zm9udC1zaXplOiAxLjVyZW07XG5cdFx0XHR0b3A6IC0wLjNyZW07XG5cdFx0fVxuXHRcdC50YWdsaW5lIHtcblx0XHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0fVxuXHR9XG5gO1xuXG5jb25zdCBOYXZTZWN0aW9uID0gc3R5bGVkLnVsYFxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMS43NXJlbTtcblx0cmlnaHQ6IDJyZW07XG5cdHRyYW5zaXRpb246IGFsbCAwLjNzO1xuXHQmLnNtYWxsIHtcblx0XHR0b3A6IDAuNnJlbTtcblx0fVxuXHQmLnNtYWxsICoge1xuXHRcdGZvbnQtc2l6ZTogMXJlbTtcblx0fVxuYDtcblxuY29uc3QgU3R5bGVkTmF2TGluayA9IHN0eWxlZChOYXZMaW5rKWBcblx0Zm9udC1zaXplOiAxLjI1cmVtO1xuXHRjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci50ZXh0fTtcblx0cGFkZGluZy1yaWdodDogMnJlbTtcblx0cGFkZGluZy1sZWZ0OiAycmVtO1xuXHR0cmFuc2l0aW9uOiBhbGwgMC4zcztcblx0Ym9yZGVyLWxlZnQ6IHNvbGlkIDFweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJvcmRlcn07XG5cblx0Ji5hY3RpdmUge1xuXHRcdGZvbnQtd2VpZ2h0OiA1MDA7XG5cdFx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IucmVkfTtcblx0fVxuXG5cdEBtZWRpYSAobWF4LXdpZHRoOiA1NTBweCkge1xuXHRcdCYge1xuXHRcdFx0Zm9udC1zaXplOiAxLjFyZW07XG5cdFx0XHRwYWRkaW5nLXJpZ2h0OiAxcmVtO1xuXHRcdFx0cGFkZGluZy1sZWZ0OiAxcmVtO1xuXHRcdH1cblx0fVxuYDtcblxuY29uc3QgVGFnbGluZSA9IHN0eWxlZC5kaXZgXG5cdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmxpZ2h0VGV4dH07XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRtYXJnaW4tbGVmdDogMnJlbTtcblx0bWFyZ2luLXRvcDogMC41cmVtO1xuXHRwYWRkaW5nOiAwLjc1cmVtIDJyZW07XG5cdGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5ib3JkZXJ9O1xuXG5cdEBtZWRpYSAobWF4LXdpZHRoOiA4MzVweCkge1xuXHRcdCYge1xuXHRcdFx0ZGlzcGxheTogbm9uZTtcblx0XHR9XG5cdH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IEhlYWRlcjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/components/Header/Header.js\n"
				);

				/***/
			},

		/***/ './frontend/components/IllustratedStep/IllustratedStep.js':
			/*!****************************************************************!*\
  !*** ./frontend/components/IllustratedStep/IllustratedStep.js ***!
  \****************************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.IllustratedStep = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/** @function\n * @name IllustratedStep\n * Step with header body text and provided illustration;\n *\n * @returns {JSX}\n */\nvar IllustratedStep = function IllustratedStep(_ref) {\n\tvar header = _ref.header,\n\t    graphicPath = _ref.graphicPath,\n\t    body = _ref.body,\n\t    step = _ref.step,\n\t    children = _ref.children;\n\n\treturn _react2.default.createElement(\n\t\tStyledSection,\n\t\tnull,\n\t\t_react2.default.createElement('img', { src: graphicPath, alt: 'illustration', width: '180' }),\n\t\t_react2.default.createElement(\n\t\t\t'header',\n\t\t\tnull,\n\t\t\t_react2.default.createElement(\n\t\t\t\t'h2',\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'span',\n\t\t\t\t\t{ className: 'step' },\n\t\t\t\t\tstep\n\t\t\t\t),\n\t\t\t\t' ',\n\t\t\t\theader\n\t\t\t)\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\t'p',\n\t\t\tnull,\n\t\t\tchildren\n\t\t)\n\t);\n};\n\nvar StyledSection = _styledComponents2.default.section.withConfig({\n\tdisplayName: 'IllustratedStep__StyledSection',\n\tcomponentId: 'sc-108b0jo-0'\n})(['margin:auto;padding-top:4rem;padding-bottom:4rem;img{float:left;margin-right:4rem;}header{padding-top:10px;}h2{font-weight:500;font-size:1.4rem;letter-spacing:1px;line-height:175%;}p{margin-top:1.5rem;margin-left:20.5rem;font-size:1rem;line-height:175%;max-width:600px;}a{color:', ';}.step{border:solid 1px ', ';border-radius:40px;padding:0.5rem 1.5rem;font-weight:400;margin-right:0.75rem;}.highlight{color:#333;font-weight:500;}@media (max-width:1200px){width:90%;}@media (max-width:900px){width:98%;p{margin-top:0.5rem;margin-left:12rem;line-height:150%;}}@media (max-width:750px){img{display:block;float:none;width:40%;margin:auto;}p{margin-left:0.5rem;}}'], function (props) {\n\treturn props.theme.color.red;\n}, function (props) {\n\treturn props.theme.color.text;\n});\n\nexports.IllustratedStep = IllustratedStep;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(IllustratedStep, 'IllustratedStep', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/IllustratedStep/IllustratedStep.js');\n\treactHotLoader.register(StyledSection, 'StyledSection', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/IllustratedStep/IllustratedStep.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL0lsbHVzdHJhdGVkU3RlcC9JbGx1c3RyYXRlZFN0ZXAuanM/YWM2MSJdLCJuYW1lcyI6WyJJbGx1c3RyYXRlZFN0ZXAiLCJoZWFkZXIiLCJncmFwaGljUGF0aCIsImJvZHkiLCJzdGVwIiwiY2hpbGRyZW4iLCJTdHlsZWRTZWN0aW9uIiwic3R5bGVkIiwic2VjdGlvbiIsInByb3BzIiwidGhlbWUiLCJjb2xvciIsInJlZCIsInRleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7OztBQUVBOzs7Ozs7QUFNQSxJQUFNQSxrQkFBa0IsU0FBbEJBLGVBQWtCLE9BQW1EO0FBQUEsS0FBaERDLE1BQWdELFFBQWhEQSxNQUFnRDtBQUFBLEtBQXhDQyxXQUF3QyxRQUF4Q0EsV0FBd0M7QUFBQSxLQUEzQkMsSUFBMkIsUUFBM0JBLElBQTJCO0FBQUEsS0FBckJDLElBQXFCLFFBQXJCQSxJQUFxQjtBQUFBLEtBQWZDLFFBQWUsUUFBZkEsUUFBZTs7QUFDMUUsUUFDQztBQUFDLGVBQUQ7QUFBQTtBQUNDLHlDQUFLLEtBQUtILFdBQVYsRUFBdUIsS0FBSSxjQUEzQixFQUEwQyxPQUFNLEtBQWhELEdBREQ7QUFFQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFDQztBQUFBO0FBQUEsT0FBTSxXQUFVLE1BQWhCO0FBQXdCRTtBQUF4QixLQUREO0FBQUE7QUFDdUNIO0FBRHZDO0FBREQsR0FGRDtBQU9DO0FBQUE7QUFBQTtBQUFJSTtBQUFKO0FBUEQsRUFERDtBQVdBLENBWkQ7O0FBY0EsSUFBTUMsZ0JBQWdCQywyQkFBT0MsT0FBdkI7QUFBQTtBQUFBO0FBQUEsNHBCQTZCSztBQUFBLFFBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQkMsR0FBM0I7QUFBQSxDQTdCTCxFQWlDZ0I7QUFBQSxRQUFTSCxNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JFLElBQTNCO0FBQUEsQ0FqQ2hCLENBQU47O1FBd0VTYixlLEdBQUFBLGU7Ozs7Ozs7Ozs7eUJBdEZIQSxlO3lCQWNBTSxhIiwiZmlsZSI6Ii4vZnJvbnRlbmQvY29tcG9uZW50cy9JbGx1c3RyYXRlZFN0ZXAvSWxsdXN0cmF0ZWRTdGVwLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuXG4vKiogQGZ1bmN0aW9uXG4gKiBAbmFtZSBJbGx1c3RyYXRlZFN0ZXBcbiAqIFN0ZXAgd2l0aCBoZWFkZXIgYm9keSB0ZXh0IGFuZCBwcm92aWRlZCBpbGx1c3RyYXRpb247XG4gKlxuICogQHJldHVybnMge0pTWH1cbiAqL1xuY29uc3QgSWxsdXN0cmF0ZWRTdGVwID0gKHsgaGVhZGVyLCBncmFwaGljUGF0aCwgYm9keSwgc3RlcCwgY2hpbGRyZW4gfSkgPT4ge1xuXHRyZXR1cm4gKFxuXHRcdDxTdHlsZWRTZWN0aW9uPlxuXHRcdFx0PGltZyBzcmM9e2dyYXBoaWNQYXRofSBhbHQ9XCJpbGx1c3RyYXRpb25cIiB3aWR0aD1cIjE4MFwiIC8+XG5cdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHQ8aDI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3NOYW1lPVwic3RlcFwiPntzdGVwfTwvc3Bhbj4ge2hlYWRlcn1cblx0XHRcdFx0PC9oMj5cblx0XHRcdDwvaGVhZGVyPlxuXHRcdFx0PHA+e2NoaWxkcmVufTwvcD5cblx0XHQ8L1N0eWxlZFNlY3Rpb24+XG5cdCk7XG59O1xuXG5jb25zdCBTdHlsZWRTZWN0aW9uID0gc3R5bGVkLnNlY3Rpb25gXG5cdG1hcmdpbjogYXV0bztcblx0cGFkZGluZy10b3A6IDRyZW07XG5cdHBhZGRpbmctYm90dG9tOiA0cmVtO1xuXG5cdGltZyB7XG5cdFx0ZmxvYXQ6IGxlZnQ7XG5cdFx0bWFyZ2luLXJpZ2h0OiA0cmVtO1xuXHR9XG5cdGhlYWRlciB7XG5cdFx0cGFkZGluZy10b3A6IDEwcHg7XG5cdH1cblxuXHRoMiB7XG5cdFx0Zm9udC13ZWlnaHQ6IDUwMDtcblx0XHRmb250LXNpemU6IDEuNHJlbTtcblx0XHRsZXR0ZXItc3BhY2luZzogMXB4O1xuXHRcdGxpbmUtaGVpZ2h0OiAxNzUlO1xuXHR9XG5cblx0cCB7XG5cdFx0bWFyZ2luLXRvcDogMS41cmVtO1xuXHRcdG1hcmdpbi1sZWZ0OiAyMC41cmVtO1xuXHRcdGZvbnQtc2l6ZTogMXJlbTtcblx0XHRsaW5lLWhlaWdodDogMTc1JTtcblx0XHRtYXgtd2lkdGg6IDYwMHB4O1xuXHR9XG5cblx0YSB7XG5cdFx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IucmVkfTtcblx0fVxuXG5cdC5zdGVwIHtcblx0XHRib3JkZXI6IHNvbGlkIDFweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnRleHR9O1xuXHRcdGJvcmRlci1yYWRpdXM6IDQwcHg7XG5cdFx0cGFkZGluZzogMC41cmVtIDEuNXJlbTtcblx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdG1hcmdpbi1yaWdodDogMC43NXJlbTtcblx0fVxuXG5cdC5oaWdobGlnaHQge1xuXHRcdC8qIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDAsIC4yKTsgKi9cblx0XHRjb2xvcjogIzMzMztcblx0XHRmb250LXdlaWdodDogNTAwO1xuXHRcdC8qIHBhZGRpbmctbGVmdDogLjNyZW07XG5cdFx0cGFkZGluZy1yaWdodDogLjNyZW07ICovXG5cdH1cblxuXHRAbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XG5cdFx0d2lkdGg6IDkwJTtcblx0fVxuXHRAbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcblx0XHR3aWR0aDogOTglO1xuXHRcdHAge1xuXHRcdFx0bWFyZ2luLXRvcDogMC41cmVtO1xuXHRcdFx0bWFyZ2luLWxlZnQ6IDEycmVtO1xuXHRcdFx0bGluZS1oZWlnaHQ6IDE1MCU7XG5cdFx0fVxuXHR9XG5cdEBtZWRpYSAobWF4LXdpZHRoOiA3NTBweCkge1xuXHRcdGltZyB7XG5cdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRcdGZsb2F0OiBub25lO1xuXHRcdFx0d2lkdGg6IDQwJTtcblx0XHRcdG1hcmdpbjogYXV0bztcblx0XHR9XG5cdFx0cCB7XG5cdFx0XHRtYXJnaW4tbGVmdDogMC41cmVtO1xuXHRcdH1cblx0fVxuYDtcblxuZXhwb3J0IHsgSWxsdXN0cmF0ZWRTdGVwIH07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/components/IllustratedStep/IllustratedStep.js\n"
				);

				/***/
			},

		/***/ './frontend/components/PasswordPrompt/PasswordPrompt.js':
			/*!**************************************************************!*\
  !*** ./frontend/components/PasswordPrompt/PasswordPrompt.js ***!
  \**************************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.PasswordPrompt = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/**\n * @function\n * @name PasswordPrompt\n * Prompts user to provide password\n *\n * @returns {JSX}\n */\nvar PasswordPrompt = exports.PasswordPrompt = function PasswordPrompt(_ref) {\n\tvar password = _ref.password,\n\t    setPassword = _ref.setPassword,\n\t    wrongPassword = _ref.wrongPassword;\n\treturn _react2.default.createElement(\n\t\tStyledDiv,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\tStyledForm,\n\t\t\tnull,\n\t\t\t_react2.default.createElement('input', {\n\t\t\t\ttype: 'password',\n\t\t\t\tautoComplete: 'current-password',\n\t\t\t\tvalue: password,\n\t\t\t\tonChange: function onChange(_ref2) {\n\t\t\t\t\tvar value = _ref2.target.value;\n\t\t\t\t\treturn setPassword(value);\n\t\t\t\t},\n\t\t\t\tclassName: wrongPassword ? wrongPassword.toString() : undefined,\n\t\t\t\tplaceholder: 'Sheet Password'\n\t\t\t})\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\t_defaultStyle.ErrorDialog,\n\t\t\t{\n\t\t\t\tclassName: wrongPassword ? wrongPassword.toString() : undefined\n\t\t\t},\n\t\t\t'\\u26A0\\uFE0F Incorrect Password Provided'\n\t\t)\n\t);\n};\n\nvar StyledDiv = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'PasswordPrompt__StyledDiv',\n\tcomponentId: 'qt9nqg-0'\n})(['background-color:', ';height:calc(100vh - 55px);display:flex;flex-direction:column;justify-content:center;align-items:center;'], function (props) {\n\treturn props.theme.color.background;\n});\n\nvar StyledForm = (0, _styledComponents2.default)(_defaultStyle.Card).withConfig({\n\tdisplayName: 'PasswordPrompt__StyledForm',\n\tcomponentId: 'qt9nqg-1'\n})(['margin-bottom:1rem;padding:2.5rem 4rem;input{height:30px;padding:0.2rem 1.5rem;font-size:1rem;font-weight:300;width:200px;}']);\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(PasswordPrompt, 'PasswordPrompt', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/PasswordPrompt/PasswordPrompt.js');\n\treactHotLoader.register(StyledDiv, 'StyledDiv', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/PasswordPrompt/PasswordPrompt.js');\n\treactHotLoader.register(StyledForm, 'StyledForm', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/PasswordPrompt/PasswordPrompt.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1Bhc3N3b3JkUHJvbXB0L1Bhc3N3b3JkUHJvbXB0LmpzP2Y2OTEiXSwibmFtZXMiOlsiUGFzc3dvcmRQcm9tcHQiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwid3JvbmdQYXNzd29yZCIsInZhbHVlIiwidGFyZ2V0IiwidG9TdHJpbmciLCJ1bmRlZmluZWQiLCJTdHlsZWREaXYiLCJkZWZhdWx0U3R5bGUiLCJwcm9wcyIsInRoZW1lIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiU3R5bGVkRm9ybSIsIkNhcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7QUFPTyxJQUFNQSwwQ0FBaUIsU0FBakJBLGNBQWlCO0FBQUEsS0FBR0MsUUFBSCxRQUFHQSxRQUFIO0FBQUEsS0FBYUMsV0FBYixRQUFhQSxXQUFiO0FBQUEsS0FBMEJDLGFBQTFCLFFBQTBCQSxhQUExQjtBQUFBLFFBQzdCO0FBQUMsV0FBRDtBQUFBO0FBQ0M7QUFBQyxhQUFEO0FBQUE7QUFDQztBQUNDLFVBQUssVUFETjtBQUVDLGtCQUFhLGtCQUZkO0FBR0MsV0FBT0YsUUFIUjtBQUlDLGNBQVU7QUFBQSxTQUFhRyxLQUFiLFNBQUdDLE1BQUgsQ0FBYUQsS0FBYjtBQUFBLFlBQTJCRixZQUFZRSxLQUFaLENBQTNCO0FBQUEsS0FKWDtBQUtDLGVBQVdELGdCQUFnQkEsY0FBY0csUUFBZCxFQUFoQixHQUEyQ0MsU0FMdkQ7QUFNQyxpQkFBWTtBQU5iO0FBREQsR0FERDtBQVlDO0FBQUMsNEJBQUQ7QUFBQTtBQUNDLGVBQVdKLGdCQUFnQkEsY0FBY0csUUFBZCxFQUFoQixHQUEyQ0M7QUFEdkQ7QUFBQTtBQUFBO0FBWkQsRUFENkI7QUFBQSxDQUF2Qjs7QUFxQlAsSUFBTUMsWUFBWSxnQ0FBT0Msc0JBQVAsQ0FBWjtBQUFBO0FBQUE7QUFBQSxzSUFDZTtBQUFBLFFBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQkMsVUFBM0I7QUFBQSxDQURmLENBQU47O0FBU0EsSUFBTUMsYUFBYSxnQ0FBT0Msa0JBQVAsQ0FBYjtBQUFBO0FBQUE7QUFBQSxtSUFBTjs7Ozs7Ozs7Ozt5QkE5QmFmLGM7eUJBcUJQUSxTO3lCQVNBTSxVIiwiZmlsZSI6Ii4vZnJvbnRlbmQvY29tcG9uZW50cy9QYXNzd29yZFByb21wdC9QYXNzd29yZFByb21wdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBkZWZhdWx0U3R5bGUsIHsgQ2FyZCwgRXJyb3JEaWFsb2cgfSBmcm9tICcuLi8uLi9kZWZhdWx0U3R5bGUnO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG5hbWUgUGFzc3dvcmRQcm9tcHRcbiAqIFByb21wdHMgdXNlciB0byBwcm92aWRlIHBhc3N3b3JkXG4gKlxuICogQHJldHVybnMge0pTWH1cbiAqL1xuZXhwb3J0IGNvbnN0IFBhc3N3b3JkUHJvbXB0ID0gKHsgcGFzc3dvcmQsIHNldFBhc3N3b3JkLCB3cm9uZ1Bhc3N3b3JkIH0pID0+IChcblx0PFN0eWxlZERpdj5cblx0XHQ8U3R5bGVkRm9ybT5cblx0XHRcdDxpbnB1dFxuXHRcdFx0XHR0eXBlPVwicGFzc3dvcmRcIlxuXHRcdFx0XHRhdXRvQ29tcGxldGU9XCJjdXJyZW50LXBhc3N3b3JkXCJcblx0XHRcdFx0dmFsdWU9e3Bhc3N3b3JkfVxuXHRcdFx0XHRvbkNoYW5nZT17KHsgdGFyZ2V0OiB7IHZhbHVlIH0gfSkgPT4gc2V0UGFzc3dvcmQodmFsdWUpfVxuXHRcdFx0XHRjbGFzc05hbWU9e3dyb25nUGFzc3dvcmQgPyB3cm9uZ1Bhc3N3b3JkLnRvU3RyaW5nKCkgOiB1bmRlZmluZWR9XG5cdFx0XHRcdHBsYWNlaG9sZGVyPVwiU2hlZXQgUGFzc3dvcmRcIlxuXHRcdFx0Lz5cblx0XHQ8L1N0eWxlZEZvcm0+XG5cblx0XHQ8RXJyb3JEaWFsb2dcblx0XHRcdGNsYXNzTmFtZT17d3JvbmdQYXNzd29yZCA/IHdyb25nUGFzc3dvcmQudG9TdHJpbmcoKSA6IHVuZGVmaW5lZH1cblx0XHQ+XG5cdFx0XHTimqDvuI8gSW5jb3JyZWN0IFBhc3N3b3JkIFByb3ZpZGVkXG5cdFx0PC9FcnJvckRpYWxvZz5cblx0PC9TdHlsZWREaXY+XG4pO1xuXG5jb25zdCBTdHlsZWREaXYgPSBzdHlsZWQoZGVmYXVsdFN0eWxlKWBcblx0YmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5iYWNrZ3JvdW5kfTtcblx0aGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTVweCk7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuYDtcblxuY29uc3QgU3R5bGVkRm9ybSA9IHN0eWxlZChDYXJkKWBcblx0bWFyZ2luLWJvdHRvbTogMXJlbTtcblx0cGFkZGluZzogMi41cmVtIDRyZW07XG5cblx0aW5wdXQge1xuXHRcdGhlaWdodDogMzBweDtcblx0XHRwYWRkaW5nOiAwLjJyZW0gMS41cmVtO1xuXHRcdGZvbnQtc2l6ZTogMXJlbTtcblx0XHRmb250LXdlaWdodDogMzAwO1xuXHRcdHdpZHRoOiAyMDBweDtcblx0fVxuYDtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/components/PasswordPrompt/PasswordPrompt.js\n"
				);

				/***/
			},

		/***/ './frontend/components/RecentlyViewed/RecentlyViewed.js':
			/*!**************************************************************!*\
  !*** ./frontend/components/RecentlyViewed/RecentlyViewed.js ***!
  \**************************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _history = __webpack_require__(/*! ../../utils/history */ \"./frontend/utils/history.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nvar RecentlyViewed = function RecentlyViewed() {\n\tvar listHistory = (0, _history.getHistory)() ? (0, _history.getHistory)().map(function (item, i) {\n\t\treturn _react2.default.createElement(\n\t\t\t_reactRouterDom.Link,\n\t\t\t{ to: '/' + item, key: item.toString() + '-' + i },\n\t\t\t_react2.default.createElement(\n\t\t\t\t'li',\n\t\t\t\tnull,\n\t\t\t\titem\n\t\t\t)\n\t\t);\n\t}) : null;\n\n\treturn _react2.default.createElement(\n\t\tStyledCard,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\t'header',\n\t\t\tnull,\n\t\t\t_react2.default.createElement(\n\t\t\t\t'h2',\n\t\t\t\tnull,\n\t\t\t\t'Recently Viewed Sheets'\n\t\t\t)\n\t\t),\n\t\tlistHistory ? _react2.default.createElement(\n\t\t\t'ul',\n\t\t\tnull,\n\t\t\tlistHistory\n\t\t) : _react2.default.createElement(\n\t\t\t'p',\n\t\t\t{ className: 'no-items' },\n\t\t\t'No recently viewed items'\n\t\t)\n\t);\n};\n\nvar StyledCard = (0, _styledComponents2.default)(_defaultStyle.Card).withConfig({\n\tdisplayName: 'RecentlyViewed__StyledCard',\n\tcomponentId: 'o9muk8-0'\n})(['padding-left:0px;padding-right:0px;padding-top:0;overflow:hidden;width:90%;max-width:600px;header{background:', ';padding-top:1rem;padding-bottom:1rem;width:100%;}h2{font-weight:400;text-align:center;color:white;font-size:1.1rem;}.no-items{font-style:italic;padding-top:3rem;padding-bottom:3rem;text-align:center;font-size:0.9rem;color:', ';}a{text-decoration:none;color:', ';}li{font-size:0.9rem;color:', ';padding-left:1.5rem;padding-top:1rem;padding-bottom:1rem;margin:1rem;border-radius:8px;border:1px solid ', ';text-align:center;transition:all 0.25s;}li:hover{border:1px solid ', ';background-color:', ';}'], function (props) {\n\treturn props.theme.gradient.greenBlue;\n}, function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.color.border;\n}, function (props) {\n\treturn props.theme.color.aqua;\n}, function (props) {\n\treturn props.theme.color.background;\n});\n\nvar _default = RecentlyViewed;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(RecentlyViewed, 'RecentlyViewed', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RecentlyViewed/RecentlyViewed.js');\n\treactHotLoader.register(StyledCard, 'StyledCard', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RecentlyViewed/RecentlyViewed.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RecentlyViewed/RecentlyViewed.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1JlY2VudGx5Vmlld2VkL1JlY2VudGx5Vmlld2VkLmpzPzQ5ZDciXSwibmFtZXMiOlsiUmVjZW50bHlWaWV3ZWQiLCJsaXN0SGlzdG9yeSIsIm1hcCIsIml0ZW0iLCJpIiwidG9TdHJpbmciLCJTdHlsZWRDYXJkIiwiQ2FyZCIsInByb3BzIiwidGhlbWUiLCJncmFkaWVudCIsImdyZWVuQmx1ZSIsImNvbG9yIiwidGV4dCIsImJvcmRlciIsImFxdWEiLCJiYWNrZ3JvdW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixTQUFqQkEsY0FBaUIsR0FBTTtBQUM1QixLQUFNQyxjQUFjLDZCQUNqQiwyQkFBYUMsR0FBYixDQUFpQixVQUFDQyxJQUFELEVBQU9DLENBQVA7QUFBQSxTQUNqQjtBQUFDLHVCQUFEO0FBQUEsS0FBTSxVQUFRRCxJQUFkLEVBQXNCLEtBQVFBLEtBQUtFLFFBQUwsRUFBUixTQUEyQkQsQ0FBakQ7QUFDQztBQUFBO0FBQUE7QUFBS0Q7QUFBTDtBQURELEdBRGlCO0FBQUEsRUFBakIsQ0FEaUIsR0FNakIsSUFOSDs7QUFRQSxRQUNDO0FBQUMsWUFBRDtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURELEdBREQ7QUFJRUYsZ0JBQ0E7QUFBQTtBQUFBO0FBQUtBO0FBQUwsR0FEQSxHQUdBO0FBQUE7QUFBQSxLQUFHLFdBQVUsVUFBYjtBQUFBO0FBQUE7QUFQRixFQUREO0FBWUEsQ0FyQkQ7O0FBdUJBLElBQU1LLGFBQWEsZ0NBQU9DLGtCQUFQLENBQWI7QUFBQTtBQUFBO0FBQUEsNG1CQVNVO0FBQUEsUUFBU0MsTUFBTUMsS0FBTixDQUFZQyxRQUFaLENBQXFCQyxTQUE5QjtBQUFBLENBVFYsRUE0Qks7QUFBQSxRQUFTSCxNQUFNQyxLQUFOLENBQVlHLEtBQVosQ0FBa0JDLElBQTNCO0FBQUEsQ0E1QkwsRUFpQ0s7QUFBQSxRQUFTTCxNQUFNQyxLQUFOLENBQVlHLEtBQVosQ0FBa0JDLElBQTNCO0FBQUEsQ0FqQ0wsRUFzQ0s7QUFBQSxRQUFTTCxNQUFNQyxLQUFOLENBQVlHLEtBQVosQ0FBa0JDLElBQTNCO0FBQUEsQ0F0Q0wsRUE0Q2dCO0FBQUEsUUFBU0wsTUFBTUMsS0FBTixDQUFZRyxLQUFaLENBQWtCRSxNQUEzQjtBQUFBLENBNUNoQixFQWlEZ0I7QUFBQSxRQUFTTixNQUFNQyxLQUFOLENBQVlHLEtBQVosQ0FBa0JHLElBQTNCO0FBQUEsQ0FqRGhCLEVBa0RnQjtBQUFBLFFBQVNQLE1BQU1DLEtBQU4sQ0FBWUcsS0FBWixDQUFrQkksVUFBM0I7QUFBQSxDQWxEaEIsQ0FBTjs7ZUFzRGVoQixjOzs7Ozs7Ozs7Ozt5QkE3RVRBLGM7eUJBdUJBTSxVIiwiZmlsZSI6Ii4vZnJvbnRlbmQvY29tcG9uZW50cy9SZWNlbnRseVZpZXdlZC9SZWNlbnRseVZpZXdlZC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IENhcmQgfSBmcm9tICcuLi8uLi9kZWZhdWx0U3R5bGUnO1xuaW1wb3J0IHsgZ2V0SGlzdG9yeSB9IGZyb20gJy4uLy4uL3V0aWxzL2hpc3RvcnknO1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuXG5jb25zdCBSZWNlbnRseVZpZXdlZCA9ICgpID0+IHtcblx0Y29uc3QgbGlzdEhpc3RvcnkgPSBnZXRIaXN0b3J5KClcblx0XHQ/IGdldEhpc3RvcnkoKS5tYXAoKGl0ZW0sIGkpID0+IChcblx0XHRcdFx0PExpbmsgdG89e2AvJHtpdGVtfWB9IGtleT17YCR7aXRlbS50b1N0cmluZygpfS0ke2l9YH0+XG5cdFx0XHRcdFx0PGxpPntpdGVtfTwvbGk+XG5cdFx0XHRcdDwvTGluaz5cblx0XHQgICkpXG5cdFx0OiBudWxsO1xuXG5cdHJldHVybiAoXG5cdFx0PFN0eWxlZENhcmQ+XG5cdFx0XHQ8aGVhZGVyPlxuXHRcdFx0XHQ8aDI+UmVjZW50bHkgVmlld2VkIFNoZWV0czwvaDI+XG5cdFx0XHQ8L2hlYWRlcj5cblx0XHRcdHtsaXN0SGlzdG9yeSA/IChcblx0XHRcdFx0PHVsPntsaXN0SGlzdG9yeX08L3VsPlxuXHRcdFx0KSA6IChcblx0XHRcdFx0PHAgY2xhc3NOYW1lPVwibm8taXRlbXNcIj5ObyByZWNlbnRseSB2aWV3ZWQgaXRlbXM8L3A+XG5cdFx0XHQpfVxuXHRcdDwvU3R5bGVkQ2FyZD5cblx0KTtcbn07XG5cbmNvbnN0IFN0eWxlZENhcmQgPSBzdHlsZWQoQ2FyZClgXG5cdHBhZGRpbmctbGVmdDogMHB4O1xuXHRwYWRkaW5nLXJpZ2h0OiAwcHg7XG5cdHBhZGRpbmctdG9wOiAwO1xuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHR3aWR0aDogOTAlO1xuXHRtYXgtd2lkdGg6IDYwMHB4O1xuXG5cdGhlYWRlciB7XG5cdFx0YmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ncmFkaWVudC5ncmVlbkJsdWV9O1xuXHRcdHBhZGRpbmctdG9wOiAxcmVtO1xuXHRcdHBhZGRpbmctYm90dG9tOiAxcmVtO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0aDIge1xuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGNvbG9yOiB3aGl0ZTtcblx0XHRmb250LXNpemU6IDEuMXJlbTtcblx0fVxuXG5cdC5uby1pdGVtcyB7XG5cdFx0Zm9udC1zdHlsZTogaXRhbGljO1xuXHRcdHBhZGRpbmctdG9wOiAzcmVtO1xuXHRcdHBhZGRpbmctYm90dG9tOiAzcmVtO1xuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRmb250LXNpemU6IDAuOXJlbTtcblx0XHRjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci50ZXh0fTtcblx0fVxuXG5cdGEge1xuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0XHRjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci50ZXh0fTtcblx0fVxuXG5cdGxpIHtcblx0XHRmb250LXNpemU6IDAuOXJlbTtcblx0XHRjb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci50ZXh0fTtcblx0XHRwYWRkaW5nLWxlZnQ6IDEuNXJlbTtcblx0XHRwYWRkaW5nLXRvcDogMXJlbTtcblx0XHRwYWRkaW5nLWJvdHRvbTogMXJlbTtcblx0XHRtYXJnaW46IDFyZW07XG5cdFx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYm9yZGVyfTtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0dHJhbnNpdGlvbjogYWxsIDAuMjVzO1xuXHR9XG5cdGxpOmhvdmVyIHtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmFxdWF9O1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYmFja2dyb3VuZH07XG5cdH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFJlY2VudGx5Vmlld2VkO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/components/RecentlyViewed/RecentlyViewed.js\n"
				);

				/***/
			},

		/***/ './frontend/components/RestExample/RestExample.js':
			/*!********************************************************!*\
  !*** ./frontend/components/RestExample/RestExample.js ***!
  \********************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.RestExample = undefined;\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/**\n * @function\n * Card providing link to rest api endpoint of sheet\n * @param {string} - props.host - host origin\n * @param {string} - props.id - sheet ID\n * @returns {jsx} <RestExample />\n */\nvar RestExample = function RestExample(_ref) {\n\tvar host = _ref.host,\n\t    id = _ref.id;\n\treturn _react2.default.createElement(\n\t\t_defaultStyle.ApiCard,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\t'span',\n\t\t\t{ className: 'pill' },\n\t\t\t'REST API:'\n\t\t),\n\t\t_react2.default.createElement(\n\t\t\t'a',\n\t\t\t{ href: host + '/api/sheet/' + id, target: '_blank' },\n\t\t\thost,\n\t\t\t'/api/sheet/',\n\t\t\tid\n\t\t)\n\t);\n};\n\nRestExample.propTypes = {\n\thost: _propTypes2.default.string.isRequired,\n\tid: _propTypes2.default.string.isRequired\n};\n\nexports.RestExample = RestExample;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(RestExample, 'RestExample', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/RestExample/RestExample.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1Jlc3RFeGFtcGxlL1Jlc3RFeGFtcGxlLmpzPzMyYWQiXSwibmFtZXMiOlsiUmVzdEV4YW1wbGUiLCJob3N0IiwiaWQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJzdHJpbmciLCJpc1JlcXVpcmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7QUFFQTs7Ozs7OztBQU9BLElBQU1BLGNBQWMsU0FBZEEsV0FBYztBQUFBLEtBQUdDLElBQUgsUUFBR0EsSUFBSDtBQUFBLEtBQVNDLEVBQVQsUUFBU0EsRUFBVDtBQUFBLFFBQ25CO0FBQUMsdUJBQUQ7QUFBQTtBQUNDO0FBQUE7QUFBQSxLQUFNLFdBQVUsTUFBaEI7QUFBQTtBQUFBLEdBREQ7QUFFQztBQUFBO0FBQUEsS0FBRyxNQUFTRCxJQUFULG1CQUEyQkMsRUFBOUIsRUFBb0MsUUFBTyxRQUEzQztBQUNFRCxPQURGO0FBQUE7QUFDbUJDO0FBRG5CO0FBRkQsRUFEbUI7QUFBQSxDQUFwQjs7QUFTQUYsWUFBWUcsU0FBWixHQUF3QjtBQUN2QkYsT0FBTUcsb0JBQVVDLE1BQVYsQ0FBaUJDLFVBREE7QUFFdkJKLEtBQUlFLG9CQUFVQyxNQUFWLENBQWlCQztBQUZFLENBQXhCOztRQUtTTixXLEdBQUFBLFc7Ozs7Ozs7Ozs7eUJBZEhBLFciLCJmaWxlIjoiLi9mcm9udGVuZC9jb21wb25lbnRzL1Jlc3RFeGFtcGxlL1Jlc3RFeGFtcGxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBBcGlDYXJkIH0gZnJvbSAnLi4vLi4vZGVmYXVsdFN0eWxlJztcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIENhcmQgcHJvdmlkaW5nIGxpbmsgdG8gcmVzdCBhcGkgZW5kcG9pbnQgb2Ygc2hlZXRcbiAqIEBwYXJhbSB7c3RyaW5nfSAtIHByb3BzLmhvc3QgLSBob3N0IG9yaWdpblxuICogQHBhcmFtIHtzdHJpbmd9IC0gcHJvcHMuaWQgLSBzaGVldCBJRFxuICogQHJldHVybnMge2pzeH0gPFJlc3RFeGFtcGxlIC8+XG4gKi9cbmNvbnN0IFJlc3RFeGFtcGxlID0gKHsgaG9zdCwgaWQgfSkgPT4gKFxuXHQ8QXBpQ2FyZD5cblx0XHQ8c3BhbiBjbGFzc05hbWU9XCJwaWxsXCI+UkVTVCBBUEk6PC9zcGFuPlxuXHRcdDxhIGhyZWY9e2Ake2hvc3R9L2FwaS9zaGVldC8ke2lkfWB9IHRhcmdldD1cIl9ibGFua1wiPlxuXHRcdFx0e2hvc3R9L2FwaS9zaGVldC97aWR9XG5cdFx0PC9hPlxuXHQ8L0FwaUNhcmQ+XG4pO1xuXG5SZXN0RXhhbXBsZS5wcm9wVHlwZXMgPSB7XG5cdGhvc3Q6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcblx0aWQ6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbmV4cG9ydCB7IFJlc3RFeGFtcGxlIH07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/components/RestExample/RestExample.js\n"
				);

				/***/
			},

		/***/ './frontend/components/ScrollDownIcon/ScrollDownIcon.js':
			/*!**************************************************************!*\
  !*** ./frontend/components/ScrollDownIcon/ScrollDownIcon.js ***!
  \**************************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/** @function\n * @name ScrollDownIcon\n * animated mouse scroll icon\n * based on: https://codepen.io/shakdaniel/pen/JoKOQx\n * @returns {JSX}\n */\nvar ScrollDownIcon = function ScrollDownIcon() {\n\treturn _react2.default.createElement(\n\t\tScrollDownAnimation,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\t'p',\n\t\t\tnull,\n\t\t\t'Scroll Down'\n\t\t)\n\t);\n};\n\nvar scrollAnimation = (0, _styledComponents.keyframes)(['0%{opacity:1;}100%{opacity:0;-webkit-transform:translateY(46px);transform:translateY(46px);}']);\n\nvar ScrollDownAnimation = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'ScrollDownIcon__ScrollDownAnimation',\n\tcomponentId: 'sc-1gezo5r-0'\n})(['width:40px;height:70px;margin-left:-20px;top:50%;margin-top:-35px;box-shadow:inset 0 0 0 1px ', ';background-color:rgba(255,255,255,0.5);border-radius:25px;&,&:before{position:absolute;left:50%;top:calc(100vh - 150px);z-index:10;}&:before{content:\\'\\';width:8px;height:8px;background:', ';margin-left:-4px;top:8px;border-radius:4px;-webkit-animation-duration:1.5s;animation-duration:1.5s;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-name:scroll;animation-name:', ';}p{position:relative;bottom:-80px;color:', ';font-family:', ';font-size:1rem;font-weight:400;text-align:center;line-height:120%;}'], function (props) {\n\treturn props.theme.color.red;\n}, function (props) {\n\treturn props.theme.color.red;\n}, scrollAnimation, function (props) {\n\treturn props.theme.color.red;\n}, function (props) {\n\treturn props.theme.font.main;\n});\n\nvar _default = ScrollDownIcon;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(ScrollDownIcon, 'ScrollDownIcon', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js');\n\treactHotLoader.register(scrollAnimation, 'scrollAnimation', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js');\n\treactHotLoader.register(ScrollDownAnimation, 'ScrollDownAnimation', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollDownIcon/ScrollDownIcon.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1Njcm9sbERvd25JY29uL1Njcm9sbERvd25JY29uLmpzP2E2MTEiXSwibmFtZXMiOlsiU2Nyb2xsRG93bkljb24iLCJzY3JvbGxBbmltYXRpb24iLCJrZXlmcmFtZXMiLCJTY3JvbGxEb3duQW5pbWF0aW9uIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsImNvbG9yIiwicmVkIiwiZm9udCIsIm1haW4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBRUE7Ozs7OztBQU1BLElBQU1BLGlCQUFpQixTQUFqQkEsY0FBaUI7QUFBQSxRQUN0QjtBQUFDLHFCQUFEO0FBQUE7QUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREQsRUFEc0I7QUFBQSxDQUF2Qjs7QUFNQSxJQUFNQyxzQkFBa0JDLDJCQUFsQixtR0FBTjs7QUFXQSxJQUFNQyxzQkFBc0JDLDJCQUFPQyxHQUE3QjtBQUFBO0FBQUE7QUFBQSw4b0JBTXlCO0FBQUEsUUFBU0MsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCQyxHQUEzQjtBQUFBLENBTnpCLEVBc0JVO0FBQUEsUUFBU0gsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCQyxHQUEzQjtBQUFBLENBdEJWLEVBK0JjUixlQS9CZCxFQXFDSztBQUFBLFFBQVNLLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQkMsR0FBM0I7QUFBQSxDQXJDTCxFQXNDVztBQUFBLFFBQVNILE1BQU1DLEtBQU4sQ0FBWUcsSUFBWixDQUFpQkMsSUFBMUI7QUFBQSxDQXRDWCxDQUFOOztlQThDZVgsYzs7Ozs7Ozs7Ozs7eUJBL0RUQSxjO3lCQU1BQyxlO3lCQVdBRSxtQiIsImZpbGUiOiIuL2Zyb250ZW5kL2NvbXBvbmVudHMvU2Nyb2xsRG93bkljb24vU2Nyb2xsRG93bkljb24uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCwgeyBrZXlmcmFtZXMgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbi8qKiBAZnVuY3Rpb25cbiAqIEBuYW1lIFNjcm9sbERvd25JY29uXG4gKiBhbmltYXRlZCBtb3VzZSBzY3JvbGwgaWNvblxuICogYmFzZWQgb246IGh0dHBzOi8vY29kZXBlbi5pby9zaGFrZGFuaWVsL3Blbi9Kb0tPUXhcbiAqIEByZXR1cm5zIHtKU1h9XG4gKi9cbmNvbnN0IFNjcm9sbERvd25JY29uID0gKCkgPT4gKFxuXHQ8U2Nyb2xsRG93bkFuaW1hdGlvbj5cblx0XHQ8cD5TY3JvbGwgRG93bjwvcD5cblx0PC9TY3JvbGxEb3duQW5pbWF0aW9uPlxuKTtcblxuY29uc3Qgc2Nyb2xsQW5pbWF0aW9uID0ga2V5ZnJhbWVzYFxuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQxMDAlIHtcblx0XHRvcGFjaXR5OiAwO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDQ2cHgpO1xuXHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSg0NnB4KTtcblx0fVxuYDtcblxuY29uc3QgU2Nyb2xsRG93bkFuaW1hdGlvbiA9IHN0eWxlZC5kaXZgXG5cdHdpZHRoOiA0MHB4O1xuXHRoZWlnaHQ6IDcwcHg7XG5cdG1hcmdpbi1sZWZ0OiAtMjBweDtcblx0dG9wOiA1MCU7XG5cdG1hcmdpbi10b3A6IC0zNXB4O1xuXHRib3gtc2hhZG93OiBpbnNldCAwIDAgMCAxcHggJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5yZWR9O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG5cdGJvcmRlci1yYWRpdXM6IDI1cHg7XG5cblx0Jixcblx0JjpiZWZvcmUge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRsZWZ0OiA1MCU7XG5cdFx0dG9wOiBjYWxjKDEwMHZoIC0gMTUwcHgpO1xuXHRcdHotaW5kZXg6IDEwO1xuXHR9XG5cblx0JjpiZWZvcmUge1xuXHRcdGNvbnRlbnQ6ICcnO1xuXHRcdHdpZHRoOiA4cHg7XG5cdFx0aGVpZ2h0OiA4cHg7XG5cdFx0YmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5yZWR9O1xuXHRcdG1hcmdpbi1sZWZ0OiAtNHB4O1xuXHRcdHRvcDogOHB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHQtd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbjogMS41cztcblx0XHRhbmltYXRpb24tZHVyYXRpb246IDEuNXM7XG5cdFx0LXdlYmtpdC1hbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcblx0XHRhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcblx0XHQtd2Via2l0LWFuaW1hdGlvbi1uYW1lOiBzY3JvbGw7XG5cdFx0YW5pbWF0aW9uLW5hbWU6ICR7c2Nyb2xsQW5pbWF0aW9ufTtcblx0fVxuXG5cdHAge1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRib3R0b206IC04MHB4O1xuXHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnJlZH07XG5cdFx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5tYWlufTtcblx0XHRmb250LXNpemU6IDFyZW07XG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0bGluZS1oZWlnaHQ6IDEyMCU7XG5cdH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFNjcm9sbERvd25JY29uO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/components/ScrollDownIcon/ScrollDownIcon.js\n"
				);

				/***/
			},

		/***/ './frontend/components/ScrollToTop/ScrollToTop.js':
			/*!********************************************************!*\
  !*** ./frontend/components/ScrollToTop/ScrollToTop.js ***!
  \********************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					'/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactRouter = __webpack_require__(/*! react-router */ "./node_modules/react-router/es/index.js");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }\n\nfunction _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn\'t been initialised - super() hasn\'t been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }\n\n// from:  https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md\n/* istanbul ignore next */\nvar ScrollToTop = function (_React$Component) {\n\t_inherits(ScrollToTop, _React$Component);\n\n\tfunction ScrollToTop() {\n\t\t_classCallCheck(this, ScrollToTop);\n\n\t\treturn _possibleConstructorReturn(this, (ScrollToTop.__proto__ || Object.getPrototypeOf(ScrollToTop)).apply(this, arguments));\n\t}\n\n\t_createClass(ScrollToTop, [{\n\t\tkey: \'componentDidUpdate\',\n\t\tvalue: function componentDidUpdate(prevProps) {\n\t\t\tif (this.props.location !== prevProps.location) {\n\t\t\t\twindow.scrollTo(0, 0);\n\t\t\t}\n\t\t}\n\t}, {\n\t\tkey: \'render\',\n\t\tvalue: function render() {\n\t\t\treturn this.props.children;\n\t\t}\n\t}, {\n\t\tkey: \'__reactstandin__regenerateByEval\',\n\t\t// @ts-ignore\n\t\tvalue: function __reactstandin__regenerateByEval(key, code) {\n\t\t\t// @ts-ignore\n\t\t\tthis[key] = eval(code);\n\t\t}\n\t}]);\n\n\treturn ScrollToTop;\n}(_react2.default.Component);\n\nvar _default = (0, _reactRouter.withRouter)(ScrollToTop);\n\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(ScrollToTop, \'ScrollToTop\', \'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollToTop/ScrollToTop.js\');\n\treactHotLoader.register(_default, \'default\', \'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/ScrollToTop/ScrollToTop.js\');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1Njcm9sbFRvVG9wL1Njcm9sbFRvVG9wLmpzPzFmYjAiXSwibmFtZXMiOlsiU2Nyb2xsVG9Ub3AiLCJwcmV2UHJvcHMiLCJwcm9wcyIsImxvY2F0aW9uIiwid2luZG93Iiwic2Nyb2xsVG8iLCJjaGlsZHJlbiIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7SUFDTUEsVzs7Ozs7Ozs7Ozs7cUNBQ2NDLFMsRUFBVztBQUM3QixPQUFJLEtBQUtDLEtBQUwsQ0FBV0MsUUFBWCxLQUF3QkYsVUFBVUUsUUFBdEMsRUFBZ0Q7QUFDL0NDLFdBQU9DLFFBQVAsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkI7QUFDQTtBQUNEOzs7MkJBRVE7QUFDUixVQUFPLEtBQUtILEtBQUwsQ0FBV0ksUUFBbEI7QUFDQTs7Ozs7Ozs7Ozs7RUFUd0JDLGdCQUFNQyxTOztlQVlqQiw2QkFBV1IsV0FBWCxDOzs7Ozs7Ozs7Ozs7eUJBWlRBLFciLCJmaWxlIjoiLi9mcm9udGVuZC9jb21wb25lbnRzL1Njcm9sbFRvVG9wL1Njcm9sbFRvVG9wLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHdpdGhSb3V0ZXIgfSBmcm9tICdyZWFjdC1yb3V0ZXInO1xuXG4vLyBmcm9tOiAgaHR0cHM6Ly9naXRodWIuY29tL1JlYWN0VHJhaW5pbmcvcmVhY3Qtcm91dGVyL2Jsb2IvbWFzdGVyL3BhY2thZ2VzL3JlYWN0LXJvdXRlci1kb20vZG9jcy9ndWlkZXMvc2Nyb2xsLXJlc3RvcmF0aW9uLm1kXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY2xhc3MgU2Nyb2xsVG9Ub3AgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXHRjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG5cdFx0aWYgKHRoaXMucHJvcHMubG9jYXRpb24gIT09IHByZXZQcm9wcy5sb2NhdGlvbikge1xuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsIDApO1xuXHRcdH1cblx0fVxuXG5cdHJlbmRlcigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy5jaGlsZHJlbjtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCB3aXRoUm91dGVyKFNjcm9sbFRvVG9wKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/components/ScrollToTop/ScrollToTop.js\n'
				);

				/***/
			},

		/***/ './frontend/components/SearchSheet/SearchSheet.js':
			/*!********************************************************!*\
  !*** ./frontend/components/SearchSheet/SearchSheet.js ***!
  \********************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nvar SearchSheet = function SearchSheet() {\n\tvar _useState = (0, _react.useState)(''),\n\t    _useState2 = _slicedToArray(_useState, 2),\n\t    value = _useState2[0],\n\t    setValue = _useState2[1];\n\n\tvar handleChange = function handleChange(e) {\n\t\tsetValue(e.target.value);\n\t};\n\n\treturn _react2.default.createElement(\n\t\tStyledCard,\n\t\tnull,\n\t\t_react2.default.createElement(\n\t\t\tStyledForm,\n\t\t\tnull,\n\t\t\t_react2.default.createElement('input', {\n\t\t\t\ttype: 'text',\n\t\t\t\tplaceholder: 'search by sheet ID',\n\t\t\t\tvalue: value,\n\t\t\t\tonChange: handleChange\n\t\t\t}),\n\t\t\t_react2.default.createElement(\n\t\t\t\t_reactRouterDom.Link,\n\t\t\t\t{ to: '/' + value },\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tSubmitButton,\n\t\t\t\t\tnull,\n\t\t\t\t\t'Submit'\n\t\t\t\t)\n\t\t\t)\n\t\t)\n\t);\n};\n\nvar StyledCard = (0, _styledComponents2.default)(_defaultStyle.Card).withConfig({\n\tdisplayName: 'SearchSheet__StyledCard',\n\tcomponentId: 'sc-1cv3p1h-0'\n})(['overflow:hidden;width:90%;max-width:600px;margin-bottom:3rem;header{background:', ';padding-top:1rem;padding-bottom:1rem;width:100%;}h2{font-weight:400;text-align:center;color:white;font-size:1.1rem;}input{box-sizing:border-box;flex-grow:2;height:30px;margin-bottom:0;padding-left:2rem;margin-right:1rem;font-size:0.95rem;::placeholder{color:', ';}}'], function (props) {\n\treturn props.theme.gradient.greenBlue;\n}, function (props) {\n\treturn props.theme.color.backgroundDarkest;\n});\n\nvar StyledForm = _styledComponents2.default.form.withConfig({\n\tdisplayName: 'SearchSheet__StyledForm',\n\tcomponentId: 'sc-1cv3p1h-1'\n})(['margin:2rem;display:flex;flex-direction:row;flex-wrap:nowrap;justify-content:space-between;']);\n\nvar SubmitButton = _styledComponents2.default.button.withConfig({\n\tdisplayName: 'SearchSheet__SubmitButton',\n\tcomponentId: 'sc-1cv3p1h-2'\n})(['outline:none;box-sizing:border-box;height:30px;width:100px;border-radius:20px;background:', ';border:none;color:white;font-family:', ';font-size:1rem;transition:all 0.5s;&:hover{box-shadow:', ';}'], function (props) {\n\treturn props.theme.gradient.greenBlue;\n}, function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.boxShadow;\n});\n\nvar _default = SearchSheet;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(SearchSheet, 'SearchSheet', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js');\n\treactHotLoader.register(StyledCard, 'StyledCard', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js');\n\treactHotLoader.register(StyledForm, 'StyledForm', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js');\n\treactHotLoader.register(SubmitButton, 'SubmitButton', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SearchSheet/SearchSheet.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1NlYXJjaFNoZWV0L1NlYXJjaFNoZWV0LmpzP2I4ZTYiXSwibmFtZXMiOlsiU2VhcmNoU2hlZXQiLCJ2YWx1ZSIsInNldFZhbHVlIiwiaGFuZGxlQ2hhbmdlIiwiZSIsInRhcmdldCIsIlN0eWxlZENhcmQiLCJDYXJkIiwicHJvcHMiLCJ0aGVtZSIsImdyYWRpZW50IiwiZ3JlZW5CbHVlIiwiY29sb3IiLCJiYWNrZ3JvdW5kRGFya2VzdCIsIlN0eWxlZEZvcm0iLCJzdHlsZWQiLCJmb3JtIiwiU3VibWl0QnV0dG9uIiwiYnV0dG9uIiwiZm9udCIsIm1haW4iLCJib3hTaGFkb3ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7QUFFQSxJQUFNQSxjQUFjLFNBQWRBLFdBQWMsR0FBTTtBQUFBLGlCQUNDLHFCQUFTLEVBQVQsQ0FERDtBQUFBO0FBQUEsS0FDbEJDLEtBRGtCO0FBQUEsS0FDWEMsUUFEVzs7QUFFekIsS0FBTUMsZUFBZSxTQUFmQSxZQUFlLElBQUs7QUFDekJELFdBQVNFLEVBQUVDLE1BQUYsQ0FBU0osS0FBbEI7QUFDQSxFQUZEOztBQUlBLFFBQ0M7QUFBQyxZQUFEO0FBQUE7QUFDQztBQUFDLGFBQUQ7QUFBQTtBQUNDO0FBQ0MsVUFBSyxNQUROO0FBRUMsaUJBQVksb0JBRmI7QUFHQyxXQUFPQSxLQUhSO0FBSUMsY0FBVUU7QUFKWCxLQUREO0FBT0M7QUFBQyx3QkFBRDtBQUFBLE1BQU0sVUFBUUYsS0FBZDtBQUNDO0FBQUMsaUJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFERDtBQVBEO0FBREQsRUFERDtBQWVBLENBckJEOztBQXVCQSxJQUFNSyxhQUFhLGdDQUFPQyxrQkFBUCxDQUFiO0FBQUE7QUFBQTtBQUFBLHNXQU9VO0FBQUEsUUFBU0MsTUFBTUMsS0FBTixDQUFZQyxRQUFaLENBQXFCQyxTQUE5QjtBQUFBLENBUFYsRUE4Qk07QUFBQSxRQUFTSCxNQUFNQyxLQUFOLENBQVlHLEtBQVosQ0FBa0JDLGlCQUEzQjtBQUFBLENBOUJOLENBQU47O0FBbUNBLElBQU1DLGFBQWFDLDJCQUFPQyxJQUFwQjtBQUFBO0FBQUE7QUFBQSxtR0FBTjs7QUFRQSxJQUFNQyxlQUFlRiwyQkFBT0csTUFBdEI7QUFBQTtBQUFBO0FBQUEsNE1BTVM7QUFBQSxRQUFTVixNQUFNQyxLQUFOLENBQVlDLFFBQVosQ0FBcUJDLFNBQTlCO0FBQUEsQ0FOVCxFQVNVO0FBQUEsUUFBU0gsTUFBTUMsS0FBTixDQUFZVSxJQUFaLENBQWlCQyxJQUExQjtBQUFBLENBVFYsRUFjVTtBQUFBLFFBQVNaLE1BQU1DLEtBQU4sQ0FBWVksU0FBckI7QUFBQSxDQWRWLENBQU47O2VBa0JlckIsVzs7Ozs7Ozs7Ozs7eUJBcEZUQSxXO3lCQXVCQU0sVTt5QkFtQ0FRLFU7eUJBUUFHLFkiLCJmaWxlIjoiLi9mcm9udGVuZC9jb21wb25lbnRzL1NlYXJjaFNoZWV0L1NlYXJjaFNoZWV0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgeyBDYXJkIH0gZnJvbSAnLi4vLi4vZGVmYXVsdFN0eWxlJztcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuY29uc3QgU2VhcmNoU2hlZXQgPSAoKSA9PiB7XG5cdGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGUoJycpO1xuXHRjb25zdCBoYW5kbGVDaGFuZ2UgPSBlID0+IHtcblx0XHRzZXRWYWx1ZShlLnRhcmdldC52YWx1ZSk7XG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8U3R5bGVkQ2FyZD5cblx0XHRcdDxTdHlsZWRGb3JtPlxuXHRcdFx0XHQ8aW5wdXRcblx0XHRcdFx0XHR0eXBlPVwidGV4dFwiXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9XCJzZWFyY2ggYnkgc2hlZXQgSURcIlxuXHRcdFx0XHRcdHZhbHVlPXt2YWx1ZX1cblx0XHRcdFx0XHRvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuXHRcdFx0XHQvPlxuXHRcdFx0XHQ8TGluayB0bz17YC8ke3ZhbHVlfWB9PlxuXHRcdFx0XHRcdDxTdWJtaXRCdXR0b24+U3VibWl0PC9TdWJtaXRCdXR0b24+XG5cdFx0XHRcdDwvTGluaz5cblx0XHRcdDwvU3R5bGVkRm9ybT5cblx0XHQ8L1N0eWxlZENhcmQ+XG5cdCk7XG59O1xuXG5jb25zdCBTdHlsZWRDYXJkID0gc3R5bGVkKENhcmQpYFxuXHRvdmVyZmxvdzogaGlkZGVuO1xuXHR3aWR0aDogOTAlO1xuXHRtYXgtd2lkdGg6IDYwMHB4O1xuXHRtYXJnaW4tYm90dG9tOiAzcmVtO1xuXG5cdGhlYWRlciB7XG5cdFx0YmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ncmFkaWVudC5ncmVlbkJsdWV9O1xuXHRcdHBhZGRpbmctdG9wOiAxcmVtO1xuXHRcdHBhZGRpbmctYm90dG9tOiAxcmVtO1xuXHRcdHdpZHRoOiAxMDAlO1xuXHR9XG5cblx0aDIge1xuXHRcdGZvbnQtd2VpZ2h0OiA0MDA7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGNvbG9yOiB3aGl0ZTtcblx0XHRmb250LXNpemU6IDEuMXJlbTtcblx0fVxuXG5cdGlucHV0IHtcblx0XHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRcdGZsZXgtZ3JvdzogMjtcblx0XHRoZWlnaHQ6IDMwcHg7XG5cdFx0bWFyZ2luLWJvdHRvbTogMDtcblx0XHRwYWRkaW5nLWxlZnQ6IDJyZW07XG5cdFx0bWFyZ2luLXJpZ2h0OiAxcmVtO1xuXHRcdGZvbnQtc2l6ZTogMC45NXJlbTtcblxuXHRcdDo6cGxhY2Vob2xkZXIge1xuXHRcdFx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYmFja2dyb3VuZERhcmtlc3R9O1xuXHRcdH1cblx0fVxuYDtcblxuY29uc3QgU3R5bGVkRm9ybSA9IHN0eWxlZC5mb3JtYFxuXHRtYXJnaW46IDJyZW07XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdGZsZXgtd3JhcDogbm93cmFwO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG5gO1xuXG5jb25zdCBTdWJtaXRCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuXHRvdXRsaW5lOiBub25lO1xuXHRib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXHRoZWlnaHQ6IDMwcHg7XG5cdHdpZHRoOiAxMDBweDtcblx0Ym9yZGVyLXJhZGl1czogMjBweDtcblx0YmFja2dyb3VuZDogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ncmFkaWVudC5ncmVlbkJsdWV9O1xuXHRib3JkZXI6IG5vbmU7XG5cdGNvbG9yOiB3aGl0ZTtcblx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5tYWlufTtcblx0Zm9udC1zaXplOiAxcmVtO1xuXHR0cmFuc2l0aW9uOiBhbGwgMC41cztcblxuXHQmOmhvdmVyIHtcblx0XHRib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmJveFNoYWRvd307XG5cdH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFNlYXJjaFNoZWV0O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/components/SearchSheet/SearchSheet.js\n"
				);

				/***/
			},

		/***/ './frontend/components/SwiftTable/Table.js':
			/*!*************************************************!*\
  !*** ./frontend/components/SwiftTable/Table.js ***!
  \*************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _propTypes = __webpack_require__(/*! prop-types */ \"./node_modules/prop-types/index.js\");\n\nvar _propTypes2 = _interopRequireDefault(_propTypes);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _agGridReact = __webpack_require__(/*! ag-grid-react */ \"./node_modules/ag-grid-react/main.js\");\n\n__webpack_require__(/*! ag-grid-community/dist/styles/ag-grid.css */ \"./node_modules/ag-grid-community/dist/styles/ag-grid.css\");\n\n__webpack_require__(/*! ag-grid-community/dist/styles/ag-theme-material.css */ \"./node_modules/ag-grid-community/dist/styles/ag-theme-material.css\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar Table = function Table(_ref) {\n\tvar data = _ref.data;\n\n\tvar columnDefs = [];\n\tvar rowData = [].concat(_toConsumableArray(data));\n\tvar defaultColDef = {\n\t\tresizable: true,\n\t\tsortable: true,\n\t\tcolumnDrag: true,\n\t\tfilter: true,\n\t\twidth: 225\n\t};\n\tObject.keys(data[0]).forEach(function (key) {\n\t\tcolumnDefs.push({\n\t\t\theaderName: key,\n\t\t\tfield: key\n\t\t});\n\t});\n\n\treturn _react2.default.createElement(\n\t\tStyledtable,\n\t\t{ className: 'ag-theme-material' },\n\t\t_react2.default.createElement(_agGridReact.AgGridReact, {\n\t\t\tcolumnDefs: columnDefs,\n\t\t\trowData: rowData,\n\t\t\tdefaultColDef: defaultColDef\n\t\t})\n\t);\n};\n\nTable.propTypes = {\n\tdata: _propTypes2.default.array.isRequired\n};\n\n/* istanbul ignore next */\nvar Styledtable = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'Table__Styledtable',\n\tcomponentId: 'sc-1n1z6me-0'\n})(['height:98%;font-family:', ';font-size:14px;letter-spacing:1px;background-color:white;width:80%;max-width:', ';margin:auto;margin-top:20px;border:none;box-shadow:', ';.ag-header-cell-text{font-family:', ';font-size:14px;}.ag-row-even{background-color:', ';}.ag-row-hover{background-color:', ';}.ag-header{background:', ';color:', ';& .ag-header-cell{border-right:1px solid ', ';}& .ag-column-hover{background:', ';color:', ';border-bottom:4px solid ', ';}}.ag-icon-desc,.ag-icon-asc{background-color:', ';border-radius:10px;position:relative;top:5px;padding:2px;}.ag-icon-filter{border-radius:4px;position:relative;top:5px;}.ag-filter{background:', ';box-shadow:', ';font-family:', ';}.ag-theme-material .ag-filter input[type=\"text\"],.ag-theme-material .ag-filter input[type=\"date\"]{border-bottom:1px solid ', ';}'], function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.children.props.columnDefs.length * 225 + 'px';\n}, function (props) {\n\treturn props.theme.boxShadowLight;\n}, function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.color.background;\n}, function (props) {\n\treturn props.theme.color.lightBlue;\n}, function (props) {\n\treturn props.theme.gradient.light;\n}, function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.color.backgroundDark;\n}, function (props) {\n\treturn props.theme.gradient.light;\n}, function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.color.red;\n}, function (props) {\n\treturn props.theme.color.blue;\n}, function (props) {\n\treturn props.theme.gradient.light;\n}, function (props) {\n\treturn props.theme.boxShadowLight;\n}, function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.color.border;\n});\n\nvar _default = Table;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(Table, 'Table', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SwiftTable/Table.js');\n\treactHotLoader.register(Styledtable, 'Styledtable', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SwiftTable/Table.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/components/SwiftTable/Table.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9jb21wb25lbnRzL1N3aWZ0VGFibGUvVGFibGUuanM/YTJjNiJdLCJuYW1lcyI6WyJUYWJsZSIsImRhdGEiLCJjb2x1bW5EZWZzIiwicm93RGF0YSIsImRlZmF1bHRDb2xEZWYiLCJyZXNpemFibGUiLCJzb3J0YWJsZSIsImNvbHVtbkRyYWciLCJmaWx0ZXIiLCJ3aWR0aCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHVzaCIsImhlYWRlck5hbWUiLCJrZXkiLCJmaWVsZCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImFycmF5IiwiaXNSZXF1aXJlZCIsIlN0eWxlZHRhYmxlIiwic3R5bGVkIiwiZGl2IiwicHJvcHMiLCJ0aGVtZSIsImZvbnQiLCJtYWluIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJib3hTaGFkb3dMaWdodCIsImNvbG9yIiwiYmFja2dyb3VuZCIsImxpZ2h0Qmx1ZSIsImdyYWRpZW50IiwibGlnaHQiLCJ0ZXh0IiwiYmFja2dyb3VuZERhcmsiLCJyZWQiLCJibHVlIiwiYm9yZGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRLFNBQVJBLEtBQVEsT0FBYztBQUFBLEtBQVhDLElBQVcsUUFBWEEsSUFBVzs7QUFDM0IsS0FBSUMsYUFBYSxFQUFqQjtBQUNBLEtBQU1DLHVDQUFjRixJQUFkLEVBQU47QUFDQSxLQUFNRyxnQkFBZ0I7QUFDckJDLGFBQVcsSUFEVTtBQUVyQkMsWUFBVSxJQUZXO0FBR3JCQyxjQUFZLElBSFM7QUFJckJDLFVBQVEsSUFKYTtBQUtyQkMsU0FBTztBQUxjLEVBQXRCO0FBT0FDLFFBQU9DLElBQVAsQ0FBWVYsS0FBSyxDQUFMLENBQVosRUFBcUJXLE9BQXJCLENBQTZCLGVBQU87QUFDbkNWLGFBQVdXLElBQVgsQ0FBZ0I7QUFDZkMsZUFBWUMsR0FERztBQUVmQyxVQUFPRDtBQUZRLEdBQWhCO0FBSUEsRUFMRDs7QUFPQSxRQUNDO0FBQUMsYUFBRDtBQUFBLElBQWEsV0FBVSxtQkFBdkI7QUFDQyxnQ0FBQyx3QkFBRDtBQUNDLGVBQVliLFVBRGI7QUFFQyxZQUFTQyxPQUZWO0FBR0Msa0JBQWVDO0FBSGhCO0FBREQsRUFERDtBQVNBLENBMUJEOztBQTRCQUosTUFBTWlCLFNBQU4sR0FBa0I7QUFDakJoQixPQUFNaUIsb0JBQVVDLEtBQVYsQ0FBZ0JDO0FBREwsQ0FBbEI7O0FBSUE7QUFDQSxJQUFNQyxjQUFjQywyQkFBT0MsR0FBckI7QUFBQTtBQUFBO0FBQUEscXpCQUVVO0FBQUEsUUFBU0MsTUFBTUMsS0FBTixDQUFZQyxJQUFaLENBQWlCQyxJQUExQjtBQUFBLENBRlYsRUFTUTtBQUFBLFFBQVNILE1BQU1JLFFBQU4sQ0FBZUosS0FBZixDQUFxQnRCLFVBQXJCLENBQWdDMkIsTUFBaEMsR0FBeUMsR0FBekMsR0FBK0MsSUFBeEQ7QUFBQSxDQVRSLEVBYVM7QUFBQSxRQUFTTCxNQUFNQyxLQUFOLENBQVlLLGNBQXJCO0FBQUEsQ0FiVCxFQWdCVztBQUFBLFFBQVNOLE1BQU1DLEtBQU4sQ0FBWUMsSUFBWixDQUFpQkMsSUFBMUI7QUFBQSxDQWhCWCxFQXFCZ0I7QUFBQSxRQUFTSCxNQUFNQyxLQUFOLENBQVlNLEtBQVosQ0FBa0JDLFVBQTNCO0FBQUEsQ0FyQmhCLEVBd0JnQjtBQUFBLFFBQVNSLE1BQU1DLEtBQU4sQ0FBWU0sS0FBWixDQUFrQkUsU0FBM0I7QUFBQSxDQXhCaEIsRUE0QlU7QUFBQSxRQUFTVCxNQUFNQyxLQUFOLENBQVlTLFFBQVosQ0FBcUJDLEtBQTlCO0FBQUEsQ0E1QlYsRUE2Qks7QUFBQSxRQUFTWCxNQUFNQyxLQUFOLENBQVlNLEtBQVosQ0FBa0JLLElBQTNCO0FBQUEsQ0E3QkwsRUFnQ3VCO0FBQUEsUUFBU1osTUFBTUMsS0FBTixDQUFZTSxLQUFaLENBQWtCTSxjQUEzQjtBQUFBLENBaEN2QixFQW9DVztBQUFBLFFBQVNiLE1BQU1DLEtBQU4sQ0FBWVMsUUFBWixDQUFxQkMsS0FBOUI7QUFBQSxDQXBDWCxFQXFDTTtBQUFBLFFBQVNYLE1BQU1DLEtBQU4sQ0FBWU0sS0FBWixDQUFrQkssSUFBM0I7QUFBQSxDQXJDTixFQXNDd0I7QUFBQSxRQUFTWixNQUFNQyxLQUFOLENBQVlNLEtBQVosQ0FBa0JPLEdBQTNCO0FBQUEsQ0F0Q3hCLEVBNENnQjtBQUFBLFFBQVNkLE1BQU1DLEtBQU4sQ0FBWU0sS0FBWixDQUFrQlEsSUFBM0I7QUFBQSxDQTVDaEIsRUEwRFU7QUFBQSxRQUFTZixNQUFNQyxLQUFOLENBQVlTLFFBQVosQ0FBcUJDLEtBQTlCO0FBQUEsQ0ExRFYsRUEyRFU7QUFBQSxRQUFTWCxNQUFNQyxLQUFOLENBQVlLLGNBQXJCO0FBQUEsQ0EzRFYsRUE0RFc7QUFBQSxRQUFTTixNQUFNQyxLQUFOLENBQVlDLElBQVosQ0FBaUJDLElBQTFCO0FBQUEsQ0E1RFgsRUFnRXdCO0FBQUEsUUFBU0gsTUFBTUMsS0FBTixDQUFZTSxLQUFaLENBQWtCUyxNQUEzQjtBQUFBLENBaEV4QixDQUFOOztlQW9FZXhDLEs7Ozs7Ozs7Ozs7O3lCQXJHVEEsSzt5QkFpQ0FxQixXIiwiZmlsZSI6Ii4vZnJvbnRlbmQvY29tcG9uZW50cy9Td2lmdFRhYmxlL1RhYmxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHsgQWdHcmlkUmVhY3QgfSBmcm9tICdhZy1ncmlkLXJlYWN0JztcbmltcG9ydCAnYWctZ3JpZC1jb21tdW5pdHkvZGlzdC9zdHlsZXMvYWctZ3JpZC5jc3MnO1xuaW1wb3J0ICdhZy1ncmlkLWNvbW11bml0eS9kaXN0L3N0eWxlcy9hZy10aGVtZS1tYXRlcmlhbC5jc3MnO1xuXG5jb25zdCBUYWJsZSA9ICh7IGRhdGEgfSkgPT4ge1xuXHRsZXQgY29sdW1uRGVmcyA9IFtdO1xuXHRjb25zdCByb3dEYXRhID0gWy4uLmRhdGFdO1xuXHRjb25zdCBkZWZhdWx0Q29sRGVmID0ge1xuXHRcdHJlc2l6YWJsZTogdHJ1ZSxcblx0XHRzb3J0YWJsZTogdHJ1ZSxcblx0XHRjb2x1bW5EcmFnOiB0cnVlLFxuXHRcdGZpbHRlcjogdHJ1ZSxcblx0XHR3aWR0aDogMjI1LFxuXHR9O1xuXHRPYmplY3Qua2V5cyhkYXRhWzBdKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y29sdW1uRGVmcy5wdXNoKHtcblx0XHRcdGhlYWRlck5hbWU6IGtleSxcblx0XHRcdGZpZWxkOiBrZXksXG5cdFx0fSk7XG5cdH0pO1xuXG5cdHJldHVybiAoXG5cdFx0PFN0eWxlZHRhYmxlIGNsYXNzTmFtZT1cImFnLXRoZW1lLW1hdGVyaWFsXCI+XG5cdFx0XHQ8QWdHcmlkUmVhY3Rcblx0XHRcdFx0Y29sdW1uRGVmcz17Y29sdW1uRGVmc31cblx0XHRcdFx0cm93RGF0YT17cm93RGF0YX1cblx0XHRcdFx0ZGVmYXVsdENvbERlZj17ZGVmYXVsdENvbERlZn1cblx0XHRcdC8+XG5cdFx0PC9TdHlsZWR0YWJsZT5cblx0KTtcbn07XG5cblRhYmxlLnByb3BUeXBlcyA9IHtcblx0ZGF0YTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG59O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3QgU3R5bGVkdGFibGUgPSBzdHlsZWQuZGl2YFxuXHRoZWlnaHQ6IDk4JTtcblx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5tYWlufTtcblx0Zm9udC1zaXplOiAxNHB4O1xuXHRsZXR0ZXItc3BhY2luZzogMXB4O1xuXG5cblx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cdHdpZHRoOiA4MCU7XG5cdG1heC13aWR0aDogJHtwcm9wcyA9PiBwcm9wcy5jaGlsZHJlbi5wcm9wcy5jb2x1bW5EZWZzLmxlbmd0aCAqIDIyNSArICdweCd9O1xuXHRtYXJnaW46IGF1dG87XG5cdG1hcmdpbi10b3A6IDIwcHg7XG5cdGJvcmRlcjogbm9uZTtcblx0Ym94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ib3hTaGFkb3dMaWdodH07XG5cblx0LmFnLWhlYWRlci1jZWxsLXRleHQge1xuXHRcdGZvbnQtZmFtaWx5OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnQubWFpbn07XG5cdFx0Zm9udC1zaXplOiAxNHB4O1xuXHR9XG5cblx0LmFnLXJvdy1ldmVuIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJhY2tncm91bmR9O1xuXHR9XG5cdC5hZy1yb3ctaG92ZXIge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IubGlnaHRCbHVlfTtcblx0fVxuXG5cdC5hZy1oZWFkZXIge1xuXHRcdGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3JhZGllbnQubGlnaHR9O1xuXHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnRleHR9O1xuXG5cdFx0JiAuYWctaGVhZGVyLWNlbGwge1xuXHRcdFx0Ym9yZGVyLXJpZ2h0OiAxcHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5iYWNrZ3JvdW5kRGFya307XG5cdFx0fVxuXG5cdFx0JiAuYWctY29sdW1uLWhvdmVyIHtcblx0XHRcdGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3JhZGllbnQubGlnaHR9O1xuXHRcdFx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IudGV4dH07XG5cdFx0XHRib3JkZXItYm90dG9tOiA0cHggc29saWQgJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5yZWR9O1xuXHRcdH0gXG5cdH1cblxuXHQuYWctaWNvbi1kZXNjLFxuXHQuYWctaWNvbi1hc2Mge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYmx1ZX07XG5cdFx0Ym9yZGVyLXJhZGl1czogMTBweDtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0dG9wOiA1cHg7XG5cdFx0cGFkZGluZzogMnB4O1xuXHR9XG5cdC5hZy1pY29uLWZpbHRlciB7XG5cdFx0LyogYmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5ibHVlfTsgKi9cblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHRvcDogNXB4O1xuXHR9XG5cblx0LmFnLWZpbHRlcntcblx0XHRiYWNrZ3JvdW5kOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmdyYWRpZW50LmxpZ2h0fTtcblx0XHRib3gtc2hhZG93OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmJveFNoYWRvd0xpZ2h0fTtcblx0XHRmb250LWZhbWlseTogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5mb250Lm1haW59O1xuXHR9XG5cblx0LmFnLXRoZW1lLW1hdGVyaWFsIC5hZy1maWx0ZXIgaW5wdXRbdHlwZT1cInRleHRcIl0sIC5hZy10aGVtZS1tYXRlcmlhbCAuYWctZmlsdGVyIGlucHV0W3R5cGU9XCJkYXRlXCJdIHtcblx0XHRcdGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJvcmRlcn07XG5cdH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFRhYmxlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/components/SwiftTable/Table.js\n"
				);

				/***/
			},

		/***/ './frontend/defaultStyle.js':
			/*!**********************************!*\
  !*** ./frontend/defaultStyle.js ***!
  \**********************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.ApiCard = exports.ErrorDialog = exports.Card = undefined;\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n//Default styled div for others to extend from.\nvar defaultStyle = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'defaultStyle',\n\tcomponentId: 'g21vfe-0'\n})(['background-color:white;color:', ';font-family:', ';font-size:0.9em;'], function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.font.main;\n});\n\nvar Card = (0, _styledComponents2.default)(defaultStyle).withConfig({\n\tdisplayName: 'defaultStyle__Card',\n\tcomponentId: 'g21vfe-1'\n})(['border-radius:8px;box-shadow:', ';input{outline:none;color:', ';font-family:', ';background-color:', ';border:1px solid ', ';border-radius:5rem;transition:all 0.3s;::placeholder{font-size:1rem;font-weight:400;font-style:italic;font-family:', ';color:', ';}&:hover{border:solid 1px ', ';}&:focus,&:active{border:solid 1px ', ';}&.true{border:1px solid ', ';}}'], function (props) {\n\treturn props.theme.boxShadowLight;\n}, function (props) {\n\treturn props.theme.color.text;\n}, function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.color.input;\n}, function (props) {\n\treturn props.theme.color.input;\n}, function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.color.lightText;\n}, function (props) {\n\treturn props.theme.color.border;\n}, function (props) {\n\treturn props.theme.color.blue;\n}, function (props) {\n\treturn props.theme.color.red;\n});\n\nvar ErrorDialog = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'defaultStyle__ErrorDialog',\n\tcomponentId: 'g21vfe-2'\n})(['text-align:center;opacity:0;color:white;padding:0.5rem 1rem;border-radius:5px;background-color:', ';transition:all 0.3s;&.true{opacity:1;}'], function (props) {\n\treturn props.theme.color.red;\n});\n\nvar ApiCard = (0, _styledComponents2.default)(Card).withConfig({\n\tdisplayName: 'defaultStyle__ApiCard',\n\tcomponentId: 'g21vfe-3'\n})(['width:500px;padding:1rem;margin:auto;margin-top:1rem;background-color:#424242;color:', ';a{margin-left:1rem;color:', ';}.pill{background:', ';color:white;padding:0.1rem 0.5rem;border-radius:4px;}.pill-secondary{background-color:#595959;color:white;padding:0.1rem 0.5rem;border-radius:4px;}.gql_query{margin-left:0.5rem;color:', ';}.query_title{margin-top:0.75rem;}'], function (props) {\n\treturn props.theme.color.backgroundDarkest;\n}, function (props) {\n\treturn props.theme.color.aqua;\n}, function (props) {\n\treturn props.theme.gradient.greenBlue;\n}, function (props) {\n\treturn props.theme.color.backgroundDark;\n});\n\nvar _default = defaultStyle;\nexports.default = _default;\nexports.Card = Card;\nexports.ErrorDialog = ErrorDialog;\nexports.ApiCard = ApiCard;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(defaultStyle, 'defaultStyle', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js');\n\treactHotLoader.register(Card, 'Card', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js');\n\treactHotLoader.register(ErrorDialog, 'ErrorDialog', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js');\n\treactHotLoader.register(ApiCard, 'ApiCard', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/defaultStyle.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9kZWZhdWx0U3R5bGUuanM/OTc1ZCJdLCJuYW1lcyI6WyJkZWZhdWx0U3R5bGUiLCJzdHlsZWQiLCJkaXYiLCJwcm9wcyIsInRoZW1lIiwiY29sb3IiLCJ0ZXh0IiwiZm9udCIsIm1haW4iLCJDYXJkIiwiYm94U2hhZG93TGlnaHQiLCJpbnB1dCIsImxpZ2h0VGV4dCIsImJvcmRlciIsImJsdWUiLCJyZWQiLCJFcnJvckRpYWxvZyIsIkFwaUNhcmQiLCJiYWNrZ3JvdW5kRGFya2VzdCIsImFxdWEiLCJncmFkaWVudCIsImdyZWVuQmx1ZSIsImJhY2tncm91bmREYXJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7O0FBRUE7QUFDQSxJQUFNQSxlQUFlQywyQkFBT0MsR0FBdEI7QUFBQTtBQUFBO0FBQUEsNEVBRUk7QUFBQSxRQUFTQyxNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JDLElBQTNCO0FBQUEsQ0FGSixFQUdVO0FBQUEsUUFBU0gsTUFBTUMsS0FBTixDQUFZRyxJQUFaLENBQWlCQyxJQUExQjtBQUFBLENBSFYsQ0FBTjs7QUFPQSxJQUFNQyxPQUFPLGdDQUFPVCxZQUFQLENBQVA7QUFBQTtBQUFBO0FBQUEsK1dBRVM7QUFBQSxRQUFTRyxNQUFNQyxLQUFOLENBQVlNLGNBQXJCO0FBQUEsQ0FGVCxFQU1LO0FBQUEsUUFBU1AsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCQyxJQUEzQjtBQUFBLENBTkwsRUFPVztBQUFBLFFBQVNILE1BQU1DLEtBQU4sQ0FBWUcsSUFBWixDQUFpQkMsSUFBMUI7QUFBQSxDQVBYLEVBUWdCO0FBQUEsUUFBU0wsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCTSxLQUEzQjtBQUFBLENBUmhCLEVBU2dCO0FBQUEsUUFBU1IsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCTSxLQUEzQjtBQUFBLENBVGhCLEVBaUJZO0FBQUEsUUFBU1IsTUFBTUMsS0FBTixDQUFZRyxJQUFaLENBQWlCQyxJQUExQjtBQUFBLENBakJaLEVBa0JNO0FBQUEsUUFBU0wsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCTyxTQUEzQjtBQUFBLENBbEJOLEVBc0JpQjtBQUFBLFFBQVNULE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQlEsTUFBM0I7QUFBQSxDQXRCakIsRUEyQmlCO0FBQUEsUUFBU1YsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCUyxJQUEzQjtBQUFBLENBM0JqQixFQStCaUI7QUFBQSxRQUFTWCxNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JVLEdBQTNCO0FBQUEsQ0EvQmpCLENBQU47O0FBb0NBLElBQU1DLGNBQWNmLDJCQUFPQyxHQUFyQjtBQUFBO0FBQUE7QUFBQSxtSkFNZTtBQUFBLFFBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQlUsR0FBM0I7QUFBQSxDQU5mLENBQU47O0FBY0EsSUFBTUUsVUFBVSxnQ0FBT1IsSUFBUCxDQUFWO0FBQUE7QUFBQTtBQUFBLHFYQU1JO0FBQUEsUUFBU04sTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCYSxpQkFBM0I7QUFBQSxDQU5KLEVBV0s7QUFBQSxRQUFTZixNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JjLElBQTNCO0FBQUEsQ0FYTCxFQWVVO0FBQUEsUUFBU2hCLE1BQU1DLEtBQU4sQ0FBWWdCLFFBQVosQ0FBcUJDLFNBQTlCO0FBQUEsQ0FmVixFQTRCSztBQUFBLFFBQVNsQixNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JpQixjQUEzQjtBQUFBLENBNUJMLENBQU47O2VBb0NldEIsWTs7UUFDTlMsSSxHQUFBQSxJO1FBQU1PLFcsR0FBQUEsVztRQUFhQyxPLEdBQUFBLE87Ozs7Ozs7Ozs7eUJBOUZ0QmpCLFk7eUJBT0FTLEk7eUJBb0NBTyxXO3lCQWNBQyxPIiwiZmlsZSI6Ii4vZnJvbnRlbmQvZGVmYXVsdFN0eWxlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbi8vRGVmYXVsdCBzdHlsZWQgZGl2IGZvciBvdGhlcnMgdG8gZXh0ZW5kIGZyb20uXG5jb25zdCBkZWZhdWx0U3R5bGUgPSBzdHlsZWQuZGl2YFxuXHRiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcblx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IudGV4dH07XG5cdGZvbnQtZmFtaWx5OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnQubWFpbn07XG5cdGZvbnQtc2l6ZTogMC45ZW07XG5gO1xuXG5jb25zdCBDYXJkID0gc3R5bGVkKGRlZmF1bHRTdHlsZSlgXG5cdGJvcmRlci1yYWRpdXM6IDhweDtcblx0Ym94LXNoYWRvdzogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5ib3hTaGFkb3dMaWdodH07XG5cblx0aW5wdXQge1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdFx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IudGV4dH07XG5cdFx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5tYWlufTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmlucHV0fTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmlucHV0fTtcblx0XHRib3JkZXItcmFkaXVzOiA1cmVtO1xuXHRcdHRyYW5zaXRpb246IGFsbCAwLjNzO1xuXG5cdFx0OjpwbGFjZWhvbGRlciB7XG5cdFx0XHRmb250LXNpemU6IDFyZW07XG5cdFx0XHRmb250LXdlaWdodDogNDAwO1xuXHRcdFx0Zm9udC1zdHlsZTogaXRhbGljO1xuXHRcdFx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5tYWlufTtcblx0XHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmxpZ2h0VGV4dH07XG5cdFx0fVxuXG5cdFx0Jjpob3ZlciB7XG5cdFx0XHRib3JkZXI6IHNvbGlkIDFweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJvcmRlcn07XG5cdFx0fVxuXG5cdFx0Jjpmb2N1cyxcblx0XHQmOmFjdGl2ZSB7XG5cdFx0XHRib3JkZXI6IHNvbGlkIDFweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJsdWV9O1xuXHRcdH1cblxuXHRcdCYudHJ1ZSB7XG5cdFx0XHRib3JkZXI6IDFweCBzb2xpZCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnJlZH07XG5cdFx0fVxuXHR9XG5gO1xuXG5jb25zdCBFcnJvckRpYWxvZyA9IHN0eWxlZC5kaXZgXG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0b3BhY2l0eTogMDtcblx0Y29sb3I6IHdoaXRlO1xuXHRwYWRkaW5nOiAwLjVyZW0gMXJlbTtcblx0Ym9yZGVyLXJhZGl1czogNXB4O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnJlZH07XG5cdHRyYW5zaXRpb246IGFsbCAwLjNzO1xuXG5cdCYudHJ1ZSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuYDtcblxuY29uc3QgQXBpQ2FyZCA9IHN0eWxlZChDYXJkKWBcblx0d2lkdGg6IDUwMHB4O1xuXHRwYWRkaW5nOiAxcmVtO1xuXHRtYXJnaW46IGF1dG87XG5cdG1hcmdpbi10b3A6IDFyZW07XG5cdGJhY2tncm91bmQtY29sb3I6ICM0MjQyNDI7XG5cdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJhY2tncm91bmREYXJrZXN0fTtcblx0LyogdGV4dC1hbGlnbjogY2VudGVyOyAqL1xuXG5cdGEge1xuXHRcdG1hcmdpbi1sZWZ0OiAxcmVtO1xuXHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmFxdWF9O1xuXHR9XG5cblx0LnBpbGwge1xuXHRcdGJhY2tncm91bmQ6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZ3JhZGllbnQuZ3JlZW5CbHVlfTtcblx0XHRjb2xvcjogd2hpdGU7XG5cdFx0cGFkZGluZzogMC4xcmVtIDAuNXJlbTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdH1cblx0LnBpbGwtc2Vjb25kYXJ5IHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjNTk1OTU5O1xuXHRcdGNvbG9yOiB3aGl0ZTtcblx0XHRwYWRkaW5nOiAwLjFyZW0gMC41cmVtO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0fVxuXHQuZ3FsX3F1ZXJ5IHtcblx0XHRtYXJnaW4tbGVmdDogMC41cmVtO1xuXHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJhY2tncm91bmREYXJrfTtcblx0fVxuXG5cdC5xdWVyeV90aXRsZSB7XG5cdFx0bWFyZ2luLXRvcDogMC43NXJlbTtcblx0fVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdFN0eWxlO1xuZXhwb3J0IHsgQ2FyZCwgRXJyb3JEaWFsb2csIEFwaUNhcmQgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/defaultStyle.js\n"
				);

				/***/
			},

		/***/ './frontend/pages/App.js':
			/*!*******************************!*\
  !*** ./frontend/pages/App.js ***!
  \*******************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					'/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, "__esModule", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactHotLoader = __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");\n\nvar _Header = __webpack_require__(/*! ../components/Header/Header */ "./frontend/components/Header/Header.js");\n\nvar _Header2 = _interopRequireDefault(_Header);\n\nvar _Footer = __webpack_require__(/*! ../components/Footer/Footer */ "./frontend/components/Footer/Footer.js");\n\nvar _Footer2 = _interopRequireDefault(_Footer);\n\nvar _FrontPage = __webpack_require__(/*! ./FrontPage/FrontPage */ "./frontend/pages/FrontPage/FrontPage.js");\n\nvar _FrontPage2 = _interopRequireDefault(_FrontPage);\n\nvar _UploadPage = __webpack_require__(/*! ./UploadPage/UploadPage */ "./frontend/pages/UploadPage/UploadPage.js");\n\nvar _UploadPage2 = _interopRequireDefault(_UploadPage);\n\nvar _ViewPage = __webpack_require__(/*! ./ViewPage/ViewPage */ "./frontend/pages/ViewPage/ViewPage.js");\n\nvar _ViewPage2 = _interopRequireDefault(_ViewPage);\n\nvar _SheetPage = __webpack_require__(/*! ./SheetPage/SheetPage */ "./frontend/pages/SheetPage/SheetPage.js");\n\nvar _SheetPage2 = _interopRequireDefault(_SheetPage);\n\nvar _ScrollToTop = __webpack_require__(/*! ../components/ScrollToTop/ScrollToTop */ "./frontend/components/ScrollToTop/ScrollToTop.js");\n\nvar _ScrollToTop2 = _interopRequireDefault(_ScrollToTop);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/** @function\n * @name App\n *\n * @returns {JSX}\n */\nvar App = function App(_ref) {\n\tvar match = _ref.match;\n\n\treturn _react2.default.createElement(\n\t\t_ScrollToTop2.default,\n\t\tnull,\n\t\t_react2.default.createElement(_Header2.default, null),\n\t\t_react2.default.createElement(\n\t\t\t_reactRouterDom.Switch,\n\t\t\tnull,\n\t\t\t_react2.default.createElement(_reactRouterDom.Route, { exact: true, path: \'/\', component: _FrontPage2.default }),\n\t\t\t_react2.default.createElement(_reactRouterDom.Route, { path: \'/upload\', component: _UploadPage2.default }),\n\t\t\t_react2.default.createElement(_reactRouterDom.Route, { path: \'/view\', component: _ViewPage2.default }),\n\t\t\t_react2.default.createElement(_reactRouterDom.Route, { path: \'/:sheetId\', component: _SheetPage2.default })\n\t\t),\n\t\t_react2.default.createElement(_Footer2.default, null)\n\t);\n};\n\nvar _default = (0, _reactHotLoader.hot)(module)(App);\n\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(App, \'App\', \'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/App.js\');\n\treactHotLoader.register(_default, \'default\', \'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/App.js\');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9wYWdlcy9BcHAuanM/OWFiZiJdLCJuYW1lcyI6WyJBcHAiLCJtYXRjaCIsIkZyb250UGFnZSIsIlVwbG9hZFBhZ2UiLCJWaWV3UGFnZSIsIlNoZWV0UGFnZSIsIm1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7QUFLQSxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sT0FBZTtBQUFBLEtBQVpDLEtBQVksUUFBWkEsS0FBWTs7QUFDMUIsUUFDQztBQUFDLHVCQUFEO0FBQUE7QUFDQyxnQ0FBQyxnQkFBRCxPQUREO0FBRUM7QUFBQyx5QkFBRDtBQUFBO0FBQ0MsaUNBQUMscUJBQUQsSUFBTyxXQUFQLEVBQWEsTUFBSyxHQUFsQixFQUFzQixXQUFXQyxtQkFBakMsR0FERDtBQUVDLGlDQUFDLHFCQUFELElBQU8sTUFBSyxTQUFaLEVBQXNCLFdBQVdDLG9CQUFqQyxHQUZEO0FBR0MsaUNBQUMscUJBQUQsSUFBTyxNQUFLLE9BQVosRUFBb0IsV0FBV0Msa0JBQS9CLEdBSEQ7QUFJQyxpQ0FBQyxxQkFBRCxJQUFPLE1BQUssV0FBWixFQUF3QixXQUFXQyxtQkFBbkM7QUFKRCxHQUZEO0FBUUMsZ0NBQUMsZ0JBQUQ7QUFSRCxFQUREO0FBWUEsQ0FiRDs7ZUFlZSx5QkFBSUMsTUFBSixFQUFZTixHQUFaLEM7Ozs7Ozs7Ozs7Ozt5QkFmVEEsRyIsImZpbGUiOiIuL2Zyb250ZW5kL3BhZ2VzL0FwcC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyJztcbmltcG9ydCB7IFJvdXRlLCBTd2l0Y2ggfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcblxuaW1wb3J0IEhlYWRlciBmcm9tICcuLi9jb21wb25lbnRzL0hlYWRlci9IZWFkZXInO1xuaW1wb3J0IEZvb3RlciBmcm9tICcuLi9jb21wb25lbnRzL0Zvb3Rlci9Gb290ZXInO1xuaW1wb3J0IEZyb250UGFnZSBmcm9tICcuL0Zyb250UGFnZS9Gcm9udFBhZ2UnO1xuaW1wb3J0IFVwbG9hZFBhZ2UgZnJvbSAnLi9VcGxvYWRQYWdlL1VwbG9hZFBhZ2UnO1xuaW1wb3J0IFZpZXdQYWdlIGZyb20gJy4vVmlld1BhZ2UvVmlld1BhZ2UnO1xuaW1wb3J0IFNoZWV0UGFnZSBmcm9tICcuL1NoZWV0UGFnZS9TaGVldFBhZ2UnO1xuaW1wb3J0IFNjcm9sbFRvVG9wIGZyb20gJy4uL2NvbXBvbmVudHMvU2Nyb2xsVG9Ub3AvU2Nyb2xsVG9Ub3AnO1xuXG4vKiogQGZ1bmN0aW9uXG4gKiBAbmFtZSBBcHBcbiAqXG4gKiBAcmV0dXJucyB7SlNYfVxuICovXG5jb25zdCBBcHAgPSAoeyBtYXRjaCB9KSA9PiB7XG5cdHJldHVybiAoXG5cdFx0PFNjcm9sbFRvVG9wPlxuXHRcdFx0PEhlYWRlciAvPlxuXHRcdFx0PFN3aXRjaD5cblx0XHRcdFx0PFJvdXRlIGV4YWN0IHBhdGg9XCIvXCIgY29tcG9uZW50PXtGcm9udFBhZ2V9IC8+XG5cdFx0XHRcdDxSb3V0ZSBwYXRoPVwiL3VwbG9hZFwiIGNvbXBvbmVudD17VXBsb2FkUGFnZX0gLz5cblx0XHRcdFx0PFJvdXRlIHBhdGg9XCIvdmlld1wiIGNvbXBvbmVudD17Vmlld1BhZ2V9IC8+XG5cdFx0XHRcdDxSb3V0ZSBwYXRoPVwiLzpzaGVldElkXCIgY29tcG9uZW50PXtTaGVldFBhZ2V9IC8+XG5cdFx0XHQ8L1N3aXRjaD5cblx0XHRcdDxGb290ZXIgLz5cblx0XHQ8L1Njcm9sbFRvVG9wPlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaG90KG1vZHVsZSkoQXBwKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/pages/App.js\n'
				);

				/***/
			},

		/***/ './frontend/pages/FrontPage/FrontPage.js':
			/*!***********************************************!*\
  !*** ./frontend/pages/FrontPage/FrontPage.js ***!
  \***********************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nvar _ScrollDownIcon = __webpack_require__(/*! ../../components/ScrollDownIcon/ScrollDownIcon */ \"./frontend/components/ScrollDownIcon/ScrollDownIcon.js\");\n\nvar _ScrollDownIcon2 = _interopRequireDefault(_ScrollDownIcon);\n\nvar _IllustratedStep = __webpack_require__(/*! ../../components/IllustratedStep/IllustratedStep */ \"./frontend/components/IllustratedStep/IllustratedStep.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nvar FrontPage = function FrontPage() {\n\treturn _react2.default.createElement(\n\t\t'div',\n\t\tnull,\n\t\t_react2.default.createElement(HeroImg, null),\n\t\t_react2.default.createElement(\n\t\t\tStyledHeader,\n\t\t\tnull,\n\t\t\t_react2.default.createElement('img', { src: './assets/images/logo-sheet.svg', alt: 'logo', height: '150' }),\n\t\t\t'Quickly share an online spreadsheet or API endpoint, then make it go away.'\n\t\t),\n\t\t_react2.default.createElement(_ScrollDownIcon2.default, null),\n\t\t_react2.default.createElement(\n\t\t\tInfoSection,\n\t\t\tnull,\n\t\t\t_react2.default.createElement(\n\t\t\t\t_IllustratedStep.IllustratedStep,\n\t\t\t\t{\n\t\t\t\t\tstep: 1,\n\t\t\t\t\tgraphicPath: './assets/images/upload-simple.svg',\n\t\t\t\t\theader: 'Upload a CSV File & Set Expiration Time'\n\t\t\t\t},\n\t\t\t\t'Go to ',\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t_reactRouterDom.NavLink,\n\t\t\t\t\t{ to: '/upload' },\n\t\t\t\t\t'Upload'\n\t\t\t\t),\n\t\t\t\t' section and drag a file into the upload area. From there',\n\t\t\t\t' ',\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'span',\n\t\t\t\t\t{ className: 'highlight' },\n\t\t\t\t\t'set how long until the sheet expires'\n\t\t\t\t),\n\t\t\t\t', if the sheet has a header, and an optional password.'\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t_IllustratedStep.IllustratedStep,\n\t\t\t\t{\n\t\t\t\t\tstep: 2,\n\t\t\t\t\tgraphicPath: './assets/images/share.svg',\n\t\t\t\t\theader: 'Get a Shareable Link or API Endpoint'\n\t\t\t\t},\n\t\t\t\t'Once Uploaded, share the',\n\t\t\t\t' ',\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'span',\n\t\t\t\t\t{ className: 'highlight' },\n\t\t\t\t\t'link to an interactive spreadsheet'\n\t\t\t\t),\n\t\t\t\t' ',\n\t\t\t\t'with filtering and sorting. Additionally, for the developer crowd, get temporary API',\n\t\t\t\t' ',\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'span',\n\t\t\t\t\t{ className: 'highlight' },\n\t\t\t\t\t'endpoints for REST or GraphQL'\n\t\t\t\t),\n\t\t\t\t'.'\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\t_IllustratedStep.IllustratedStep,\n\t\t\t\t{\n\t\t\t\t\tstep: 3,\n\t\t\t\t\tgraphicPath: './assets/images/not-found.svg',\n\t\t\t\t\theader: 'The Sheet is Deleted Once Expired'\n\t\t\t\t},\n\t\t\t\t'When the sheet reaching the expiration time, it is',\n\t\t\t\t' ',\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t'span',\n\t\t\t\t\t{ className: 'highlight' },\n\t\t\t\t\t'automatically deleted from the database'\n\t\t\t\t),\n\t\t\t\t', and no longer shareable.'\n\t\t\t)\n\t\t)\n\t);\n};\n\nvar HeroImg = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'FrontPage__HeroImg',\n\tcomponentId: 't48di8-0'\n})(['background-image:url(\\'assets/images/banner-lg.jpg\\');height:100vh;background-position:center;background-repeat:no-repeat;background-size:cover;']);\n\nvar StyledHeader = _styledComponents2.default.h3.withConfig({\n\tdisplayName: 'FrontPage__StyledHeader',\n\tcomponentId: 't48di8-1'\n})(['position:absolute;top:100px;font-family:', ';color:', ';width:60%;padding-left:2rem;padding-right:0;line-height:145%;font-size:5.5rem;img{position:relative;top:2.8rem;margin-right:1.5rem;}@media (max-height:950px){font-size:4.5rem;img{top:1.5rem;height:100px;}}@media (max-height:800px){font-size:3.5rem;line-height:125%;}@media (max-width:1250px){font-size:4.75rem;img{top:1.5rem;height:100px;}}@media (max-width:900px){font-size:4.2rem;line-height:125%;img{top:1rem;height:80px;}}@media (max-width:800px){font-size:3.5rem;line-height:125%;width:75%;img{top:1rem;height:80px;}}'], function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.color.red;\n});\n\nvar InfoSection = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'FrontPage__InfoSection',\n\tcomponentId: 't48di8-2'\n})(['padding-top:100px;padding-bottom:50px;background-color:', ';display:flex;flex-direction:column;justify-content:center;&:before{content:\\'\\';position:absolute;left:0;top:100%;height:100px;width:100%;transform-origin:0 0;transform:skewY(-2deg);background-color:', ';}'], function (props) {\n\treturn props.theme.color.aqua;\n}, function (props) {\n\treturn props.theme.color.aqua;\n});\n\nvar _default = FrontPage;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(FrontPage, 'FrontPage', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js');\n\treactHotLoader.register(HeroImg, 'HeroImg', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js');\n\treactHotLoader.register(StyledHeader, 'StyledHeader', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js');\n\treactHotLoader.register(InfoSection, 'InfoSection', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/FrontPage/FrontPage.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9wYWdlcy9Gcm9udFBhZ2UvRnJvbnRQYWdlLmpzP2MwMTIiXSwibmFtZXMiOlsiRnJvbnRQYWdlIiwiSGVyb0ltZyIsInN0eWxlZCIsImRpdiIsIlN0eWxlZEhlYWRlciIsImgzIiwicHJvcHMiLCJ0aGVtZSIsImZvbnQiLCJtYWluIiwiY29sb3IiLCJyZWQiLCJJbmZvU2VjdGlvbiIsImRlZmF1bHRTdHlsZSIsImFxdWEiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVksU0FBWkEsU0FBWTtBQUFBLFFBQ2pCO0FBQUE7QUFBQTtBQUNDLGdDQUFDLE9BQUQsT0FERDtBQUVDO0FBQUMsZUFBRDtBQUFBO0FBQ0MsMENBQUssS0FBSSxnQ0FBVCxFQUEwQyxLQUFJLE1BQTlDLEVBQXFELFFBQU8sS0FBNUQsR0FERDtBQUFBO0FBQUEsR0FGRDtBQU1DLGdDQUFDLHdCQUFELE9BTkQ7QUFPQztBQUFDLGNBQUQ7QUFBQTtBQUNDO0FBQUMsb0NBQUQ7QUFBQTtBQUNDLFdBQU0sQ0FEUDtBQUVDLGtCQUFZLG1DQUZiO0FBR0MsYUFBTztBQUhSO0FBQUE7QUFLTztBQUFDLDRCQUFEO0FBQUEsT0FBUyxJQUFHLFNBQVo7QUFBQTtBQUFBLEtBTFA7QUFBQTtBQU1rQyxPQU5sQztBQU9DO0FBQUE7QUFBQSxPQUFNLFdBQVUsV0FBaEI7QUFBQTtBQUFBLEtBUEQ7QUFBQTtBQUFBLElBREQ7QUFXQztBQUFDLG9DQUFEO0FBQUE7QUFDQyxXQUFNLENBRFA7QUFFQyxrQkFBWSwyQkFGYjtBQUdDLGFBQU87QUFIUjtBQUFBO0FBSzBCLE9BTDFCO0FBTUM7QUFBQTtBQUFBLE9BQU0sV0FBVSxXQUFoQjtBQUFBO0FBQUEsS0FORDtBQU11RSxPQU52RTtBQUFBO0FBUWUsT0FSZjtBQVNDO0FBQUE7QUFBQSxPQUFNLFdBQVUsV0FBaEI7QUFBQTtBQUFBLEtBVEQ7QUFBQTtBQUFBLElBWEQ7QUFzQkM7QUFBQyxvQ0FBRDtBQUFBO0FBQ0MsV0FBTSxDQURQO0FBRUMsa0JBQVksK0JBRmI7QUFHQyxhQUFPO0FBSFI7QUFBQTtBQUtvRCxPQUxwRDtBQU1DO0FBQUE7QUFBQSxPQUFNLFdBQVUsV0FBaEI7QUFBQTtBQUFBLEtBTkQ7QUFBQTtBQUFBO0FBdEJEO0FBUEQsRUFEaUI7QUFBQSxDQUFsQjs7QUE2Q0EsSUFBTUMsVUFBVUMsMkJBQU9DLEdBQWpCO0FBQUE7QUFBQTtBQUFBLHdKQUFOOztBQVFBLElBQU1DLGVBQWVGLDJCQUFPRyxFQUF0QjtBQUFBO0FBQUE7QUFBQSwya0JBR1U7QUFBQSxRQUFTQyxNQUFNQyxLQUFOLENBQVlDLElBQVosQ0FBaUJDLElBQTFCO0FBQUEsQ0FIVixFQUlJO0FBQUEsUUFBU0gsTUFBTUMsS0FBTixDQUFZRyxLQUFaLENBQWtCQyxHQUEzQjtBQUFBLENBSkosQ0FBTjs7QUF1REEsSUFBTUMsY0FBYyxnQ0FBT0Msc0JBQVAsQ0FBZDtBQUFBO0FBQUE7QUFBQSxrUkFHZTtBQUFBLFFBQVNQLE1BQU1DLEtBQU4sQ0FBWUcsS0FBWixDQUFrQkksSUFBM0I7QUFBQSxDQUhmLEVBaUJnQjtBQUFBLFFBQVNSLE1BQU1DLEtBQU4sQ0FBWUcsS0FBWixDQUFrQkksSUFBM0I7QUFBQSxDQWpCaEIsQ0FBTjs7ZUFxQmVkLFM7Ozs7Ozs7Ozs7O3lCQWpJVEEsUzt5QkE2Q0FDLE87eUJBUUFHLFk7eUJBdURBUSxXIiwiZmlsZSI6Ii4vZnJvbnRlbmQvcGFnZXMvRnJvbnRQYWdlL0Zyb250UGFnZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBkZWZhdWx0U3R5bGUgZnJvbSAnLi4vLi4vZGVmYXVsdFN0eWxlJztcbmltcG9ydCBTY3JvbGxEb3duSWNvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL1Njcm9sbERvd25JY29uL1Njcm9sbERvd25JY29uJztcbmltcG9ydCB7IElsbHVzdHJhdGVkU3RlcCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSWxsdXN0cmF0ZWRTdGVwL0lsbHVzdHJhdGVkU3RlcCc7XG5pbXBvcnQgeyBMaW5rLCBOYXZMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmNvbnN0IEZyb250UGFnZSA9ICgpID0+IChcblx0PGRpdj5cblx0XHQ8SGVyb0ltZyAvPlxuXHRcdDxTdHlsZWRIZWFkZXI+XG5cdFx0XHQ8aW1nIHNyYz1cIi4vYXNzZXRzL2ltYWdlcy9sb2dvLXNoZWV0LnN2Z1wiIGFsdD1cImxvZ29cIiBoZWlnaHQ9XCIxNTBcIiAvPlxuXHRcdFx0UXVpY2tseSBzaGFyZSBhbiBvbmxpbmUgc3ByZWFkc2hlZXQgb3IgQVBJIGVuZHBvaW50LCB0aGVuIG1ha2UgaXQgZ28gYXdheS5cblx0XHQ8L1N0eWxlZEhlYWRlcj5cblx0XHQ8U2Nyb2xsRG93bkljb24gLz5cblx0XHQ8SW5mb1NlY3Rpb24+XG5cdFx0XHQ8SWxsdXN0cmF0ZWRTdGVwXG5cdFx0XHRcdHN0ZXA9ezF9XG5cdFx0XHRcdGdyYXBoaWNQYXRoPVwiLi9hc3NldHMvaW1hZ2VzL3VwbG9hZC1zaW1wbGUuc3ZnXCJcblx0XHRcdFx0aGVhZGVyPVwiVXBsb2FkIGEgQ1NWIEZpbGUgJiBTZXQgRXhwaXJhdGlvbiBUaW1lXCJcblx0XHRcdD5cblx0XHRcdFx0R28gdG8gPE5hdkxpbmsgdG89XCIvdXBsb2FkXCI+VXBsb2FkPC9OYXZMaW5rPiBzZWN0aW9uIGFuZCBkcmFnIGEgZmlsZVxuXHRcdFx0XHRpbnRvIHRoZSB1cGxvYWQgYXJlYS4gRnJvbSB0aGVyZXsnICd9XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImhpZ2hsaWdodFwiPnNldCBob3cgbG9uZyB1bnRpbCB0aGUgc2hlZXQgZXhwaXJlczwvc3Bhbj4sXG5cdFx0XHRcdGlmIHRoZSBzaGVldCBoYXMgYSBoZWFkZXIsIGFuZCBhbiBvcHRpb25hbCBwYXNzd29yZC5cblx0XHRcdDwvSWxsdXN0cmF0ZWRTdGVwPlxuXHRcdFx0PElsbHVzdHJhdGVkU3RlcFxuXHRcdFx0XHRzdGVwPXsyfVxuXHRcdFx0XHRncmFwaGljUGF0aD1cIi4vYXNzZXRzL2ltYWdlcy9zaGFyZS5zdmdcIlxuXHRcdFx0XHRoZWFkZXI9XCJHZXQgYSBTaGFyZWFibGUgTGluayBvciBBUEkgRW5kcG9pbnRcIlxuXHRcdFx0PlxuXHRcdFx0XHRPbmNlIFVwbG9hZGVkLCBzaGFyZSB0aGV7JyAnfVxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJoaWdobGlnaHRcIj5saW5rIHRvIGFuIGludGVyYWN0aXZlIHNwcmVhZHNoZWV0PC9zcGFuPnsnICd9XG5cdFx0XHRcdHdpdGggZmlsdGVyaW5nIGFuZCBzb3J0aW5nLiBBZGRpdGlvbmFsbHksIGZvciB0aGUgZGV2ZWxvcGVyIGNyb3dkLCBnZXRcblx0XHRcdFx0dGVtcG9yYXJ5IEFQSXsnICd9XG5cdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cImhpZ2hsaWdodFwiPmVuZHBvaW50cyBmb3IgUkVTVCBvciBHcmFwaFFMPC9zcGFuPi5cblx0XHRcdDwvSWxsdXN0cmF0ZWRTdGVwPlxuXHRcdFx0PElsbHVzdHJhdGVkU3RlcFxuXHRcdFx0XHRzdGVwPXszfVxuXHRcdFx0XHRncmFwaGljUGF0aD1cIi4vYXNzZXRzL2ltYWdlcy9ub3QtZm91bmQuc3ZnXCJcblx0XHRcdFx0aGVhZGVyPVwiVGhlIFNoZWV0IGlzIERlbGV0ZWQgT25jZSBFeHBpcmVkXCJcblx0XHRcdD5cblx0XHRcdFx0V2hlbiB0aGUgc2hlZXQgcmVhY2hpbmcgdGhlIGV4cGlyYXRpb24gdGltZSwgaXQgaXN7JyAnfVxuXHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJoaWdobGlnaHRcIj5cblx0XHRcdFx0XHRhdXRvbWF0aWNhbGx5IGRlbGV0ZWQgZnJvbSB0aGUgZGF0YWJhc2Vcblx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHQsIGFuZCBubyBsb25nZXIgc2hhcmVhYmxlLlxuXHRcdFx0PC9JbGx1c3RyYXRlZFN0ZXA+XG5cdFx0PC9JbmZvU2VjdGlvbj5cblx0PC9kaXY+XG4pO1xuXG5jb25zdCBIZXJvSW1nID0gc3R5bGVkLmRpdmBcblx0YmFja2dyb3VuZC1pbWFnZTogdXJsKCdhc3NldHMvaW1hZ2VzL2Jhbm5lci1sZy5qcGcnKTtcblx0aGVpZ2h0OiAxMDB2aDtcblx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuXHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuYDtcblxuY29uc3QgU3R5bGVkSGVhZGVyID0gc3R5bGVkLmgzYFxuXHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdHRvcDogMTAwcHg7XG5cdGZvbnQtZmFtaWx5OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnQubWFpbn07XG5cdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLnJlZH07XG5cdHdpZHRoOiA2MCU7XG5cdHBhZGRpbmctbGVmdDogMnJlbTtcblx0cGFkZGluZy1yaWdodDogMDtcblx0bGluZS1oZWlnaHQ6IDE0NSU7XG5cdGZvbnQtc2l6ZTogNS41cmVtO1xuXG5cdGltZyB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHRvcDogMi44cmVtO1xuXHRcdG1hcmdpbi1yaWdodDogMS41cmVtO1xuXHR9XG5cblx0QG1lZGlhIChtYXgtaGVpZ2h0OiA5NTBweCkge1xuXHRcdGZvbnQtc2l6ZTogNC41cmVtO1xuXHRcdGltZyB7XG5cdFx0XHR0b3A6IDEuNXJlbTtcblx0XHRcdGhlaWdodDogMTAwcHg7XG5cdFx0fVxuXHR9XG5cdEBtZWRpYSAobWF4LWhlaWdodDogODAwcHgpIHtcblx0XHRmb250LXNpemU6IDMuNXJlbTtcblx0XHRsaW5lLWhlaWdodDogMTI1JTtcblx0fVxuXG5cdEBtZWRpYSAobWF4LXdpZHRoOiAxMjUwcHgpIHtcblx0XHRmb250LXNpemU6IDQuNzVyZW07XG5cdFx0aW1nIHtcblx0XHRcdHRvcDogMS41cmVtO1xuXHRcdFx0aGVpZ2h0OiAxMDBweDtcblx0XHR9XG5cdH1cblx0QG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XG5cdFx0Zm9udC1zaXplOiA0LjJyZW07XG5cdFx0bGluZS1oZWlnaHQ6IDEyNSU7XG5cdFx0aW1nIHtcblx0XHRcdHRvcDogMXJlbTtcblx0XHRcdGhlaWdodDogODBweDtcblx0XHR9XG5cdH1cblx0QG1lZGlhIChtYXgtd2lkdGg6IDgwMHB4KSB7XG5cdFx0Zm9udC1zaXplOiAzLjVyZW07XG5cdFx0bGluZS1oZWlnaHQ6IDEyNSU7XG5cdFx0d2lkdGg6IDc1JTtcblx0XHRpbWcge1xuXHRcdFx0dG9wOiAxcmVtO1xuXHRcdFx0aGVpZ2h0OiA4MHB4O1xuXHRcdH1cblx0fVxuYDtcblxuY29uc3QgSW5mb1NlY3Rpb24gPSBzdHlsZWQoZGVmYXVsdFN0eWxlKWBcblx0cGFkZGluZy10b3A6IDEwMHB4O1xuXHRwYWRkaW5nLWJvdHRvbTogNTBweDtcblx0YmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5hcXVhfTtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cblx0JjpiZWZvcmUge1xuXHRcdGNvbnRlbnQ6ICcnO1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRsZWZ0OiAwO1xuXHRcdHRvcDogMTAwJTtcblx0XHRoZWlnaHQ6IDEwMHB4O1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdHRyYW5zZm9ybS1vcmlnaW46IDAgMDtcblx0XHR0cmFuc2Zvcm06IHNrZXdZKC0yZGVnKTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmFxdWF9O1xuXHR9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBGcm9udFBhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/pages/FrontPage/FrontPage.js\n"
				);

				/***/
			},

		/***/ './frontend/pages/SheetPage/SheetPage.js':
			/*!***********************************************!*\
  !*** ./frontend/pages/SheetPage/SheetPage.js ***!
  \***********************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\nexports.GET_SHEET = undefined;\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tquery GET_SHEET($sheetId: ID!, $password: String) {\\n\\t\\tsheet(_id: $sheetId, password: $password) {\\n\\t\\t\\tsheetData\\n\\t\\t\\texpireAt\\n\\t\\t}\\n\\t}\\n'], ['\\n\\tquery GET_SHEET($sheetId: ID!, $password: String) {\\n\\t\\tsheet(_id: $sheetId, password: $password) {\\n\\t\\t\\tsheetData\\n\\t\\t\\texpireAt\\n\\t\\t}\\n\\t}\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _reactApollo = __webpack_require__(/*! react-apollo */ \"./node_modules/react-apollo/react-apollo.browser.umd.js\");\n\nvar _graphqlTag = __webpack_require__(/*! graphql-tag */ \"./node_modules/graphql-tag/src/index.js\");\n\nvar _graphqlTag2 = _interopRequireDefault(_graphqlTag);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nvar _format = __webpack_require__(/*! date-fns/format */ \"./node_modules/date-fns/format/index.js\");\n\nvar _format2 = _interopRequireDefault(_format);\n\nvar _Table = __webpack_require__(/*! ../../components/SwiftTable/Table */ \"./frontend/components/SwiftTable/Table.js\");\n\nvar _Table2 = _interopRequireDefault(_Table);\n\nvar _PasswordPrompt = __webpack_require__(/*! ../../components/PasswordPrompt/PasswordPrompt */ \"./frontend/components/PasswordPrompt/PasswordPrompt.js\");\n\nvar _RestExample = __webpack_require__(/*! ../../components/RestExample/RestExample */ \"./frontend/components/RestExample/RestExample.js\");\n\nvar _GQLExample = __webpack_require__(/*! ../../components/GQLExample/GQLExample */ \"./frontend/components/GQLExample/GQLExample.js\");\n\nvar _errorMessage = __webpack_require__(/*! ../../../shared/enums/errorMessage */ \"./shared/enums/errorMessage.js\");\n\nvar errorMessage = _interopRequireWildcard(_errorMessage);\n\nvar _history = __webpack_require__(/*! ../../utils/history */ \"./frontend/utils/history.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nfunction _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar GET_SHEET = exports.GET_SHEET = (0, _graphqlTag2.default)(_templateObject);\n\nvar SheetPage = function SheetPage(_ref) {\n\tvar match = _ref.match;\n\tvar sheetId = match.params.sheetId;\n\n\tvar _useState = (0, _react.useState)(''),\n\t    _useState2 = _slicedToArray(_useState, 2),\n\t    password = _useState2[0],\n\t    setPassword = _useState2[1];\n\n\treturn _react2.default.createElement(\n\t\t_reactApollo.Query,\n\t\t{ query: GET_SHEET, variables: { sheetId: sheetId, password: password } },\n\t\tfunction (_ref2) {\n\t\t\tvar loading = _ref2.loading,\n\t\t\t    error = _ref2.error,\n\t\t\t    data = _ref2.data;\n\n\t\t\tif (loading) return _react2.default.createElement(\n\t\t\t\tStyledDiv,\n\t\t\t\tnull,\n\t\t\t\t'Loading...'\n\t\t\t);\n\n\t\t\t// if password not provided\n\t\t\tif (error && (error.message.includes(errorMessage.noPassword) || error.message.includes(errorMessage.wrongPassword))) {\n\t\t\t\tvar wrongPassword = error.message.includes(errorMessage.wrongPassword);\n\t\t\t\t// then prompt user for password before proceeding\n\t\t\t\treturn _react2.default.createElement(_PasswordPrompt.PasswordPrompt, {\n\t\t\t\t\tpassword: password,\n\t\t\t\t\tsetPassword: setPassword,\n\t\t\t\t\twrongPassword: wrongPassword\n\t\t\t\t});\n\t\t\t}\n\n\t\t\tif (error) {\n\t\t\t\t(0, _history.removeFromHistory)(sheetId);\n\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\tExpiredNotice,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t'section',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'p',\n\t\t\t\t\t\t\t{ className: 'errorMessage' },\n\t\t\t\t\t\t\t'Sorry, looks like this sheet may have expired.'\n\t\t\t\t\t\t),\n\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t'p',\n\t\t\t\t\t\t\tnull,\n\t\t\t\t\t\t\t'Maybe ',\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_reactRouterDom.Link,\n\t\t\t\t\t\t\t\t{ to: '/upload' },\n\t\t\t\t\t\t\t\t'Upload'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t' a new one, or check recently ',\n\t\t\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\t\t\t_reactRouterDom.Link,\n\t\t\t\t\t\t\t\t{ to: '/view' },\n\t\t\t\t\t\t\t\t'viewed'\n\t\t\t\t\t\t\t),\n\t\t\t\t\t\t\t'.'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t);\n\t\t\t}\n\n\t\t\tvar _data$sheet = data.sheet,\n\t\t\t    sheetData = _data$sheet.sheetData,\n\t\t\t    expireAt = _data$sheet.expireAt;\n\n\t\t\t(0, _history.addToHistory)(sheetId);\n\t\t\treturn _react2.default.createElement(\n\t\t\t\tWrapperDiv,\n\t\t\t\tnull,\n\t\t\t\t_react2.default.createElement(_RestExample.RestExample, { host: window.location.origin, id: sheetId }),\n\t\t\t\t_react2.default.createElement(_GQLExample.GQLExample, { host: window.location.origin, id: sheetId }),\n\t\t\t\t_react2.default.createElement(\n\t\t\t\t\tStyledDiv,\n\t\t\t\t\tnull,\n\t\t\t\t\t_react2.default.createElement(\n\t\t\t\t\t\tExpireDiv,\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\t'Sheet Expires on:',\n\t\t\t\t\t\t' ',\n\t\t\t\t\t\t(0, _format2.default)(expireAt, 'MMM DD, YYYY  @  h:mm aa  (Z [GMT])')\n\t\t\t\t\t),\n\t\t\t\t\t_react2.default.createElement(_Table2.default, { data: sheetData })\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t);\n};\n\nvar WrapperDiv = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'SheetPage__WrapperDiv',\n\tcomponentId: 'sc-1hklb6l-0'\n})(['padding-top:6rem;background-color:', ';margin-top:0rem;padding-bottom:2rem;width:100%;'], function (props) {\n\treturn props.theme.color.background;\n});\n\nvar StyledDiv = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'SheetPage__StyledDiv',\n\tcomponentId: 'sc-1hklb6l-1'\n})(['background-color:', ';padding-bottom:2rem;margin-bottom:0px;width:100%;height:calc(100vh - 140px);'], function (props) {\n\treturn props.theme.color.background;\n});\n\nvar ExpireDiv = _styledComponents2.default.div.withConfig({\n\tdisplayName: 'SheetPage__ExpireDiv',\n\tcomponentId: 'sc-1hklb6l-2'\n})(['text-align:center;color:', ';margin-top:2rem;'], function (props) {\n\treturn props.theme.color.lightText;\n});\n\nvar ExpiredNotice = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'SheetPage__ExpiredNotice',\n\tcomponentId: 'sc-1hklb6l-3'\n})(['background-color:', ';height:calc(100vh - 55px);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;section{margin-bottom:1rem;background-color:white;padding:2.5rem 4rem;border-radius:8px;box-shadow:', ';}p{margin:1rem;}a{color:', ';}'], function (props) {\n\treturn props.theme.color.background;\n}, function (props) {\n\treturn props.theme.boxShadowLight;\n}, function (props) {\n\treturn props.theme.color.blue;\n});\n\nvar _default = SheetPage;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(GET_SHEET, 'GET_SHEET', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n\treactHotLoader.register(SheetPage, 'SheetPage', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n\treactHotLoader.register(WrapperDiv, 'WrapperDiv', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n\treactHotLoader.register(StyledDiv, 'StyledDiv', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n\treactHotLoader.register(ExpireDiv, 'ExpireDiv', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n\treactHotLoader.register(ExpiredNotice, 'ExpiredNotice', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/SheetPage/SheetPage.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9wYWdlcy9TaGVldFBhZ2UvU2hlZXRQYWdlLmpzPzI0MzgiXSwibmFtZXMiOlsiZXJyb3JNZXNzYWdlIiwiR0VUX1NIRUVUIiwiZ3FsIiwiU2hlZXRQYWdlIiwibWF0Y2giLCJzaGVldElkIiwicGFyYW1zIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsImxvYWRpbmciLCJlcnJvciIsImRhdGEiLCJtZXNzYWdlIiwiaW5jbHVkZXMiLCJub1Bhc3N3b3JkIiwid3JvbmdQYXNzd29yZCIsInNoZWV0Iiwic2hlZXREYXRhIiwiZXhwaXJlQXQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsIldyYXBwZXJEaXYiLCJkZWZhdWx0U3R5bGUiLCJwcm9wcyIsInRoZW1lIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiU3R5bGVkRGl2IiwiRXhwaXJlRGl2Iiwic3R5bGVkIiwiZGl2IiwibGlnaHRUZXh0IiwiRXhwaXJlZE5vdGljZSIsImJveFNoYWRvd0xpZ2h0IiwiYmx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7SUFBWUEsWTs7QUFDWjs7QUFDQTs7Ozs7Ozs7Ozs7OztBQUVPLElBQU1DLG9DQUFZQyxvQkFBWixrQkFBTjs7QUFTUCxJQUFNQyxZQUFZLFNBQVpBLFNBQVksT0FBZTtBQUFBLEtBQVpDLEtBQVksUUFBWkEsS0FBWTtBQUFBLEtBQ3hCQyxPQUR3QixHQUNaRCxNQUFNRSxNQURNLENBQ3hCRCxPQUR3Qjs7QUFBQSxpQkFFQSxxQkFBUyxFQUFULENBRkE7QUFBQTtBQUFBLEtBRXpCRSxRQUZ5QjtBQUFBLEtBRWZDLFdBRmU7O0FBSWhDLFFBQ0M7QUFBQyxvQkFBRDtBQUFBLElBQU8sT0FBT1AsU0FBZCxFQUF5QixXQUFXLEVBQUVJLGdCQUFGLEVBQVdFLGtCQUFYLEVB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eUJBU1BFLFM7eUJBaUVBbUIsVTt5QkFRQU0sUzt5QkFRQUMsUzt5QkFNQUksYSIsImZpbGUiOiIuL2Zyb250ZW5kL3BhZ2VzL1NoZWV0UGFnZS9TaGVldFBhZ2UuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IFF1ZXJ5IH0gZnJvbSAncmVhY3QtYXBvbGxvJztcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuaW1wb3J0IGRlZmF1bHRTdHlsZSBmcm9tICcuLi8uLi9kZWZhdWx0U3R5bGUnO1xuaW1wb3J0IGZvcm1hdCBmcm9tICdkYXRlLWZucy9mb3JtYXQnO1xuaW1wb3J0IFRhYmxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU3dpZnRUYWJsZS9UYWJsZSc7XG5pbXBvcnQgeyBQYXNzd29yZFByb21wdCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUGFzc3dvcmRQcm9tcHQvUGFzc3dvcmRQcm9tcHQnO1xuaW1wb3J0IHsgUmVzdEV4YW1wbGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL1Jlc3RFeGFtcGxlL1Jlc3RFeGFtcGxlJztcbmltcG9ydCB7IEdRTEV4YW1wbGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0dRTEV4YW1wbGUvR1FMRXhhbXBsZSc7XG5pbXBvcnQgKiBhcyBlcnJvck1lc3NhZ2UgZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2VudW1zL2Vycm9yTWVzc2FnZSc7XG5pbXBvcnQgeyBhZGRUb0hpc3RvcnksIHJlbW92ZUZyb21IaXN0b3J5IH0gZnJvbSAnLi4vLi4vdXRpbHMvaGlzdG9yeSc7XG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5cbmV4cG9ydCBjb25zdCBHRVRfU0hFRVQgPSBncWxgXG5cdHF1ZXJ5IEdFVF9TSEVFVCgkc2hlZXRJZDogSUQhLCAkcGFzc3dvcmQ6IFN0cmluZykge1xuXHRcdHNoZWV0KF9pZDogJHNoZWV0SWQsIHBhc3N3b3JkOiAkcGFzc3dvcmQpIHtcblx0XHRcdHNoZWV0RGF0YVxuXHRcdFx0ZXhwaXJlQXRcblx0XHR9XG5cdH1cbmA7XG5cbmNvbnN0IFNoZWV0UGFnZSA9ICh7IG1hdGNoIH0pID0+IHtcblx0Y29uc3QgeyBzaGVldElkIH0gPSBtYXRjaC5wYXJhbXM7XG5cdGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gdXNlU3RhdGUoJycpO1xuXG5cdHJldHVybiAoXG5cdFx0PFF1ZXJ5IHF1ZXJ5PXtHRVRfU0hFRVR9IHZhcmlhYmxlcz17eyBzaGVldElkLCBwYXNzd29yZCB9fT5cblx0XHRcdHsoeyBsb2FkaW5nLCBlcnJvciwgZGF0YSB9KSA9PiB7XG5cdFx0XHRcdGlmIChsb2FkaW5nKSByZXR1cm4gPFN0eWxlZERpdj5Mb2FkaW5nLi4uPC9TdHlsZWREaXY+O1xuXG5cdFx0XHRcdC8vIGlmIHBhc3N3b3JkIG5vdCBwcm92aWRlZFxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0ZXJyb3IgJiZcblx0XHRcdFx0XHQoZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhlcnJvck1lc3NhZ2Uubm9QYXNzd29yZCkgfHxcblx0XHRcdFx0XHRcdGVycm9yLm1lc3NhZ2UuaW5jbHVkZXMoZXJyb3JNZXNzYWdlLndyb25nUGFzc3dvcmQpKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRjb25zdCB3cm9uZ1Bhc3N3b3JkID0gZXJyb3IubWVzc2FnZS5pbmNsdWRlcyhcblx0XHRcdFx0XHRcdGVycm9yTWVzc2FnZS53cm9uZ1Bhc3N3b3JkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHQvLyB0aGVuIHByb21wdCB1c2VyIGZvciBwYXNzd29yZCBiZWZvcmUgcHJvY2VlZGluZ1xuXHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHQ8UGFzc3dvcmRQcm9tcHRcblx0XHRcdFx0XHRcdFx0cGFzc3dvcmQ9e3Bhc3N3b3JkfVxuXHRcdFx0XHRcdFx0XHRzZXRQYXNzd29yZD17c2V0UGFzc3dvcmR9XG5cdFx0XHRcdFx0XHRcdHdyb25nUGFzc3dvcmQ9e3dyb25nUGFzc3dvcmR9XG5cdFx0XHRcdFx0XHQvPlxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZW1vdmVGcm9tSGlzdG9yeShzaGVldElkKTtcblx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0PEV4cGlyZWROb3RpY2U+XG5cdFx0XHRcdFx0XHRcdDxzZWN0aW9uPlxuXHRcdFx0XHRcdFx0XHRcdDxwIGNsYXNzTmFtZT1cImVycm9yTWVzc2FnZVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0U29ycnksIGxvb2tzIGxpa2UgdGhpcyBzaGVldCBtYXkgaGF2ZSBleHBpcmVkLlxuXHRcdFx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdFx0XHRcdE1heWJlIDxMaW5rIHRvPVwiL3VwbG9hZFwiPlVwbG9hZDwvTGluaz4gYSBuZXcgb25lLCBvciBjaGVja1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVjZW50bHkgPExpbmsgdG89XCIvdmlld1wiPnZpZXdlZDwvTGluaz4uXG5cdFx0XHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L3NlY3Rpb24+XG5cdFx0XHRcdFx0XHQ8L0V4cGlyZWROb3RpY2U+XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNvbnN0IHsgc2hlZXREYXRhLCBleHBpcmVBdCB9ID0gZGF0YS5zaGVldDtcblx0XHRcdFx0YWRkVG9IaXN0b3J5KHNoZWV0SWQpO1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdDxXcmFwcGVyRGl2PlxuXHRcdFx0XHRcdFx0PFJlc3RFeGFtcGxlIGhvc3Q9e3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59IGlkPXtzaGVldElkfSAvPlxuXHRcdFx0XHRcdFx0PEdRTEV4YW1wbGUgaG9zdD17d2luZG93LmxvY2F0aW9uLm9yaWdpbn0gaWQ9e3NoZWV0SWR9IC8+XG5cdFx0XHRcdFx0XHQ8U3R5bGVkRGl2PlxuXHRcdFx0XHRcdFx0XHQ8RXhwaXJlRGl2PlxuXHRcdFx0XHRcdFx0XHRcdFNoZWV0IEV4cGlyZXMgb246eycgJ31cblx0XHRcdFx0XHRcdFx0XHR7Zm9ybWF0KGV4cGlyZUF0LCAnTU1NIERELCBZWVlZICBAICBoOm1tIGFhICAoWiBbR01UXSknKX1cblx0XHRcdFx0XHRcdFx0PC9FeHBpcmVEaXY+XG5cdFx0XHRcdFx0XHRcdDxUYWJsZSBkYXRhPXtzaGVldERhdGF9IC8+XG5cdFx0XHRcdFx0XHQ8L1N0eWxlZERpdj5cblx0XHRcdFx0XHQ8L1dyYXBwZXJEaXY+XG5cdFx0XHRcdCk7XG5cdFx0XHR9fVxuXHRcdDwvUXVlcnk+XG5cdCk7XG59O1xuXG5jb25zdCBXcmFwcGVyRGl2ID0gc3R5bGVkKGRlZmF1bHRTdHlsZSlgXG5cdHBhZGRpbmctdG9wOiA2cmVtO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJhY2tncm91bmR9O1xuXHRtYXJnaW4tdG9wOiAwcmVtO1xuXHRwYWRkaW5nLWJvdHRvbTogMnJlbTtcblx0d2lkdGg6IDEwMCU7XG5gO1xuXG5jb25zdCBTdHlsZWREaXYgPSBzdHlsZWQoZGVmYXVsdFN0eWxlKWBcblx0YmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5iYWNrZ3JvdW5kfTtcblx0cGFkZGluZy1ib3R0b206IDJyZW07XG5cdG1hcmdpbi1ib3R0b206IDBweDtcblx0d2lkdGg6IDEwMCU7XG5cdGhlaWdodDogY2FsYygxMDB2aCAtIDE0MHB4KTtcbmA7XG5cbmNvbnN0IEV4cGlyZURpdiA9IHN0eWxlZC5kaXZgXG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0Y29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IubGlnaHRUZXh0fTtcblx0bWFyZ2luLXRvcDogMnJlbTtcbmA7XG5cbmNvbnN0IEV4cGlyZWROb3RpY2UgPSBzdHlsZWQoZGVmYXVsdFN0eWxlKWBcblx0YmFja2dyb3VuZC1jb2xvcjogJHtwcm9wcyA9PiBwcm9wcy50aGVtZS5jb2xvci5iYWNrZ3JvdW5kfTtcblx0aGVpZ2h0OiBjYWxjKDEwMHZoIC0gNTVweCk7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdHNlY3Rpb24ge1xuXHRcdG1hcmdpbi1ib3R0b206IDFyZW07XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cdFx0cGFkZGluZzogMi41cmVtIDRyZW07XG5cdFx0Ym9yZGVyLXJhZGl1czogOHB4O1xuXHRcdGJveC1zaGFkb3c6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuYm94U2hhZG93TGlnaHR9O1xuXHR9XG5cdHAge1xuXHRcdG1hcmdpbjogMXJlbTtcblx0fVxuXG5cdGEge1xuXHRcdGNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJsdWV9O1xuXHR9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBTaGVldFBhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/pages/SheetPage/SheetPage.js\n"
				);

				/***/
			},

		/***/ './frontend/pages/UploadPage/UploadPage.js':
			/*!*************************************************!*\
  !*** ./frontend/pages/UploadPage/UploadPage.js ***!
  \*************************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _templateObject = _taggedTemplateLiteral(['\\n\\tmutation UPLOAD_SHEET($sheetData: JSON!, $expireIn: Int!, $password: String) {\\n\\t\\tcreateSheet(\\n\\t\\t\\tsheetData: $sheetData\\n\\t\\t\\texpireIn: $expireIn\\n\\t\\t\\tpassword: $password\\n\\t\\t) {\\n\\t\\t\\t_id\\n\\t\\t}\\n\\t}\\n'], ['\\n\\tmutation UPLOAD_SHEET($sheetData: JSON!, $expireIn: Int!, $password: String) {\\n\\t\\tcreateSheet(\\n\\t\\t\\tsheetData: $sheetData\\n\\t\\t\\texpireIn: $expireIn\\n\\t\\t\\tpassword: $password\\n\\t\\t) {\\n\\t\\t\\t_id\\n\\t\\t}\\n\\t}\\n']);\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nvar _Filedrop = __webpack_require__(/*! ../../components/Filedrop/Filedrop */ \"./frontend/components/Filedrop/Filedrop.js\");\n\nvar _Filedrop2 = _interopRequireDefault(_Filedrop);\n\nvar _graphqlTag = __webpack_require__(/*! graphql-tag */ \"./node_modules/graphql-tag/src/index.js\");\n\nvar _graphqlTag2 = _interopRequireDefault(_graphqlTag);\n\nvar _reactApollo = __webpack_require__(/*! react-apollo */ \"./node_modules/react-apollo/react-apollo.browser.umd.js\");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\n\nvar _papaparse = __webpack_require__(/*! papaparse */ \"./node_modules/papaparse/papaparse.min.js\");\n\nvar _papaparse2 = _interopRequireDefault(_papaparse);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nfunction _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }\n\nvar UPLOAD_SHEET = (0, _graphqlTag2.default)(_templateObject);\n\n/**\n * @function\n * Page to upload file and set upload settings\n * @returns {JSX} <UploadPage />\n */\nvar UploadPage = function UploadPage() {\n\tvar _useState = (0, _react.useState)(72),\n\t    _useState2 = _slicedToArray(_useState, 2),\n\t    expireIn = _useState2[0],\n\t    setExpireIn = _useState2[1];\n\n\tvar _useState3 = (0, _react.useState)(true),\n\t    _useState4 = _slicedToArray(_useState3, 2),\n\t    header = _useState4[0],\n\t    setHeader = _useState4[1];\n\n\tvar _useState5 = (0, _react.useState)(true),\n\t    _useState6 = _slicedToArray(_useState5, 2),\n\t    disableSubmit = _useState6[0],\n\t    setDisableSubmit = _useState6[1];\n\n\tvar _useState7 = (0, _react.useState)(false),\n\t    _useState8 = _slicedToArray(_useState7, 2),\n\t    redirect = _useState8[0],\n\t    setRedirect = _useState8[1];\n\n\tvar _useState9 = (0, _react.useState)(),\n\t    _useState10 = _slicedToArray(_useState9, 2),\n\t    file = _useState10[0],\n\t    setFile = _useState10[1];\n\n\tvar _useState11 = (0, _react.useState)(''),\n\t    _useState12 = _slicedToArray(_useState11, 2),\n\t    password = _useState12[0],\n\t    setPassword = _useState12[1];\n\n\tvar _useState13 = (0, _react.useState)(false),\n\t    _useState14 = _slicedToArray(_useState13, 2),\n\t    wrongPassword = _useState14[0],\n\t    setWrongPassword = _useState14[1];\n\n\tvar _useState15 = (0, _react.useState)(''),\n\t    _useState16 = _slicedToArray(_useState15, 2),\n\t    uploadErrorMessage = _useState16[0],\n\t    setErrorMessage = _useState16[1];\n\n\tvar onCompleted = function onCompleted() {\n\t\tsetRedirect(true);\n\t};\n\n\tvar renderRedirect = function renderRedirect(data) {\n\t\tvar id = data && data.createSheet._id;\n\t\tif (redirect) {\n\t\t\treturn _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' + id });\n\t\t}\n\t};\n\n\tvar onDrop = function onDrop(file, rejectedFile) {\n\t\tif (file[0] && file[0].name && file[0].name.indexOf('.csv') + 4 === file[0].name.length) {\n\t\t\tsetFile(file);\n\t\t\tsetDisableSubmit(false);\n\t\t} else {\n\t\t\tconsole.error('file rejected!: \\n ' + rejectedFile[0].name + '\\n ' + rejectedFile[0].type);\n\t\t}\n\t};\n\n\tvar checkPassword = function checkPassword(pw) {\n\t\tvar passing = pw.length !== 0 && pw.length < 6 || pw.length > 70;\n\t\tsetPassword(pw);\n\t\tsetWrongPassword(passing);\n\t};\n\n\tvar showErrorMessage = function showErrorMessage(visible) {\n\t\tvar message = '⚠️ Woops! Something went wrong.';\n\n\t\tif (header) {\n\t\t\tmessage += ' You sure first row is a header?';\n\t\t}\n\n\t\tsetErrorMessage(message);\n\t};\n\n\treturn _react2.default.createElement(\n\t\tStyledDiv,\n\t\tnull,\n\t\t_react2.default.createElement(_Filedrop2.default, {\n\t\t\tfirstRowHeader: header,\n\t\t\texpireIn: expireIn,\n\t\t\tsetHeader: setHeader,\n\t\t\tpassword: password,\n\t\t\tsetPassword: checkPassword,\n\t\t\tsetExpireIn: setExpireIn,\n\t\t\tonDrop: onDrop,\n\t\t\twrongPassword: wrongPassword\n\t\t}),\n\t\t_react2.default.createElement(\n\t\t\tStyledForm,\n\t\t\t{ disableSubmit: disableSubmit },\n\t\t\t_react2.default.createElement(\n\t\t\t\t_reactApollo.Mutation,\n\t\t\t\t{ mutation: UPLOAD_SHEET, onCompleted: onCompleted },\n\t\t\t\tfunction (uploadSheet, _ref) {\n\t\t\t\t\tvar loading = _ref.loading,\n\t\t\t\t\t    error = _ref.error,\n\t\t\t\t\t    data = _ref.data;\n\n\t\t\t\t\tif (error) {\n\t\t\t\t\t\tshowErrorMessage();\n\t\t\t\t\t}\n\n\t\t\t\t\treturn _react2.default.createElement(\n\t\t\t\t\t\t'div',\n\t\t\t\t\t\tnull,\n\t\t\t\t\t\trenderRedirect(data),\n\t\t\t\t\t\t_react2.default.createElement('input', {\n\t\t\t\t\t\t\ttype: 'submit',\n\t\t\t\t\t\t\tonClick: function onClick(e) {\n\t\t\t\t\t\t\t\te.preventDefault();\n\t\t\t\t\t\t\t\t_papaparse2.default.parse(file[0], {\n\t\t\t\t\t\t\t\t\theader: header,\n\t\t\t\t\t\t\t\t\tdownload: true,\n\t\t\t\t\t\t\t\t\tskipEmptyLines: false,\n\t\t\t\t\t\t\t\t\tcomplete: function complete(_ref2) {\n\t\t\t\t\t\t\t\t\t\tvar data = _ref2.data;\n\t\t\t\t\t\t\t\t\t\treturn uploadSheet({\n\t\t\t\t\t\t\t\t\t\t\tvariables: {\n\t\t\t\t\t\t\t\t\t\t\t\tsheetData: data,\n\t\t\t\t\t\t\t\t\t\t\t\texpireIn: parseInt(expireIn),\n\t\t\t\t\t\t\t\t\t\t\t\tpassword: password\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\tvalue: 'Upload File',\n\t\t\t\t\t\t\tdisabled: disableSubmit\n\t\t\t\t\t\t})\n\t\t\t\t\t);\n\t\t\t\t}\n\t\t\t),\n\t\t\t_react2.default.createElement(\n\t\t\t\tUploadError,\n\t\t\t\t{ className: uploadErrorMessage ? 'true' : undefined },\n\t\t\t\tuploadErrorMessage\n\t\t\t)\n\t\t)\n\t);\n};\n\nvar StyledDiv = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'UploadPage__StyledDiv',\n\tcomponentId: 'ahg6u5-0'\n})(['background-color:', ';padding-top:7rem;height:calc(100vh - 100px);'], function (props) {\n\treturn props.theme.color.background;\n});\n\nvar StyledForm = _styledComponents2.default.form.withConfig({\n\tdisplayName: 'UploadPage__StyledForm',\n\tcomponentId: 'ahg6u5-1'\n})(['display:block;width:60%;margin:auto;text-align:center;margin-top:2rem;label{font-size:1.1rem;}select{font-family:', ';font-size:1rem;background-color:white;margin-left:0.5rem;margin-right:0.5rem;border:solid 1px ', ';}input[type=\\'submit\\']{position:relative;cursor:', ';color:', ';display:block;margin:auto;font-family:', ';font-weight:400;font-size:1.3rem;border:', ';border-radius:30px;padding:10px 30px;background:', ';box-shadow:', ';transition:all 0.5s;&:hover{background:', ';box-shadow:', ';}}'], function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.theme.color.border;\n}, function (props) {\n\treturn props.disableSubmit ? 'no-drop' : 'pointer';\n}, function (props) {\n\treturn props.disableSubmit ? props.theme.color.border : 'white';\n}, function (props) {\n\treturn props.theme.font.main;\n}, function (props) {\n\treturn props.disableSubmit ? '2px solid ' + props.theme.color.border : 'none';\n}, function (props) {\n\treturn props.disableSubmit ? 'transparent' : props.theme.gradient.greenBlue;\n}, function (props) {\n\treturn props.disableSubmit ? '' : props.theme.boxShadow;\n}, function (props) {\n\treturn props.disableSubmit ? 'transparent' : props.theme.gradient.greenBlue;\n}, function (props) {\n\treturn props.disableSubmit ? '' : props.theme.boxShadowDark;\n});\n\nvar UploadError = (0, _styledComponents2.default)(_defaultStyle.ErrorDialog).withConfig({\n\tdisplayName: 'UploadPage__UploadError',\n\tcomponentId: 'ahg6u5-2'\n})(['min-width:200px;width:fit-content;margin:auto;margin-top:2rem;']);\n\nvar _default = UploadPage;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(UPLOAD_SHEET, 'UPLOAD_SHEET', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js');\n\treactHotLoader.register(UploadPage, 'UploadPage', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js');\n\treactHotLoader.register(StyledDiv, 'StyledDiv', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js');\n\treactHotLoader.register(StyledForm, 'StyledForm', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js');\n\treactHotLoader.register(UploadError, 'UploadError', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/UploadPage/UploadPage.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9wYWdlcy9VcGxvYWRQYWdlL1VwbG9hZFBhZ2UuanM/ODM2YSJdLCJuYW1lcyI6WyJVUExPQURfU0hFRVQiLCJncWwiLCJVcGxvYWRQYWdlIiwiZXhwaXJlSW4iLCJzZXRFeHBpcmVJbiIsImhlYWRlciIsInNldEhlYWRlciIsImRpc2FibGVTdWJtaXQiLCJzZXREaXNhYmxlU3VibWl0IiwicmVkaXJlY3QiLCJzZXRSZWRpcmVjdCIsImZpbGUiLCJzZXRGaWxlIiwicGFzc3dvcmQiLCJzZXRQYXNzd29yZCIsIndyb25nUGFzc3dvcmQiLCJzZXRXcm9uZ1Bhc3N3b3JkIiwidXBsb2FkRXJyb3JNZXNzYWdlIiwic2V0RXJyb3JNZXNzYWdlIiwib25Db21wbGV0ZWQiLCJyZW5kZXJSZWRpcmVjdCIsImlkIiwiZGF0YSIsImNyZWF0ZVNoZWV0IiwiX2lkIiwib25Ecm9wIiwicmVqZWN0ZWRGaWxlIiwibmFtZSIsImluZGV4T2YiLCJsZW5ndGgiLCJjb25zb2xlIiwiZXJyb3IiLCJ0eXBlIiwiY2hlY2tQYXNzd29yZCIsInBhc3NpbmciLCJwdyIsInNob3dFcnJvck1lc3NhZ2UiLCJtZXNzYWdlIiwidXBsb2FkU2hlZXQiLCJsb2FkaW5nIiwiZSIsInByZXZlbnREZWZhdWx0IiwiUGFwYSIsInBhcnNlIiwiZG93bmxvYWQiLCJza2lwRW1wdHlMaW5lcyIsImNvbXBsZXRlIiwidmFyaWFibGVzIiwic2hlZXREYXRhIiwicGFyc2VJbnQiLCJ1bmRlZmluZWQiLCJTdHlsZWREaXYiLCJkZWZhdWx0U3R5bGUiLCJwcm9wcyIsInRoZW1lIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiU3R5bGVkRm9ybSIsInN0eWxlZCIsImZvcm0iLCJmb250IiwibWFpbiIsImJvcmRlciIsImdyYWRpZW50IiwiZ3JlZW5CbHVlIiwiYm94U2hhZG93IiwiYm94U2hhZG93RGFyayIsIlVwbG9hZEVycm9yIiwiRXJyb3JEaWFsb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxtQkFBZUMsb0JBQWYsa0JBQU47O0FBWUE7Ozs7O0FBS0EsSUFBTUMsYUFBYSxTQUFiQSxVQUFhLEdBQU07QUFBQSxpQkFDUSxxQkFBUyxFQUFULENBRFI7QUFBQTtBQUFBLEtBQ2pCQyxRQURpQjtBQUFBLEtBQ1BDLFdBRE87O0FBQUEsa0JBRUkscUJBQVMsSUFBVCxDQUZKO0FBQUE7QUFBQSxLQUVqQkMsTUFGaUI7QUFBQSxLQUVUQyxTQUZTOztBQUFBLGtCQUdrQixxQkFBUyxJQUFULENBSGxCO0FBQUE7QUFBQSxLQUdqQkMsYUFIaUI7QUFBQSxLQUdGQyxnQkFIRTs7QUFBQSxrQkFJUSxxQkFBUyxLQUFULENBSlI7QUFBQTtBQUFBLEtBSWpCQyxRQUppQjtBQUFBLEtBSVBDLFdBSk87O0FBQUEsa0JBS0Esc0JBTEE7QUFBQTtBQUFBLEtBS2pCQyxJQUxpQjtBQUFBLEtBS1hDLE9BTFc7O0FBQUEsbUJBTVEscUJBQVMsRUFBVCxDQU5SO0FBQUE7QUFBQSxLQU1qQkMsUUFOaUI7QUFBQSxLQU1QQyxXQU5POztBQUFBLG1CQU9rQixxQkFBUyxLQUFULENBUGxCO0FBQUE7QUFBQSxLQU9qQkMsYUFQaUI7QUFBQSxLQU9GQyxnQkFQRTs7QUFBQSxtQkFRc0IscUJBQVMsRUFBVCxDQVJ0QjtBQUFBO0FBQUEsS0FRakJDLGtCQVJpQjtBQUFBLEtBUUdDLGVBUkg7O0FBVXhCLEtBQU1DLGNBQWMsU0FBZEEsV0FBYyxHQUFNO0FBQ3pCVCxjQUFZLElBQVo7QUFDQSxFQUZEOztBQUlBLEtBQU1VLGlCQUFpQixTQUFqQkEsY0FBaUIsT0FBUTtBQUM5QixNQUFNQyxLQUFLQyxRQUFRQSxLQUFLQyxXQUFMLENBQWlCQyxHQUFwQztBQUNBLE1BQUlmLFFBQUosRUFBYztBQUNiLFVBQU8sOEJBQUMsd0JBQUQsSUFBVSxVQUFRWSxFQUFsQixHQUFQO0FBQ0E7QUFDRCxFQUxEOztBQU9BLEtBQU1JLFNBQVMsU0FBVEEsTUFBUyxDQUFDZCxJQUFELEVBQU9lLFlBQVAsRUFBd0I7QUFDdEMsTUFDQ2YsS0FBSyxDQUFMLEtBQ0FBLEtBQUssQ0FBTCxFQUFRZ0IsSUFEUixJQUVBaEIsS0FBSyxDQUFMLEVBQVFnQixJQUFSLENBQWFDLE9BQWIsQ0FBcUIsTUFBckIsSUFBK0IsQ0FBL0IsS0FBcUNqQixLQUFLLENBQUwsRUFBUWdCLElBQVIsQ0FBYUUsTUFIbkQsRUFJRTtBQUNEakIsV0FBUUQsSUFBUjtBQUNBSCxvQkFBaUIsS0FBakI7QUFDQSxHQVBELE1BT087QUFDTnNCLFdBQVFDLEtBQVIseUJBQ3VCTCxhQUFhLENBQWIsRUFBZ0JDLElBRHZDLFdBQ2lERCxhQUFhLENBQWIsRUFBZ0JNLElBRGpFO0FBR0E7QUFDRCxFQWJEOztBQWVBLEtBQU1DLGdCQUFnQixTQUFoQkEsYUFBZ0IsS0FBTTtBQUMzQixNQUFNQyxVQUFXQyxHQUFHTixNQUFILEtBQWMsQ0FBZCxJQUFtQk0sR0FBR04sTUFBSCxHQUFZLENBQWhDLElBQXNDTSxHQUFHTixNQUFILEdBQVksRUFBbEU7QUFDQWYsY0FBWXFCLEVBQVo7QUFDQW5CLG1CQUFpQmtCLE9BQWpCO0FBQ0EsRUFKRDs7QUFNQSxLQUFNRSxtQkFBbUIsU0FBbkJBLGdCQUFtQixVQUFXO0FBQ25DLE1BQUlDLFVBQVUsaUNBQWQ7O0FBRUEsTUFBSWhDLE1BQUosRUFBWTtBQUNYZ0MsY0FBVyxrQ0FBWDtBQUNBOztBQUVEbkIsa0JBQWdCbUIsT0FBaEI7QUFDQSxFQVJEOztBQVVBLFFBQ0M7QUFBQyxXQUFEO0FBQUE7QUFDQyxnQ0FBQyxrQkFBRDtBQUNDLG1CQUFnQmhDLE1BRGpCO0FBRUMsYUFBVUYsUUFGWDtBQUdDLGNBQVdHLFNBSFo7QUFJQyxhQUFVTyxRQUpYO0FBS0MsZ0JBQWFvQixhQUxkO0FBTUMsZ0JBQWE3QixXQU5kO0FBT0MsV0FBUXFCLE1BUFQ7QUFRQyxrQkFBZVY7QUFSaEIsSUFERDtBQVdDO0FBQUMsYUFBRDtBQUFBLEtBQVksZUFBZVIsYUFBM0I7QUFDQztBQUFDLHlCQUFEO0FBQUEsTUFBVSxVQUFVUCxZQUFwQixFQUFrQyxhQUFhbUIsV0FBL0M7QUFDRSxjQUFDbUIsV0FBRCxRQUEyQztBQUFBLFNBQTNCQyxPQUEyQixRQUEzQkEsT0FBMkI7QUFBQSxTQUFsQlIsS0FBa0IsUUFBbEJBLEtBQWtCO0FBQUEsU0FBWFQsSUFBVyxRQUFYQSxJQUFXOztBQUMzQyxTQUFJUyxLQUFKLEVBQVc7QUFDVks7QUFDQTs7QUFFRCxZQUNDO0FBQUE7QUFBQTtBQUNFaEIscUJBQWVFLElBQWYsQ0FERjtBQUVDO0FBQ0MsYUFBSyxRQUROO0FBRUMsZ0JBQVMsb0JBQUs7QUFDYmtCLFVBQUVDLGNBQUY7QUFDQUMsNEJBQUtDLEtBQUwsQ0FBV2hDLEtBQUssQ0FBTCxDQUFYLEVBQW9CO0FBQ25CTixpQkFBUUEsTUFEVztBQUVuQnVDLG1CQUFVLElBRlM7QUFHbkJDLHlCQUFnQixLQUhHO0FBSW5CQyxtQkFBVTtBQUFBLGNBQUd4QixJQUFILFNBQUdBLElBQUg7QUFBQSxpQkFDVGdCLFlBQVk7QUFDWFMsc0JBQVc7QUFDVkMsdUJBQVcxQixJQUREO0FBRVZuQixzQkFBVThDLFNBQVM5QyxRQUFULENBRkE7QUFHVlUsc0JBQVVBO0FBSEE7QUFEQSxXQUFaLENBRFM7QUFBQTtBQUpTLFNBQXBCO0FBYUEsUUFqQkY7QUFrQkMsY0FBTSxhQWxCUDtBQW1CQyxpQkFBVU47QUFuQlg7QUFGRCxNQUREO0FBMEJBO0FBaENGLElBREQ7QUFtQ0M7QUFBQyxlQUFEO0FBQUEsTUFBYSxXQUFXVSxxQkFBcUIsTUFBckIsR0FBOEJpQyxTQUF0RDtBQUNFakM7QUFERjtBQW5DRDtBQVhELEVBREQ7QUFxREEsQ0F6R0Q7O0FBMkdBLElBQU1rQyxZQUFZLGdDQUFPQyxzQkFBUCxDQUFaO0FBQUE7QUFBQTtBQUFBLDJFQUNlO0FBQUEsUUFBU0MsTUFBTUMsS0FBTixDQUFZQyxLQUFaLENBQWtCQyxVQUEzQjtBQUFBLENBRGYsQ0FBTjs7QUFNQSxJQUFNQyxhQUFhQywyQkFBT0MsSUFBcEI7QUFBQTtBQUFBO0FBQUEsOGZBV1c7QUFBQSxRQUFTTixNQUFNQyxLQUFOLENBQVlNLElBQVosQ0FBaUJDLElBQTFCO0FBQUEsQ0FYWCxFQWdCZ0I7QUFBQSxRQUFTUixNQUFNQyxLQUFOLENBQVlDLEtBQVosQ0FBa0JPLE1BQTNCO0FBQUEsQ0FoQmhCLEVBcUJNO0FBQUEsUUFBVVQsTUFBTTlDLGFBQU4sR0FBc0IsU0FBdEIsR0FBa0MsU0FBNUM7QUFBQSxDQXJCTixFQXNCSztBQUFBLFFBQ1I4QyxNQUFNOUMsYUFBTixHQUFzQjhDLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQk8sTUFBeEMsR0FBaUQsT0FEekM7QUFBQSxDQXRCTCxFQTBCVztBQUFBLFFBQVNULE1BQU1DLEtBQU4sQ0FBWU0sSUFBWixDQUFpQkMsSUFBMUI7QUFBQSxDQTFCWCxFQTZCTTtBQUFBLFFBQ1RSLE1BQU05QyxhQUFOLGtCQUFtQzhDLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQk8sTUFBckQsR0FBZ0UsTUFEdkQ7QUFBQSxDQTdCTixFQWlDVTtBQUFBLFFBQ2JULE1BQU05QyxhQUFOLEdBQXNCLGFBQXRCLEdBQXNDOEMsTUFBTUMsS0FBTixDQUFZUyxRQUFaLENBQXFCQyxTQUQ5QztBQUFBLENBakNWLEVBbUNVO0FBQUEsUUFBVVgsTUFBTTlDLGFBQU4sR0FBc0IsRUFBdEIsR0FBMkI4QyxNQUFNQyxLQUFOLENBQVlXLFNBQWpEO0FBQUEsQ0FuQ1YsRUF1Q1c7QUFBQSxRQUNiWixNQUFNOUMsYUFBTixHQUFzQixhQUF0QixHQUFzQzhDLE1BQU1DLEtBQU4sQ0FBWVMsUUFBWixDQUFxQkMsU0FEOUM7QUFBQSxDQXZDWCxFQXlDVztBQUFBLFFBQ2JYLE1BQU05QyxhQUFOLEdBQXNCLEVBQXRCLEdBQTJCOEMsTUFBTUMsS0FBTixDQUFZWSxhQUQxQjtBQUFBLENBekNYLENBQU47O0FBK0NBLElBQU1DLGNBQWMsZ0NBQU9DLHlCQUFQLENBQWQ7QUFBQTtBQUFBO0FBQUEsc0VBQU47O2VBT2VsRSxVOzs7Ozs7Ozs7Ozt5QkF4TFRGLFk7eUJBaUJBRSxVO3lCQTJHQWlELFM7eUJBTUFNLFU7eUJBK0NBVSxXIiwiZmlsZSI6Ii4vZnJvbnRlbmQvcGFnZXMvVXBsb2FkUGFnZS9VcGxvYWRQYWdlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgZGVmYXVsdFN0eWxlLCB7IEVycm9yRGlhbG9nIH0gZnJvbSAnLi4vLi4vZGVmYXVsdFN0eWxlJztcbmltcG9ydCBGaWxlZHJvcCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0ZpbGVkcm9wL0ZpbGVkcm9wJztcbmltcG9ydCBncWwgZnJvbSAnZ3JhcGhxbC10YWcnO1xuaW1wb3J0IHsgTXV0YXRpb24gfSBmcm9tICdyZWFjdC1hcG9sbG8nO1xuaW1wb3J0IHsgUmVkaXJlY3QsIExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcbmltcG9ydCBQYXBhIGZyb20gJ3BhcGFwYXJzZSc7XG5cbmNvbnN0IFVQTE9BRF9TSEVFVCA9IGdxbGBcblx0bXV0YXRpb24gVVBMT0FEX1NIRUVUKCRzaGVldERhdGE6IEpTT04hLCAkZXhwaXJlSW46IEludCEsICRwYXNzd29yZDogU3RyaW5nKSB7XG5cdFx0Y3JlYXRlU2hlZXQoXG5cdFx0XHRzaGVldERhdGE6ICRzaGVldERhdGFcblx0XHRcdGV4cGlyZUluOiAkZXhwaXJlSW5cblx0XHRcdHBhc3N3b3JkOiAkcGFzc3dvcmRcblx0XHQpIHtcblx0XHRcdF9pZFxuXHRcdH1cblx0fVxuYDtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIFBhZ2UgdG8gdXBsb2FkIGZpbGUgYW5kIHNldCB1cGxvYWQgc2V0dGluZ3NcbiAqIEByZXR1cm5zIHtKU1h9IDxVcGxvYWRQYWdlIC8+XG4gKi9cbmNvbnN0IFVwbG9hZFBhZ2UgPSAoKSA9PiB7XG5cdGNvbnN0IFtleHBpcmVJbiwgc2V0RXhwaXJlSW5dID0gdXNlU3RhdGUoNzIpO1xuXHRjb25zdCBbaGVhZGVyLCBzZXRIZWFkZXJdID0gdXNlU3RhdGUodHJ1ZSk7XG5cdGNvbnN0IFtkaXNhYmxlU3VibWl0LCBzZXREaXNhYmxlU3VibWl0XSA9IHVzZVN0YXRlKHRydWUpO1xuXHRjb25zdCBbcmVkaXJlY3QsIHNldFJlZGlyZWN0XSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0Y29uc3QgW2ZpbGUsIHNldEZpbGVdID0gdXNlU3RhdGUoKTtcblx0Y29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XG5cdGNvbnN0IFt3cm9uZ1Bhc3N3b3JkLCBzZXRXcm9uZ1Bhc3N3b3JkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0Y29uc3QgW3VwbG9hZEVycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKTtcblxuXHRjb25zdCBvbkNvbXBsZXRlZCA9ICgpID0+IHtcblx0XHRzZXRSZWRpcmVjdCh0cnVlKTtcblx0fTtcblxuXHRjb25zdCByZW5kZXJSZWRpcmVjdCA9IGRhdGEgPT4ge1xuXHRcdGNvbnN0IGlkID0gZGF0YSAmJiBkYXRhLmNyZWF0ZVNoZWV0Ll9pZDtcblx0XHRpZiAocmVkaXJlY3QpIHtcblx0XHRcdHJldHVybiA8UmVkaXJlY3QgdG89e2AvJHtpZH1gfSAvPjtcblx0XHR9XG5cdH07XG5cblx0Y29uc3Qgb25Ecm9wID0gKGZpbGUsIHJlamVjdGVkRmlsZSkgPT4ge1xuXHRcdGlmIChcblx0XHRcdGZpbGVbMF0gJiZcblx0XHRcdGZpbGVbMF0ubmFtZSAmJlxuXHRcdFx0ZmlsZVswXS5uYW1lLmluZGV4T2YoJy5jc3YnKSArIDQgPT09IGZpbGVbMF0ubmFtZS5sZW5ndGhcblx0XHQpIHtcblx0XHRcdHNldEZpbGUoZmlsZSk7XG5cdFx0XHRzZXREaXNhYmxlU3VibWl0KGZhbHNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0YGZpbGUgcmVqZWN0ZWQhOiBcXG4gJHtyZWplY3RlZEZpbGVbMF0ubmFtZX1cXG4gJHtyZWplY3RlZEZpbGVbMF0udHlwZX1gXG5cdFx0XHQpO1xuXHRcdH1cblx0fTtcblxuXHRjb25zdCBjaGVja1Bhc3N3b3JkID0gcHcgPT4ge1xuXHRcdGNvbnN0IHBhc3NpbmcgPSAocHcubGVuZ3RoICE9PSAwICYmIHB3Lmxlbmd0aCA8IDYpIHx8IHB3Lmxlbmd0aCA+IDcwO1xuXHRcdHNldFBhc3N3b3JkKHB3KTtcblx0XHRzZXRXcm9uZ1Bhc3N3b3JkKHBhc3NpbmcpO1xuXHR9O1xuXG5cdGNvbnN0IHNob3dFcnJvck1lc3NhZ2UgPSB2aXNpYmxlID0+IHtcblx0XHRsZXQgbWVzc2FnZSA9ICfimqDvuI8gV29vcHMhIFNvbWV0aGluZyB3ZW50IHdyb25nLic7XG5cblx0XHRpZiAoaGVhZGVyKSB7XG5cdFx0XHRtZXNzYWdlICs9ICcgWW91IHN1cmUgZmlyc3Qgcm93IGlzIGEgaGVhZGVyPyc7XG5cdFx0fVxuXG5cdFx0c2V0RXJyb3JNZXNzYWdlKG1lc3NhZ2UpO1xuXHR9O1xuXG5cdHJldHVybiAoXG5cdFx0PFN0eWxlZERpdj5cblx0XHRcdDxGaWxlZHJvcFxuXHRcdFx0XHRmaXJzdFJvd0hlYWRlcj17aGVhZGVyfVxuXHRcdFx0XHRleHBpcmVJbj17ZXhwaXJlSW59XG5cdFx0XHRcdHNldEhlYWRlcj17c2V0SGVhZGVyfVxuXHRcdFx0XHRwYXNzd29yZD17cGFzc3dvcmR9XG5cdFx0XHRcdHNldFBhc3N3b3JkPXtjaGVja1Bhc3N3b3JkfVxuXHRcdFx0XHRzZXRFeHBpcmVJbj17c2V0RXhwaXJlSW59XG5cdFx0XHRcdG9uRHJvcD17b25Ecm9wfVxuXHRcdFx0XHR3cm9uZ1Bhc3N3b3JkPXt3cm9uZ1Bhc3N3b3JkfVxuXHRcdFx0Lz5cblx0XHRcdDxTdHlsZWRGb3JtIGRpc2FibGVTdWJtaXQ9e2Rpc2FibGVTdWJtaXR9PlxuXHRcdFx0XHQ8TXV0YXRpb24gbXV0YXRpb249e1VQTE9BRF9TSEVFVH0gb25Db21wbGV0ZWQ9e29uQ29tcGxldGVkfT5cblx0XHRcdFx0XHR7KHVwbG9hZFNoZWV0LCB7IGxvYWRpbmcsIGVycm9yLCBkYXRhIH0pID0+IHtcblx0XHRcdFx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRcdFx0XHRzaG93RXJyb3JNZXNzYWdlKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdFx0e3JlbmRlclJlZGlyZWN0KGRhdGEpfVxuXHRcdFx0XHRcdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdFx0XHRcdFx0dHlwZT1cInN1Ym1pdFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRvbkNsaWNrPXtlID0+IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRQYXBhLnBhcnNlKGZpbGVbMF0sIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRoZWFkZXI6IGhlYWRlcixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkb3dubG9hZDogdHJ1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRza2lwRW1wdHlMaW5lczogZmFsc2UsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29tcGxldGU6ICh7IGRhdGEgfSkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHVwbG9hZFNoZWV0KHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmFyaWFibGVzOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2hlZXREYXRhOiBkYXRhLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGV4cGlyZUluOiBwYXJzZUludChleHBpcmVJbiksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cGFzc3dvcmQ6IHBhc3N3b3JkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fX1cblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlPVwiVXBsb2FkIEZpbGVcIlxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzYWJsZWQ9e2Rpc2FibGVTdWJtaXR9XG5cdFx0XHRcdFx0XHRcdFx0Lz5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH19XG5cdFx0XHRcdDwvTXV0YXRpb24+XG5cdFx0XHRcdDxVcGxvYWRFcnJvciBjbGFzc05hbWU9e3VwbG9hZEVycm9yTWVzc2FnZSA/ICd0cnVlJyA6IHVuZGVmaW5lZH0+XG5cdFx0XHRcdFx0e3VwbG9hZEVycm9yTWVzc2FnZX1cblx0XHRcdFx0PC9VcGxvYWRFcnJvcj5cblx0XHRcdDwvU3R5bGVkRm9ybT5cblx0XHQ8L1N0eWxlZERpdj5cblx0KTtcbn07XG5cbmNvbnN0IFN0eWxlZERpdiA9IHN0eWxlZChkZWZhdWx0U3R5bGUpYFxuXHRiYWNrZ3JvdW5kLWNvbG9yOiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJhY2tncm91bmR9O1xuXHRwYWRkaW5nLXRvcDogN3JlbTtcblx0aGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTAwcHgpO1xuYDtcblxuY29uc3QgU3R5bGVkRm9ybSA9IHN0eWxlZC5mb3JtYFxuXHRkaXNwbGF5OiBibG9jaztcblx0d2lkdGg6IDYwJTtcblx0bWFyZ2luOiBhdXRvO1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdG1hcmdpbi10b3A6IDJyZW07XG5cblx0bGFiZWwge1xuXHRcdGZvbnQtc2l6ZTogMS4xcmVtO1xuXHR9XG5cdHNlbGVjdCB7XG5cdFx0Zm9udC1mYW1pbHk6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuZm9udC5tYWlufTtcblx0XHRmb250LXNpemU6IDFyZW07XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG5cdFx0bWFyZ2luLWxlZnQ6IDAuNXJlbTtcblx0XHRtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcblx0XHRib3JkZXI6IHNvbGlkIDFweCAke3Byb3BzID0+IHByb3BzLnRoZW1lLmNvbG9yLmJvcmRlcn07XG5cdH1cblxuXHRpbnB1dFt0eXBlPSdzdWJtaXQnXSB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdGN1cnNvcjogJHtwcm9wcyA9PiAocHJvcHMuZGlzYWJsZVN1Ym1pdCA/ICduby1kcm9wJyA6ICdwb2ludGVyJyl9O1xuXHRcdGNvbG9yOiAke3Byb3BzID0+XG5cdFx0XHRwcm9wcy5kaXNhYmxlU3VibWl0ID8gcHJvcHMudGhlbWUuY29sb3IuYm9yZGVyIDogJ3doaXRlJ307XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0bWFyZ2luOiBhdXRvO1xuXHRcdGZvbnQtZmFtaWx5OiAke3Byb3BzID0+IHByb3BzLnRoZW1lLmZvbnQubWFpbn07XG5cdFx0Zm9udC13ZWlnaHQ6IDQwMDtcblx0XHRmb250LXNpemU6IDEuM3JlbTtcblx0XHRib3JkZXI6ICR7cHJvcHMgPT5cblx0XHRcdHByb3BzLmRpc2FibGVTdWJtaXQgPyBgMnB4IHNvbGlkICR7cHJvcHMudGhlbWUuY29sb3IuYm9yZGVyfWAgOiAnbm9uZSd9O1xuXHRcdGJvcmRlci1yYWRpdXM6IDMwcHg7XG5cdFx0cGFkZGluZzogMTBweCAzMHB4O1xuXHRcdGJhY2tncm91bmQ6ICR7cHJvcHMgPT5cblx0XHRcdHByb3BzLmRpc2FibGVTdWJtaXQgPyAndHJhbnNwYXJlbnQnIDogcHJvcHMudGhlbWUuZ3JhZGllbnQuZ3JlZW5CbHVlfTtcblx0XHRib3gtc2hhZG93OiAke3Byb3BzID0+IChwcm9wcy5kaXNhYmxlU3VibWl0ID8gJycgOiBwcm9wcy50aGVtZS5ib3hTaGFkb3cpfTtcblx0XHR0cmFuc2l0aW9uOiBhbGwgMC41cztcblxuXHRcdCY6aG92ZXIge1xuXHRcdFx0YmFja2dyb3VuZDogJHtwcm9wcyA9PlxuXHRcdFx0XHRwcm9wcy5kaXNhYmxlU3VibWl0ID8gJ3RyYW5zcGFyZW50JyA6IHByb3BzLnRoZW1lLmdyYWRpZW50LmdyZWVuQmx1ZX07XG5cdFx0XHRib3gtc2hhZG93OiAke3Byb3BzID0+XG5cdFx0XHRcdHByb3BzLmRpc2FibGVTdWJtaXQgPyAnJyA6IHByb3BzLnRoZW1lLmJveFNoYWRvd0Rhcmt9O1xuXHRcdH1cblx0fVxuYDtcblxuY29uc3QgVXBsb2FkRXJyb3IgPSBzdHlsZWQoRXJyb3JEaWFsb2cpYFxuXHRtaW4td2lkdGg6IDIwMHB4O1xuXHR3aWR0aDogZml0LWNvbnRlbnQ7XG5cdG1hcmdpbjogYXV0bztcblx0bWFyZ2luLXRvcDogMnJlbTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFVwbG9hZFBhZ2U7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./frontend/pages/UploadPage/UploadPage.js\n"
				);

				/***/
			},

		/***/ './frontend/pages/ViewPage/ViewPage.js':
			/*!*********************************************!*\
  !*** ./frontend/pages/ViewPage/ViewPage.js ***!
  \*********************************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\nvar _react = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ \"./node_modules/styled-components/dist/styled-components.browser.esm.js\");\n\nvar _styledComponents2 = _interopRequireDefault(_styledComponents);\n\nvar _defaultStyle = __webpack_require__(/*! ../../defaultStyle */ \"./frontend/defaultStyle.js\");\n\nvar _defaultStyle2 = _interopRequireDefault(_defaultStyle);\n\nvar _RecentlyViewed = __webpack_require__(/*! ../../components/RecentlyViewed/RecentlyViewed */ \"./frontend/components/RecentlyViewed/RecentlyViewed.js\");\n\nvar _RecentlyViewed2 = _interopRequireDefault(_RecentlyViewed);\n\nvar _SearchSheet = __webpack_require__(/*! ../../components/SearchSheet/SearchSheet */ \"./frontend/components/SearchSheet/SearchSheet.js\");\n\nvar _SearchSheet2 = _interopRequireDefault(_SearchSheet);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nvar ViewPage = function ViewPage() {\n\treturn _react2.default.createElement(\n\t\tStyledDiv,\n\t\tnull,\n\t\t_react2.default.createElement(_SearchSheet2.default, null),\n\t\t_react2.default.createElement(_RecentlyViewed2.default, null)\n\t);\n};\n\nvar StyledDiv = (0, _styledComponents2.default)(_defaultStyle2.default).withConfig({\n\tdisplayName: 'ViewPage__StyledDiv',\n\tcomponentId: 'wujrxm-0'\n})(['padding-top:6rem;background-color:', ';height:calc(100vh - 80px);display:flex;flex-direction:column;justify-content:center;align-items:center;'], function (props) {\n\treturn props.theme.color.background;\n});\n\nvar _default = ViewPage;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(ViewPage, 'ViewPage', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/ViewPage/ViewPage.js');\n\treactHotLoader.register(StyledDiv, 'StyledDiv', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/ViewPage/ViewPage.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/pages/ViewPage/ViewPage.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9wYWdlcy9WaWV3UGFnZS9WaWV3UGFnZS5qcz8wYzNjIl0sIm5hbWVzIjpbIlZpZXdQYWdlIiwiU3R5bGVkRGl2IiwiZGVmYXVsdFN0eWxlIiwicHJvcHMiLCJ0aGVtZSIsImNvbG9yIiwiYmFja2dyb3VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxXQUFXLFNBQVhBLFFBQVc7QUFBQSxRQUNoQjtBQUFDLFdBQUQ7QUFBQTtBQUNDLGdDQUFDLHFCQUFELE9BREQ7QUFFQyxnQ0FBQyx3QkFBRDtBQUZELEVBRGdCO0FBQUEsQ0FBakI7O0FBT0EsSUFBTUMsWUFBWSxnQ0FBT0Msc0JBQVAsQ0FBWjtBQUFBO0FBQUE7QUFBQSx1SkFFZTtBQUFBLFFBQVNDLE1BQU1DLEtBQU4sQ0FBWUMsS0FBWixDQUFrQkMsVUFBM0I7QUFBQSxDQUZmLENBQU47O2VBVWVOLFE7Ozs7Ozs7Ozs7O3lCQWpCVEEsUTt5QkFPQUMsUyIsImZpbGUiOiIuL2Zyb250ZW5kL3BhZ2VzL1ZpZXdQYWdlL1ZpZXdQYWdlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IGRlZmF1bHRTdHlsZSBmcm9tICcuLi8uLi9kZWZhdWx0U3R5bGUnO1xuaW1wb3J0IFJlY2VudGx5Vmlld2VkIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvUmVjZW50bHlWaWV3ZWQvUmVjZW50bHlWaWV3ZWQnO1xuaW1wb3J0IFNlYXJjaFNoZWV0IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU2VhcmNoU2hlZXQvU2VhcmNoU2hlZXQnO1xuXG5jb25zdCBWaWV3UGFnZSA9ICgpID0+IChcblx0PFN0eWxlZERpdj5cblx0XHQ8U2VhcmNoU2hlZXQgLz5cblx0XHQ8UmVjZW50bHlWaWV3ZWQgLz5cblx0PC9TdHlsZWREaXY+XG4pO1xuXG5jb25zdCBTdHlsZWREaXYgPSBzdHlsZWQoZGVmYXVsdFN0eWxlKWBcblx0cGFkZGluZy10b3A6IDZyZW07XG5cdGJhY2tncm91bmQtY29sb3I6ICR7cHJvcHMgPT4gcHJvcHMudGhlbWUuY29sb3IuYmFja2dyb3VuZH07XG5cdGhlaWdodDogY2FsYygxMDB2aCAtIDgwcHgpO1xuXHRkaXNwbGF5OiBmbGV4O1xuXHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IFZpZXdQYWdlO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/pages/ViewPage/ViewPage.js\n"
				);

				/***/
			},

		/***/ './frontend/root.js':
			/*!**************************!*\
  !*** ./frontend/root.js ***!
  \**************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					'/* WEBPACK VAR INJECTION */(function(module) {\n\nvar _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _styledComponents = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");\n\nvar _apolloBoost = __webpack_require__(/*! apollo-boost */ "./node_modules/apollo-boost/lib/index.js");\n\nvar _apolloBoost2 = _interopRequireDefault(_apolloBoost);\n\nvar _reactApollo = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.browser.umd.js");\n\nvar _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");\n\nvar _theme = __webpack_require__(/*! ./theme */ "./frontend/theme.js");\n\nvar _theme2 = _interopRequireDefault(_theme);\n\nvar _App = __webpack_require__(/*! ./pages/App.js */ "./frontend/pages/App.js");\n\nvar _App2 = _interopRequireDefault(_App);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nvar client = new _apolloBoost2.default({\n\turi: \'http://localhost:5000/graphql\' //TODO\n});\n\nvar Root = function Root() {\n\treturn _react2.default.createElement(\n\t\t_reactApollo.ApolloProvider,\n\t\t{ client: client },\n\t\t_react2.default.createElement(\n\t\t\t_reactRouterDom.BrowserRouter,\n\t\t\tnull,\n\t\t\t_react2.default.createElement(\n\t\t\t\t_styledComponents.ThemeProvider,\n\t\t\t\t{ theme: _theme2.default },\n\t\t\t\t_react2.default.createElement(_App2.default, null)\n\t\t\t)\n\t\t)\n\t);\n};\n\n_reactDom2.default.render(_react2.default.createElement(Root, null), document.getElementById(\'app\'));\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(client, \'client\', \'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/root.js\');\n\treactHotLoader.register(Root, \'Root\', \'/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/root.js\');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== \'undefined\' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC9yb290LmpzPzZlYWMiXSwibmFtZXMiOlsiY2xpZW50IiwiQXBvbGxvQ2xpZW50IiwidXJpIiwiUm9vdCIsInRoZW1lIiwiUmVhY3RET00iLCJyZW5kZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsU0FBUyxJQUFJQyxxQkFBSixDQUFpQjtBQUMvQkMsTUFBSywrQkFEMEIsQ0FDTztBQURQLENBQWpCLENBQWY7O0FBSUEsSUFBTUMsT0FBTyxTQUFQQSxJQUFPO0FBQUEsUUFDWjtBQUFDLDZCQUFEO0FBQUEsSUFBZ0IsUUFBUUgsTUFBeEI7QUFDQztBQUFDLGdDQUFEO0FBQUE7QUFDQztBQUFDLG1DQUFEO0FBQUEsTUFBZSxPQUFPSSxlQUF0QjtBQUNDLGtDQUFDLGFBQUQ7QUFERDtBQUREO0FBREQsRUFEWTtBQUFBLENBQWI7O0FBVUFDLG1CQUFTQyxNQUFULENBQWdCLDhCQUFDLElBQUQsT0FBaEIsRUFBMEJDLFNBQVNDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBMUI7Ozs7Ozs7Ozs7eUJBZE1SLE07eUJBSUFHLEkiLCJmaWxlIjoiLi9mcm9udGVuZC9yb290LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBBcG9sbG9DbGllbnQgZnJvbSAnYXBvbGxvLWJvb3N0JztcbmltcG9ydCB7IEFwb2xsb1Byb3ZpZGVyIH0gZnJvbSAncmVhY3QtYXBvbGxvJztcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIgYXMgUm91dGVyIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XG5pbXBvcnQgdGhlbWUgZnJvbSAnLi90aGVtZSc7XG5pbXBvcnQgQXBwIGZyb20gJy4vcGFnZXMvQXBwLmpzJztcblxuY29uc3QgY2xpZW50ID0gbmV3IEFwb2xsb0NsaWVudCh7XG5cdHVyaTogJ2h0dHA6Ly9sb2NhbGhvc3Q6NTAwMC9ncmFwaHFsJywgLy9UT0RPXG59KTtcblxuY29uc3QgUm9vdCA9ICgpID0+IChcblx0PEFwb2xsb1Byb3ZpZGVyIGNsaWVudD17Y2xpZW50fT5cblx0XHQ8Um91dGVyPlxuXHRcdFx0PFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cblx0XHRcdFx0PEFwcCAvPlxuXHRcdFx0PC9UaGVtZVByb3ZpZGVyPlxuXHRcdDwvUm91dGVyPlxuXHQ8L0Fwb2xsb1Byb3ZpZGVyPlxuKTtcblxuUmVhY3RET00ucmVuZGVyKDxSb290IC8+LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/root.js\n'
				);

				/***/
			},

		/***/ './frontend/theme.js':
			/*!***************************!*\
  !*** ./frontend/theme.js ***!
  \***************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\n/**\n * default themes for use with styled-components\n * passed in with theme provider\n */\nvar theme = {\n\tboxShadowLight: '0px 5px 40px -5px rgba(0,0,0,0.15)',\n\tboxShadow: '0px 5px 40px -5px rgba(0,0,0,0.3)',\n\tboxShadowDark: '0px 5px 40px -2px rgba(0,0,0,0.5)',\n\tcolor: {\n\t\tbackground: '#fafafa',\n\t\tbackgroundDark: '#EAEAEA',\n\t\tbackgroundDarkest: '#BCBCBC',\n\t\tborder: '#d9d9d9',\n\t\ttext: '#404040',\n\t\tlightText: '#848484',\n\t\tinput: '#F1F3F4',\n\t\tred: '#ED5050',\n\t\tlightRed: '#FF8D8D',\n\t\tgreen: '#D8E13F',\n\t\tvividGreen: '#E3FC52',\n\t\tblue: '#46C8F5',\n\t\tlightBlue: '#97E4FF',\n\t\tdarkBlue: '#2E8AA8',\n\t\taqua: '#68F6BA',\n\t\torange: '#ffbf80'\n\t},\n\tgradient: {\n\t\tlight: 'linear-gradient(to bottom, #ffffff 0%, #f6f6f6 47%, #ededed 100%)',\n\t\tred: 'linear-gradient(to bottom, #f07878 0%, #ED5050 100%)',\n\t\tlightRed: 'linear-gradient(to bottom, #f39191 0%, #ef6262 100%)',\n\t\tgreen: 'linear-gradient(to bottom, #D8E13F 0%, #BFC644 100%)',\n\t\tgreenBlue: ' linear-gradient(160deg, #57DACB 0%, #55A2ED 100%)'\n\t},\n\tfont: {\n\t\theader: '\\'Poiret One\\', cursive',\n\t\tmain: '\\'Quicksand\\', sans-serif'\n\t}\n};\n\nvar _default = theme;\nexports.default = _default;\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(theme, 'theme', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/theme.js');\n\treactHotLoader.register(_default, 'default', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/theme.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC90aGVtZS5qcz8wNWEyIl0sIm5hbWVzIjpbInRoZW1lIiwiYm94U2hhZG93TGlnaHQiLCJib3hTaGFkb3ciLCJib3hTaGFkb3dEYXJrIiwiY29sb3IiLCJiYWNrZ3JvdW5kIiwiYmFja2dyb3VuZERhcmsiLCJiYWNrZ3JvdW5kRGFya2VzdCIsImJvcmRlciIsInRleHQiLCJsaWdodFRleHQiLCJpbnB1dCIsInJlZCIsImxpZ2h0UmVkIiwiZ3JlZW4iLCJ2aXZpZEdyZWVuIiwiYmx1ZSIsImxpZ2h0Qmx1ZSIsImRhcmtCbHVlIiwiYXF1YSIsIm9yYW5nZSIsImdyYWRpZW50IiwibGlnaHQiLCJncmVlbkJsdWUiLCJmb250IiwiaGVhZGVyIiwibWFpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUlBLElBQU1BLFFBQVE7QUFDYkMscURBRGE7QUFFYkMsK0NBRmE7QUFHYkMsbURBSGE7QUFJYkMsUUFBTztBQUNOQyxjQUFZLFNBRE47QUFFTkMsa0JBQWdCLFNBRlY7QUFHTkMscUJBQW1CLFNBSGI7QUFJTkMsVUFBUSxTQUpGO0FBS05DLFFBQU0sU0FMQTtBQU1OQyxhQUFXLFNBTkw7QUFPTkMsU0FBTyxTQVBEO0FBUU5DLE9BQUssU0FSQztBQVNOQyxZQUFVLFNBVEo7QUFVTkMsU0FBTyxTQVZEO0FBV05DLGNBQVksU0FYTjtBQVlOQyxRQUFNLFNBWkE7QUFhTkMsYUFBVyxTQWJMO0FBY05DLFlBQVUsU0FkSjtBQWVOQyxRQUFNLFNBZkE7QUFnQk5DLFVBQVE7QUFoQkYsRUFKTTtBQXNCYkMsV0FBVTtBQUNUQyw0RUFEUztBQUVUVixPQUFLLHNEQUZJO0FBR1RDLFlBQVUsc0RBSEQ7QUFJVEMsU0FBTyxzREFKRTtBQUtUUyxhQUFXO0FBTEYsRUF0Qkc7QUE2QmJDLE9BQU07QUFDTEMsbUNBREs7QUFFTEM7QUFGSztBQTdCTyxDQUFkOztlQW1DZTFCLEs7Ozs7Ozs7Ozs7O3lCQW5DVEEsSyIsImZpbGUiOiIuL2Zyb250ZW5kL3RoZW1lLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBkZWZhdWx0IHRoZW1lcyBmb3IgdXNlIHdpdGggc3R5bGVkLWNvbXBvbmVudHNcbiAqIHBhc3NlZCBpbiB3aXRoIHRoZW1lIHByb3ZpZGVyXG4gKi9cbmNvbnN0IHRoZW1lID0ge1xuXHRib3hTaGFkb3dMaWdodDogYDBweCA1cHggNDBweCAtNXB4IHJnYmEoMCwwLDAsMC4xNSlgLFxuXHRib3hTaGFkb3c6IGAwcHggNXB4IDQwcHggLTVweCByZ2JhKDAsMCwwLDAuMylgLFxuXHRib3hTaGFkb3dEYXJrOiBgMHB4IDVweCA0MHB4IC0ycHggcmdiYSgwLDAsMCwwLjUpYCxcblx0Y29sb3I6IHtcblx0XHRiYWNrZ3JvdW5kOiAnI2ZhZmFmYScsXG5cdFx0YmFja2dyb3VuZERhcms6ICcjRUFFQUVBJyxcblx0XHRiYWNrZ3JvdW5kRGFya2VzdDogJyNCQ0JDQkMnLFxuXHRcdGJvcmRlcjogJyNkOWQ5ZDknLFxuXHRcdHRleHQ6ICcjNDA0MDQwJyxcblx0XHRsaWdodFRleHQ6ICcjODQ4NDg0Jyxcblx0XHRpbnB1dDogJyNGMUYzRjQnLFxuXHRcdHJlZDogJyNFRDUwNTAnLFxuXHRcdGxpZ2h0UmVkOiAnI0ZGOEQ4RCcsXG5cdFx0Z3JlZW46ICcjRDhFMTNGJyxcblx0XHR2aXZpZEdyZWVuOiAnI0UzRkM1MicsXG5cdFx0Ymx1ZTogJyM0NkM4RjUnLFxuXHRcdGxpZ2h0Qmx1ZTogJyM5N0U0RkYnLFxuXHRcdGRhcmtCbHVlOiAnIzJFOEFBOCcsXG5cdFx0YXF1YTogJyM2OEY2QkEnLFxuXHRcdG9yYW5nZTogJyNmZmJmODAnLFxuXHR9LFxuXHRncmFkaWVudDoge1xuXHRcdGxpZ2h0OiBgbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2ZmZmZmZiAwJSwgI2Y2ZjZmNiA0NyUsICNlZGVkZWQgMTAwJSlgLFxuXHRcdHJlZDogJ2xpbmVhci1ncmFkaWVudCh0byBib3R0b20sICNmMDc4NzggMCUsICNFRDUwNTAgMTAwJSknLFxuXHRcdGxpZ2h0UmVkOiAnbGluZWFyLWdyYWRpZW50KHRvIGJvdHRvbSwgI2YzOTE5MSAwJSwgI2VmNjI2MiAxMDAlKScsXG5cdFx0Z3JlZW46ICdsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjRDhFMTNGIDAlLCAjQkZDNjQ0IDEwMCUpJyxcblx0XHRncmVlbkJsdWU6ICcgbGluZWFyLWdyYWRpZW50KDE2MGRlZywgIzU3REFDQiAwJSwgIzU1QTJFRCAxMDAlKScsXG5cdH0sXG5cdGZvbnQ6IHtcblx0XHRoZWFkZXI6IGAnUG9pcmV0IE9uZScsIGN1cnNpdmVgLFxuXHRcdG1haW46IGAnUXVpY2tzYW5kJywgc2Fucy1zZXJpZmAsXG5cdH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCB0aGVtZTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./frontend/theme.js\n"
				);

				/***/
			},

		/***/ './frontend/utils/history.js':
			/*!***********************************!*\
  !*** ./frontend/utils/history.js ***!
  \***********************************/
			/*! no static exports found */
			/***/ function(module, exports, __webpack_require__) {
				'use strict';
				eval(
					"/* WEBPACK VAR INJECTION */(function(module) {\n\nObject.defineProperty(exports, \"__esModule\", {\n\tvalue: true\n});\n\n(function () {\n\tvar enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).enterModule;\n\tenterModule && enterModule(module);\n})();\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nvar MAX_HISTORY = 5;\nvar HISTORY = exports.HISTORY = 'history';\n\n/**\n * @function addToHistory\n * Add new entry to localStorage History\n * @param {string} item - item to add to history\n */\nvar addToHistory = exports.addToHistory = function addToHistory(item) {\n\tvar currentStorage = JSON.parse(localStorage.getItem(HISTORY));\n\tvar newStorage = currentStorage;\n\n\tif (!currentStorage || currentStorage.length < MAX_HISTORY) {\n\t\t//history not full\n\t\tif (!newStorage) {\n\t\t\tnewStorage = [item];\n\t\t} else {\n\t\t\tnewStorage.push(item);\n\t\t}\n\t}\n\n\tif (currentStorage && currentStorage.length >= MAX_HISTORY) {\n\t\t//history full\n\t\tif (!currentStorage.includes(item)) {\n\t\t\twhile (currentStorage.length > MAX_HISTORY - 1) {\n\t\t\t\tcurrentStorage.shift();\n\t\t\t}\n\t\t\tnewStorage.push(item);\n\t\t}\n\t}\n\n\tlocalStorage.setItem(HISTORY, JSON.stringify([].concat(_toConsumableArray(new Set(newStorage)))));\n};\n\nvar removeFromHistory = exports.removeFromHistory = function removeFromHistory(item) {\n\tvar currentStorage = JSON.parse(localStorage.getItem(HISTORY));\n\tvar index = currentStorage && currentStorage.length && currentStorage.indexOf(item);\n\tvar newStorage = currentStorage;\n\n\tif (index !== null && index > -1) {\n\t\tnewStorage.splice(index, 1);\n\n\t\tif (newStorage.length > 0) {\n\t\t\tlocalStorage.setItem(HISTORY, JSON.stringify(newStorage));\n\t\t} else {\n\t\t\tclearHistory();\n\t\t}\n\t}\n};\n\n/**\n * @function clearHistory\n * get all entries of localStorage history\n * @returns {array} history as array\n */\nvar getHistory = exports.getHistory = function getHistory() {\n\treturn JSON.parse(localStorage.getItem(HISTORY));\n};\n\n/**\n * @function clearHistory\n * Clear localStorage history\n */\nvar clearHistory = exports.clearHistory = function clearHistory() {\n\tlocalStorage.removeItem(HISTORY);\n};\n;\n\n(function () {\n\tvar reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).default;\n\n\tif (!reactHotLoader) {\n\t\treturn;\n\t}\n\n\treactHotLoader.register(MAX_HISTORY, 'MAX_HISTORY', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js');\n\treactHotLoader.register(HISTORY, 'HISTORY', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js');\n\treactHotLoader.register(addToHistory, 'addToHistory', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js');\n\treactHotLoader.register(removeFromHistory, 'removeFromHistory', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js');\n\treactHotLoader.register(getHistory, 'getHistory', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js');\n\treactHotLoader.register(clearHistory, 'clearHistory', '/Users/noradbase/code/swiftsheet/SwiftSheet/frontend/utils/history.js');\n})();\n\n;\n\n(function () {\n\tvar leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ \"./node_modules/react-hot-loader/index.js\")).leaveModule;\n\tleaveModule && leaveModule(module);\n})();\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/module.js */ \"./node_modules/webpack/buildin/module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9mcm9udGVuZC91dGlscy9oaXN0b3J5LmpzPzdmODciXSwibmFtZXMiOlsiTUFYX0hJU1RPUlkiLCJISVNUT1JZIiwiYWRkVG9IaXN0b3J5IiwiY3VycmVudFN0b3JhZ2UiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibmV3U3RvcmFnZSIsImxlbmd0aCIsIml0ZW0iLCJwdXNoIiwiaW5jbHVkZXMiLCJzaGlmdCIsInNldEl0ZW0iLCJzdHJpbmdpZnkiLCJTZXQiLCJyZW1vdmVGcm9tSGlzdG9yeSIsImluZGV4IiwiaW5kZXhPZiIsInNwbGljZSIsImNsZWFySGlzdG9yeSIsImdldEhpc3RvcnkiLCJyZW1vdmVJdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsY0FBYyxDQUFwQjtBQUNPLElBQU1DLDRCQUFVLFNBQWhCOztBQUVQOzs7OztBQUtPLElBQU1DLHNDQUFlLFNBQWZBLFlBQWUsT0FBUTtBQUNuQyxLQUFNQyxpQkFBaUJDLEtBQUtDLEtBQUwsQ0FBV0MsYUFBYUMsT0FBYixDQUFxQk4sT0FBckIsQ0FBWCxDQUF2QjtBQUNBLEtBQUlPLGFBQWFMLGNBQWpCOztBQUVBLEtBQUksQ0FBQ0EsY0FBRCxJQUFtQkEsZUFBZU0sTUFBZixHQUF3QlQsV0FBL0MsRUFBNEQ7QUFDM0Q7QUFDQSxNQUFJLENBQUNRLFVBQUwsRUFBaUI7QUFDaEJBLGdCQUFhLENBQUNFLElBQUQsQ0FBYjtBQUNBLEdBRkQsTUFFTztBQUNORixjQUFXRyxJQUFYLENBQWdCRCxJQUFoQjtBQUNBO0FBQ0Q7O0FBRUQsS0FBSVAsa0JBQWtCQSxlQUFlTSxNQUFmLElBQXlCVCxXQUEvQyxFQUE0RDtBQUMzRDtBQUNBLE1BQUksQ0FBQ0csZUFBZVMsUUFBZixDQUF3QkYsSUFBeEIsQ0FBTCxFQUFvQztBQUNuQyxVQUFPUCxlQUFlTSxNQUFmLEdBQXdCVCxjQUFjLENBQTdDLEVBQWdEO0FBQy9DRyxtQkFBZVUsS0FBZjtBQUNBO0FBQ0RMLGNBQVdHLElBQVgsQ0FBZ0JELElBQWhCO0FBQ0E7QUFDRDs7QUFFREosY0FBYVEsT0FBYixDQUFxQmIsT0FBckIsRUFBOEJHLEtBQUtXLFNBQUwsOEJBQW1CLElBQUlDLEdBQUosQ0FBUVIsVUFBUixDQUFuQixHQUE5QjtBQUNBLENBeEJNOztBQTBCQSxJQUFNUyxnREFBb0IsU0FBcEJBLGlCQUFvQixPQUFRO0FBQ3hDLEtBQU1kLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXQyxhQUFhQyxPQUFiLENBQXFCTixPQUFyQixDQUFYLENBQXZCO0FBQ0EsS0FBTWlCLFFBQ0xmLGtCQUFrQkEsZUFBZU0sTUFBakMsSUFBMkNOLGVBQWVnQixPQUFmLENBQXVCVCxJQUF2QixDQUQ1QztBQUVBLEtBQUlGLGFBQWFMLGNBQWpCOztBQUVBLEtBQUllLFVBQVUsSUFBVixJQUFrQkEsUUFBUSxDQUFDLENBQS9CLEVBQWtDO0FBQ2pDVixhQUFXWSxNQUFYLENBQWtCRixLQUFsQixFQUF5QixDQUF6Qjs7QUFFQSxNQUFJVixXQUFXQyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQzFCSCxnQkFBYVEsT0FBYixDQUFxQmIsT0FBckIsRUFBOEJHLEtBQUtXLFNBQUwsQ0FBZVAsVUFBZixDQUE5QjtBQUNBLEdBRkQsTUFFTztBQUNOYTtBQUNBO0FBQ0Q7QUFDRCxDQWZNOztBQWlCUDs7Ozs7QUFLTyxJQUFNQyxrQ0FBYSxTQUFiQSxVQUFhO0FBQUEsUUFBTWxCLEtBQUtDLEtBQUwsQ0FBV0MsYUFBYUMsT0FBYixDQUFxQk4sT0FBckIsQ0FBWCxDQUFOO0FBQUEsQ0FBbkI7O0FBRVA7Ozs7QUFJTyxJQUFNb0Isc0NBQWUsU0FBZkEsWUFBZSxHQUFNO0FBQ2pDZixjQUFhaUIsVUFBYixDQUF3QnRCLE9BQXhCO0FBQ0EsQ0FGTTs7Ozs7Ozs7Ozt5QkE5RERELFc7eUJBQ09DLE87eUJBT0FDLFk7eUJBMEJBZSxpQjt5QkFzQkFLLFU7eUJBTUFELFkiLCJmaWxlIjoiLi9mcm9udGVuZC91dGlscy9oaXN0b3J5LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgTUFYX0hJU1RPUlkgPSA1O1xuZXhwb3J0IGNvbnN0IEhJU1RPUlkgPSAnaGlzdG9yeSc7XG5cbi8qKlxuICogQGZ1bmN0aW9uIGFkZFRvSGlzdG9yeVxuICogQWRkIG5ldyBlbnRyeSB0byBsb2NhbFN0b3JhZ2UgSGlzdG9yeVxuICogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBpdGVtIHRvIGFkZCB0byBoaXN0b3J5XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRUb0hpc3RvcnkgPSBpdGVtID0+IHtcblx0Y29uc3QgY3VycmVudFN0b3JhZ2UgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKEhJU1RPUlkpKTtcblx0bGV0IG5ld1N0b3JhZ2UgPSBjdXJyZW50U3RvcmFnZTtcblxuXHRpZiAoIWN1cnJlbnRTdG9yYWdlIHx8IGN1cnJlbnRTdG9yYWdlLmxlbmd0aCA8IE1BWF9ISVNUT1JZKSB7XG5cdFx0Ly9oaXN0b3J5IG5vdCBmdWxsXG5cdFx0aWYgKCFuZXdTdG9yYWdlKSB7XG5cdFx0XHRuZXdTdG9yYWdlID0gW2l0ZW1dO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXdTdG9yYWdlLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGN1cnJlbnRTdG9yYWdlICYmIGN1cnJlbnRTdG9yYWdlLmxlbmd0aCA+PSBNQVhfSElTVE9SWSkge1xuXHRcdC8vaGlzdG9yeSBmdWxsXG5cdFx0aWYgKCFjdXJyZW50U3RvcmFnZS5pbmNsdWRlcyhpdGVtKSkge1xuXHRcdFx0d2hpbGUgKGN1cnJlbnRTdG9yYWdlLmxlbmd0aCA+IE1BWF9ISVNUT1JZIC0gMSkge1xuXHRcdFx0XHRjdXJyZW50U3RvcmFnZS5zaGlmdCgpO1xuXHRcdFx0fVxuXHRcdFx0bmV3U3RvcmFnZS5wdXNoKGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEhJU1RPUlksIEpTT04uc3RyaW5naWZ5KFsuLi5uZXcgU2V0KG5ld1N0b3JhZ2UpXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUZyb21IaXN0b3J5ID0gaXRlbSA9PiB7XG5cdGNvbnN0IGN1cnJlbnRTdG9yYWdlID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShISVNUT1JZKSk7XG5cdGNvbnN0IGluZGV4ID1cblx0XHRjdXJyZW50U3RvcmFnZSAmJiBjdXJyZW50U3RvcmFnZS5sZW5ndGggJiYgY3VycmVudFN0b3JhZ2UuaW5kZXhPZihpdGVtKTtcblx0bGV0IG5ld1N0b3JhZ2UgPSBjdXJyZW50U3RvcmFnZTtcblxuXHRpZiAoaW5kZXggIT09IG51bGwgJiYgaW5kZXggPiAtMSkge1xuXHRcdG5ld1N0b3JhZ2Uuc3BsaWNlKGluZGV4LCAxKTtcblxuXHRcdGlmIChuZXdTdG9yYWdlLmxlbmd0aCA+IDApIHtcblx0XHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKEhJU1RPUlksIEpTT04uc3RyaW5naWZ5KG5ld1N0b3JhZ2UpKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y2xlYXJIaXN0b3J5KCk7XG5cdFx0fVxuXHR9XG59O1xuXG4vKipcbiAqIEBmdW5jdGlvbiBjbGVhckhpc3RvcnlcbiAqIGdldCBhbGwgZW50cmllcyBvZiBsb2NhbFN0b3JhZ2UgaGlzdG9yeVxuICogQHJldHVybnMge2FycmF5fSBoaXN0b3J5IGFzIGFycmF5XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRIaXN0b3J5ID0gKCkgPT4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShISVNUT1JZKSk7XG5cbi8qKlxuICogQGZ1bmN0aW9uIGNsZWFySGlzdG9yeVxuICogQ2xlYXIgbG9jYWxTdG9yYWdlIGhpc3RvcnlcbiAqL1xuZXhwb3J0IGNvbnN0IGNsZWFySGlzdG9yeSA9ICgpID0+IHtcblx0bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oSElTVE9SWSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./frontend/utils/history.js\n"
				);

				/***/
			},

		/***/ './shared/enums/errorMessage.js':
			/*!**************************************!*\
  !*** ./shared/enums/errorMessage.js ***!
  \**************************************/
			/*! no static exports found */
			/***/ function(module, exports) {
				eval(
					"module.exports = {\n\tnoPassword: 'Password required for this sheet',\n\twrongPassword: 'Wrong password provided',\n\tshortPassword: 'Password too short. Minimum 6 characters',\n\tlongPassword: 'Password too long. Maximum 70 characters',\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zaGFyZWQvZW51bXMvZXJyb3JNZXNzYWdlLmpzP2I3ZjQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vc2hhcmVkL2VudW1zL2Vycm9yTWVzc2FnZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuXHRub1Bhc3N3b3JkOiAnUGFzc3dvcmQgcmVxdWlyZWQgZm9yIHRoaXMgc2hlZXQnLFxuXHR3cm9uZ1Bhc3N3b3JkOiAnV3JvbmcgcGFzc3dvcmQgcHJvdmlkZWQnLFxuXHRzaG9ydFBhc3N3b3JkOiAnUGFzc3dvcmQgdG9vIHNob3J0LiBNaW5pbXVtIDYgY2hhcmFjdGVycycsXG5cdGxvbmdQYXNzd29yZDogJ1Bhc3N3b3JkIHRvbyBsb25nLiBNYXhpbXVtIDcwIGNoYXJhY3RlcnMnLFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./shared/enums/errorMessage.js\n"
				);

				/***/
			},

		/******/
	}
);
