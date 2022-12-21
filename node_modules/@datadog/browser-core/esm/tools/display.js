/* eslint-disable no-console, local-rules/disallow-side-effects */
/**
 * Keep references on console methods to avoid triggering patched behaviors
 *
 * NB: in some setup, console could already be patched by another SDK.
 * In this case, some display messages can be sent by the other SDK
 * but we should be safe from infinite loop nonetheless.
 */
export var ConsoleApiName = {
    log: 'log',
    debug: 'debug',
    info: 'info',
    warn: 'warn',
    error: 'error',
};
export var display = function (api) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (!Object.prototype.hasOwnProperty.call(ConsoleApiName, api)) {
        api = ConsoleApiName.log;
    }
    display[api].apply(display, args);
};
display.debug = console.debug.bind(console);
display.log = console.log.bind(console);
display.info = console.info.bind(console);
display.warn = console.warn.bind(console);
display.error = console.error.bind(console);
//# sourceMappingURL=display.js.map