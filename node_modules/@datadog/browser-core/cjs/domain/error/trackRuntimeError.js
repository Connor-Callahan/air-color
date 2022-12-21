"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackRuntimeError = void 0;
var error_1 = require("../../tools/error");
var timeUtils_1 = require("../../tools/timeUtils");
var tracekit_1 = require("../tracekit");
function trackRuntimeError(errorObservable) {
    return (0, tracekit_1.startUnhandledErrorCollection)(function (stackTrace, originalError) {
        errorObservable.notify((0, error_1.computeRawError)({
            stackTrace: stackTrace,
            originalError: originalError,
            startClocks: (0, timeUtils_1.clocksNow)(),
            nonErrorPrefix: 'Uncaught',
            source: error_1.ErrorSource.SOURCE,
            handling: "unhandled" /* UNHANDLED */,
        }));
    });
}
exports.trackRuntimeError = trackRuntimeError;
//# sourceMappingURL=trackRuntimeError.js.map