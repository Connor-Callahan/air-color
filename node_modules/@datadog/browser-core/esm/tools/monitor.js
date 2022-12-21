var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { ConsoleApiName, display } from './display';
var onMonitorErrorCollected;
var debugMode = false;
export function startMonitorErrorCollection(newOnMonitorErrorCollected) {
    onMonitorErrorCollected = newOnMonitorErrorCollected;
}
export function setDebugMode(newDebugMode) {
    debugMode = newDebugMode;
}
export function resetMonitor() {
    onMonitorErrorCollected = undefined;
    debugMode = false;
}
export function monitored(_, __, descriptor) {
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
export function monitor(fn) {
    return function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return callMonitored(fn, this, arguments);
    }; // consider output type has input type
}
export function callMonitored(fn, context, args) {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return fn.apply(context, args);
    }
    catch (e) {
        displayIfDebugEnabled(ConsoleApiName.error, e);
        if (onMonitorErrorCollected) {
            try {
                onMonitorErrorCollected(e);
            }
            catch (e) {
                displayIfDebugEnabled(ConsoleApiName.error, e);
            }
        }
    }
}
export function displayIfDebugEnabled(api) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (debugMode) {
        display.apply(void 0, __spreadArray([api, '[MONITOR]'], args, false));
    }
}
//# sourceMappingURL=monitor.js.map