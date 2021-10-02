"use strict";
const { PromiseAx } = require('./src/main/iterative.promise');
const createPromise = () => {
    return new PromiseAx();
}
module.exports = {
    createPromise: createPromise,
};
