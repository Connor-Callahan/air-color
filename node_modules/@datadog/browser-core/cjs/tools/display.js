"use strict";
/* eslint-disable no-console, local-rules/disallow-side-effects */
/**
 * Keep references on console methods to avoid triggering patched behaviors
 *
 * NB: in some setup, console could already be patched by another SDK.
 * In this case, some display messages can be sent by the other SDK
 * but we should be safe from infinite loop nonetheless.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = exports.ConsoleApiName = void 0;
exports.ConsoleApiName = {
    log: 'log',
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
};
var display = function (api) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!Object.prototype.hasOwnProperty.call(exports.ConsoleApiName, api)) {
        api = exports.ConsoleApiName.log;
    }
    exports.display[api].apply(exports.display, args);
};
exports.display = display;
exports.display.debug = console.debug.bind(console);
exports.display.log = console.log.bind(console);
exports.display.info = console.info.bind(console);
exports.display.warn = console.warn.bind(console);
exports.display.error = console.error.bind(console);
//# sourceMappingURL=display.js.map