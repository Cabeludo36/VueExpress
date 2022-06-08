"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.results = exports.validateNumber = exports.internalServerError = exports.ok = exports.notFound = exports.badRequest = void 0;
const os_1 = require("os");
const badRequest = (res, err) => res.status(400).json({
    err
});
exports.badRequest = badRequest;
const notFound = (res) => res.sendStatus(404);
exports.notFound = notFound;
const ok = (res) => res.sendStatus(200);
exports.ok = ok;
const internalServerError = (res, err) => res.status(500).json({
    err: err.message
});
exports.internalServerError = internalServerError;
const validateNumber = (num) => parseFloat(num) > 0;
exports.validateNumber = validateNumber;
const nets = (0, os_1.networkInterfaces)();
exports.results = {};
for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!exports.results[name]) {
                exports.results[name] = [];
            }
            exports.results[name].push(net.address);
        }
    }
}
