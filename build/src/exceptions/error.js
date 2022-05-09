"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.BaseError = void 0;
// eslint-disable-next-line max-classes-per-file
class BaseError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}
exports.BaseError = BaseError;
class ValidationError extends BaseError {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ValidationError.prototype);
    }
}
exports.ValidationError = ValidationError;
