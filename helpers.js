"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleColors = {
    BgRed: '\x1b[41m',
    FgGreen: '\x1b[32m',
    FgBlue: '\x1b[34m',
};
exports.colorizeLog = (str, color = exports.consoleColors.FgBlue) => `${color}${str}\x1b[0m`;
exports.throwError = (error) => {
    throw new Error(exports.colorizeLog(error, exports.consoleColors.BgRed));
};
