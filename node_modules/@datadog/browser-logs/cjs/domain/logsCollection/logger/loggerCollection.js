"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthorized = exports.startLoggerCollection = exports.STATUS_PRIORITIES = void 0;
var browser_core_1 = require("@datadog/browser-core");
var logger_1 = require("../../logger");
exports.STATUS_PRIORITIES = (_a = {},
    _a[logger_1.StatusType.debug] = 0,
    _a[logger_1.StatusType.info] = 1,
    _a[logger_1.StatusType.warn] = 2,
    _a[logger_1.StatusType.error] = 3,
    _a);
function startLoggerCollection(lifeCycle) {
    function handleLog(logsMessage, logger, savedCommonContext, savedDate) {
        var messageContext = logsMessage.context;
        if (isAuthorized(logsMessage.status, logger_1.HandlerType.console, logger)) {
            (0, browser_core_1.display)(logsMessage.status, logsMessage.message, (0, browser_core_1.combine)(logger.getContext(), messageContext));
        }
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: savedDate || (0, browser_core_1.timeStampNow)(),
                message: logsMessage.message,
                status: logsMessage.status,
                origin: browser_core_1.ErrorSource.LOGGER,
            },
            messageContext: messageContext,
            savedCommonContext: savedCommonContext,
            logger: logger,
        });
    }
    return {
        handleLog: handleLog,
    };
}
exports.startLoggerCollection = startLoggerCollection;
function isAuthorized(status, handlerType, logger) {
    var loggerHandler = logger.getHandler();
    var sanitizedHandlerType = Array.isArray(loggerHandler) ? loggerHandler : [loggerHandler];
    return (exports.STATUS_PRIORITIES[status] >= exports.STATUS_PRIORITIES[logger.getLevel()] && (0, browser_core_1.includes)(sanitizedHandlerType, handlerType));
}
exports.isAuthorized = isAuthorized;
//# sourceMappingURL=loggerCollection.js.map