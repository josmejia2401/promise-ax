const { PromiseAx } = require('../../src/main/iterative.promise');
describe("Test Case iterative.promise.js", () => {
    it("TEST 1", async () => {
        const asyncOperation = function (time) {
            return new Promise(function (resolve, reject) {
                if (time < 0) {
                    reject("reject");
                }
                setTimeout(function () {
                    resolve(time);
                }, time);
            });
        };
        const promisesToMake = [asyncOperation(2000), asyncOperation(1000), asyncOperation(500), asyncOperation(-500)];
        let results = await PromiseAx.allSettled(promisesToMake);
        expect(results[0]).toEqual(2000);
    });

    it("TEST 2 - time", async () => {
        const asyncOperation = function (time) {
            return new Promise(function (resolve, reject) {
                if (time < 0) {
                    reject("reject");
                }
                setTimeout(function () {
                    resolve(time);
                }, time);
            });
        };
        const startTime = new Date().getTime();
        const promisesToMake = [asyncOperation(2000), asyncOperation(1000), asyncOperation(500), asyncOperation(-500)];
        await PromiseAx.allSettled(promisesToMake);
        const diffTime = new Date().getTime() - startTime;
        expect(diffTime).toBeGreaterThanOrEqual(2000);
        expect(diffTime).toBeLessThan(5000);
    });
});