"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../exceptions/error");
exports.default = (err, req, res, next) => {
    if (err instanceof error_1.ValidationError)
        res.status(400);
    res.json({ error: err.message });
};
