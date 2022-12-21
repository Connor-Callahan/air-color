"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instrumentSetter = exports.instrumentMethodAndCallOriginal = exports.instrumentMethod = void 0;
var monitor_1 = require("./monitor");
var utils_1 = require("./utils");
function instrumentMethod(object, method, instrumentationFactory) {
    var original = object[method];
    var instrumentation = instrumentationFactory(original);
    var instrumentationWrapper = function () {
        if (typeof instrumentation !== 'function') {
            return undefined;
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return instrumentation.apply(this, arguments);
    };
    object[method] = instrumentationWrapper;
    return {
        stop: function () {
            if (object[method] === instrumentationWrapper) {
                object[method] = original;
            }
            else {
                instrumentation = original;
            }
        },
    };
}
exports.instrumentMethod = instrumentMethod;
function instrumentMethodAndCallOriginal(object, method, _a) {
    var before = _a.before, after = _a.after;
    return instrumentMethod(object, method, function (original) {
        return function () {
            var args = arguments;
            var result;
            if (before) {
                (0, monitor_1.callMonitored)(before, this, args);
            }
            if (typeof original === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                result = original.apply(this, args);
            }
            if (after) {
                (0, monitor_1.callMonitored)(after, this, args);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result;
        };
    });
}
exports.instrumentMethodAndCallOriginal = instrumentMethodAndCallOriginal;
function instrumentSetter(object, property, after) {
    var originalDescriptor = Object.getOwnPropertyDescriptor(object, property);
    if (!originalDescriptor || !originalDescriptor.set || !originalDescriptor.configurable) {
        return { stop: utils_1.noop };
    }
    var instrumentation = function (thisObject, value) {
        // put hooked setter into event loop to avoid of set latency
        setTimeout((0, monitor_1.monitor)(function () {
            after(thisObject, value);
        }), 0);
    };
    var instrumentationWrapper = function (value) {
        originalDescriptor.set.call(this, value);
        instrumentation(this, value);
    };
    Object.defineProperty(object, property, {
        set: instrumentationWrapper,
    });
    return {
        stop: function () {
            var _a;
            if (((_a = Object.getOwnPropertyDescriptor(object, property)) === null || _a === void 0 ? void 0 : _a.set) === instrumentationWrapper) {
                Object.defineProperty(object, property, originalDescriptor);
            }
            else {
                instrumentation = utils_1.noop;
            }
        },
    };
}
exports.instrumentSetter = instrumentSetter;
//# sourceMappingURL=instrumentMethod.js.map