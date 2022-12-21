"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenErrorCauses = exports.createHandlingStack = exports.formatErrorMessage = exports.getFileFromStackTraceString = exports.toStackTraceString = exports.computeRawError = exports.ErrorSource = void 0;
var tracekit_1 = require("../domain/tracekit");
var monitor_1 = require("./monitor");
var utils_1 = require("./utils");
exports.ErrorSource = {
    AGENT: 'agent',
    CONSOLE: 'console',
    CUSTOM: 'custom',
    LOGGER: 'logger',
    NETWORK: 'network',
    SOURCE: 'source',
    REPORT: 'report',
};
function computeRawError(_a) {
    var stackTrace = _a.stackTrace, originalError = _a.originalError, handlingStack = _a.handlingStack, startClocks = _a.startClocks, nonErrorPrefix = _a.nonErrorPrefix, source = _a.source, handling = _a.handling;
    if (!stackTrace || (stackTrace.message === undefined && !(originalError instanceof Error))) {
        return {
            startClocks: startClocks,
            source: source,
            handling: handling,
            originalError: originalError,
            message: "".concat(nonErrorPrefix, " ").concat((0, utils_1.jsonStringify)(originalError)),
            stack: 'No stack, consider using an instance of Error',
            handlingStack: handlingStack,
            type: stackTrace && stackTrace.name,
        };
    }
    return {
        startClocks: startClocks,
        source: source,
        handling: handling,
        originalError: originalError,
        message: stackTrace.message || 'Empty message',
        stack: toStackTraceString(stackTrace),
        handlingStack: handlingStack,
        type: stackTrace.name,
        causes: flattenErrorCauses(originalError, source),
    };
}
exports.computeRawError = computeRawError;
function toStackTraceString(stack) {
    var result = formatErrorMessage(stack);
    stack.stack.forEach(function (frame) {
        var func = frame.func === '?' ? '<anonymous>' : frame.func;
        var args = frame.args && frame.args.length > 0 ? "(".concat(frame.args.join(', '), ")") : '';
        var line = frame.line ? ":".concat(frame.line) : '';
        var column = frame.line && frame.column ? ":".concat(frame.column) : '';
        result += "\n  at ".concat(func).concat(args, " @ ").concat(frame.url).concat(line).concat(column);
    });
    return result;
}
exports.toStackTraceString = toStackTraceString;
function getFileFromStackTraceString(stack) {
    var _a;
    return (_a = /@ (.+)/.exec(stack)) === null || _a === void 0 ? void 0 : _a[1];
}
exports.getFileFromStackTraceString = getFileFromStackTraceString;
function formatErrorMessage(stack) {
    return "".concat(stack.name || 'Error', ": ").concat(stack.message);
}
exports.formatErrorMessage = formatErrorMessage;
/**
 Creates a stacktrace without SDK internal frames.
 
 Constraints:
 - Has to be called at the utmost position of the call stack.
 - No monitored function should encapsulate it, that is why we need to use callMonitored inside it.
 */
function createHandlingStack() {
    /**
     * Skip the two internal frames:
     * - SDK API (console.error, ...)
     * - this function
     * in order to keep only the user calls
     */
    var internalFramesToSkip = 2;
    var error = new Error();
    var formattedStack;
    // IE needs to throw the error to fill in the stack trace
    if (!error.stack) {
        try {
            throw error;
        }
        catch (e) {
            (0, utils_1.noop)();
        }
    }
    (0, monitor_1.callMonitored)(function () {
        var stackTrace = (0, tracekit_1.computeStackTrace)(error);
        stackTrace.stack = stackTrace.stack.slice(internalFramesToSkip);
        formattedStack = toStackTraceString(stackTrace);
    });
    return formattedStack;
}
exports.createHandlingStack = createHandlingStack;
function flattenErrorCauses(error, parentSource) {
    var currentError = error;
    var causes = [];
    while ((currentError === null || currentError === void 0 ? void 0 : currentError.cause) instanceof Error && causes.length < 10) {
        var stackTrace = (0, tracekit_1.computeStackTrace)(currentError.cause);
        causes.push({
            message: currentError.cause.message,
            source: parentSource,
            type: stackTrace === null || stackTrace === void 0 ? void 0 : stackTrace.name,
            stack: stackTrace && toStackTraceString(stackTrace),
        });
        currentError = currentError.cause;
    }
    return causes.length ? causes : undefined;
}
exports.flattenErrorCauses = flattenErrorCauses;
//# sourceMappingURL=error.js.map