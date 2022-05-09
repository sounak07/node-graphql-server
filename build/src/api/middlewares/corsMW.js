"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
    next();
};
