"use strict";
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
