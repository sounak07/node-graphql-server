"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
const asyncWrap = (fn) => function asyncUtilWrap(req, res, next, ...args) {
    const fnReturn = fn(req, res, next, ...args);
    return Promise.resolve(fnReturn).catch(next);
};
exports.default = asyncWrap;
