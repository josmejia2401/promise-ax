"use strict";
const { PromiseAx } = require('./main/iterative.promise');
const createPromise = () => {
    return new PromiseAx();
}
module.exports = {
    createPromise: createPromise,
};
