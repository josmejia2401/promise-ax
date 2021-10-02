const { createPromise } = require('../app.js');
describe("Test Case iterative.promise.js", () => {
    const asyncOperation = (time) => {
        return new Promise((resolve, reject) => {
            if (time < 0) {
                reject("reject");
            }
            setTimeout(() => {
                resolve(time);
            }, time);
        });
    };
    it("test #1 => allSettled", async () => {
        const promisesToMake = [asyncOperation(2000), asyncOperation(1000), asyncOperation(500), asyncOperation(-500)];
        const promise = createPromise();
        let results = await promise.allSettled(promisesToMake);
        expect(results[0]).toBe(2000);
    });
    it("test #2 => allSettled with timeout", async () => {
        const promisesToMake = [asyncOperation(2000), asyncOperation(1000), asyncOperation(500), asyncOperation(-500)];
        const promise = createPromise();
        let results = await promise.allSettledWithTimeOut(promisesToMake, 500);
        expect(results[0]).toBeInstanceOf(Error);
    });
    it("test #3 => allSettled with timeout and message", async () => {
        const promisesToMake = [asyncOperation(2000), asyncOperation(1000), asyncOperation(500), asyncOperation(-500)];
        const promise = createPromise();
        let results = await promise.allSettledWithTimeOut(promisesToMake, 500, "timeoutError");
        expect(results[0].message).toBe("timeoutError");
    });
    it("test #4 => allSettled with real time", async () => {
        const promise = createPromise();
        const promisesToMake = [asyncOperation(2000), asyncOperation(1000), asyncOperation(500), asyncOperation(-500)];
        const startTime = new Date().getTime();
        await promise.allSettled(promisesToMake);
        const diffTime = new Date().getTime() - startTime;
        expect(diffTime).toBeGreaterThanOrEqual(1900);
        expect(diffTime).toBeLessThan(2500);
    });
});