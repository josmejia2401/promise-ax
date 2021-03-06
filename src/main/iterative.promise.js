"use strict";
const { Utils } = require("./utils/general.utils.js");
class PromiseAx {
    /**
     * Lo que primero se cumpla, es lo que se devuelve.
     */
    promiseWithTimeOut(promise, time, messageTimeOut) {
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
                    this.promiseWithTimeOut(value, timeout, messageTimeOut).then((result) => {
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
module.exports = {
    PromiseAx
};
