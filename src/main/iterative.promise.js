"use strict";
const { Utils } = require("./utils/general.utils.js");
class PromiseAx extends Promise {
    static all(iterable) {
        if (Utils.isEmpty(iterable) === true) {
            return PromiseAx.resolve([]);
        }
        return Promise.all(iterable);
    }
    static allSettled(iterable) {
        if (Utils.isEmpty(iterable) === true) {
            return PromiseAx.resolve([]);
        }
        return new Promise(function (resolve, reject) {
            const results = [];
            var index = 0;
            var completed = 0;
            const length = iterable.length;
            while (index < length) {
                try {
                    let value = iterable[index];
                    const indexCurrent = index;
                    PromiseAx.resolve(value).then(function (result) {
                        completed++;
                        results[indexCurrent] = result;
                        if (completed == iterable.length) {
                            resolve(results);
                        }
                    }).catch(function (error) {
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
    static race(iterable) {
        return Promise.race(iterable);
    }
    static reject(reason) {
        return Promise.reject(reason);
    }
    static resolve(value) {
        return Promise.resolve(value);
    }
}
exports.PromiseAx = PromiseAx;