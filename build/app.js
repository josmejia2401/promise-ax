/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const { PromiseAx } = __webpack_require__(/*! ./src/main/iterative.promise */ "./src/main/iterative.promise.js");
const createPromise = () => {
    return new PromiseAx();
}
module.exports = {
    createPromise: createPromise,
};


/***/ }),

/***/ "./src/main/iterative.promise.js":
/*!***************************************!*\
  !*** ./src/main/iterative.promise.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


const { Utils } = __webpack_require__(/*! ./utils/general.utils.js */ "./src/main/utils/general.utils.js");
class PromiseAx {
    /**
     * Lo que primero se cumpla, es lo que se devuelve.
     */
    #promiseWithTimeOut(promise, time, messageTimeOut) {
        let timer;
        let error = messageTimeOut ? new Error(messageTimeOut) : new Error("Request timed out");
        return Promise.race([
            promise,
            new Promise((_, rej) => timer = setTimeout(rej(error), time))
        ]).finally(() => clearTimeout(timer));
    }
    all(iterable) {
        if (Utils.isEmpty(iterable) === true) {
            return this.resolve([]);
        }
        return Promise.all(iterable);
    }
    allSettledWithTimeOut(iterable, timeout, messageTimeOut = "") {
        if (Utils.isEmpty(iterable) === true) {
            return this.resolve([]);
        }
        if (Utils.isEmpty(timeout) || isNaN(Number(timeout)) === true || timeout < 0) {
            return this.reject(new Error("Timeout is not defined"));
        }
        return new Promise((resolve, _reject) => {
            const results = [];
            var index = 0;
            var completed = 0;
            const length = iterable.length;
            while (index < length) {
                const indexCurrent = index;
                try {
                    let value = iterable[index];
                    this.#promiseWithTimeOut(value, timeout, messageTimeOut).then((result) => {
                        completed++;
                        results[indexCurrent] = result;
                        if (completed == iterable.length) {
                            resolve(results);
                        }
                    }).catch((error) => {
                        completed++;
                        results[indexCurrent] = error;
                        if (completed == iterable.length) {
                            resolve(results);
                        }
                    });
                } catch (error) {
                    completed++;
                    results[indexCurrent] = error;
                    if (completed == iterable.length) {
                        resolve(results);
                    }
                } finally {
                    ++index;
                }
            }
        });
    }
    allSettled(iterable) {
        if (Utils.isEmpty(iterable) === true) {
            return this.resolve([]);
        }
        return new Promise((resolve, _reject) => {
            const results = [];
            var index = 0;
            var completed = 0;
            const length = iterable.length;
            while (index < length) {
                const indexCurrent = index;
                try {
                    let value = iterable[index];
                    this.resolve(value).then((result) => {
                        completed++;
                        results[indexCurrent] = result;
                        if (completed == iterable.length) {
                            resolve(results);
                        }
                    }).catch((error) => {
                        completed++;
                        results[indexCurrent] = error;
                        if (completed == iterable.length) {
                            resolve(results);
                        }
                    });
                } catch (error) {
                    completed++;
                    results[indexCurrent] = error;
                    if (completed == iterable.length) {
                        resolve(results);
                    }
                } finally {
                    ++index;
                }
            }
        });
    }
    race(iterable) {
        return Promise.race(iterable);
    }
    reject(reason) {
        return Promise.reject(reason);
    }
    resolve(value) {
        return Promise.resolve(value);
    }
}
exports.PromiseAx = PromiseAx;

/***/ }),

/***/ "./src/main/utils/general.utils.js":
/*!*****************************************!*\
  !*** ./src/main/utils/general.utils.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


exports.Utils = class Utils {
  static isEmpty(value) {
    if (value === undefined || value === null || value === "") {
      return true;
    }
    if (Array.isArray(value) === true) {
      return value.length === 0;
    }
    return false;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=app.js.map