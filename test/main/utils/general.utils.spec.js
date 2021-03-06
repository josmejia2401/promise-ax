const { Utils } = require('../../../src/main/utils/general.utils.js');
describe("Test Case general.utils.js", () => {
  it("TEST isEmpty (is null)", async () => {
    let value = "";
    let result = Utils.isEmpty(value);
    expect(result).toEqual(true);
  });
  it("TEST isEmpty (is array)", async () => {
    let value = [];
    let result = Utils.isEmpty(value);
    expect(result).toEqual(true);
  });
  it("TEST isEmpty (OK)", async () => {
    let value = "esto no es nulo";
    let result = Utils.isEmpty(value);
    expect(result).toEqual(false);
  });
});