"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayIfDebugEnabled = exports.callMonitored = exports.monitor = exports.monitored = exports.resetMonitor = exports.setDebugMode = exports.startMonitorErrorCollection = void 0;
var display_1 = require("./display");
var onMonitorErrorCollected;
var debugMode = false;
function startMonitorErrorCollection(newOnMonitorErrorCollected) {
    onMonitorErrorCollected = newOnMonitorErrorCollected;
}
exports.startMonitorErrorCollection = startMonitorErrorCollection;
function setDebugMode(newDebugMode) {
    debugMode = newDebugMode;
}
exports.setDebugMode = setDebugMode;
function resetMonitor() {
    onMonitorErrorCollected = undefined;
    debugMode = false;
}
exports.resetMonitor = resetMonitor;
function monitored(_, __, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var decorated = onMonitorErrorCollected ? monitor(originalMethod) : originalMethod;
        return decorated.apply(this, args);
    };
}
exports.monitored = monitored;
function monitor(fn) {
    return function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return callMonitored(fn, this, arguments);
    }; // consider output type has input type
}
exports.monitor = monitor;
function callMonitored(fn, context, args) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return fn.apply(context, args);
    }
    catch (e) {
        displayIfDebugEnabled(display_1.ConsoleApiName.error, e);
        if (onMonitorErrorCollected) {
            try {
                onMonitorErrorCollected(e);
            }
            catch (e) {
                displayIfDebugEnabled(display_1.ConsoleApiName.error, e);
            }
        }
    }
}
exports.callMonitored = callMonitored;
function displayIfDebugEnabled(api) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (debugMode) {
        display_1.display.apply(void 0, __spreadArray([api, '[MONITOR]'], args, false));
    }
}
exports.displayIfDebugEnabled = displayIfDebugEnabled;
//# sourceMappingURL=monitor.js.map