var _a;
import { includes, display, combine, ErrorSource, timeStampNow } from '@datadog/browser-core';
import { StatusType, HandlerType } from '../../logger';
export var STATUS_PRIORITIES = (_a = {},
    _a[StatusType.debug] = 0,
    _a[StatusType.info] = 1,
    _a[StatusType.warn] = 2,
    _a[StatusType.error] = 3,
    _a);
export function startLoggerCollection(lifeCycle) {
    function handleLog(logsMessage, logger, savedCommonContext, savedDate) {
        var messageContext = logsMessage.context;
        if (isAuthorized(logsMessage.status, HandlerType.console, logger)) {
            display(logsMessage.status, logsMessage.message, combine(logger.getContext(), messageContext));
        }
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: savedDate || timeStampNow(),
                message: logsMessage.message,
                status: logsMessage.status,
                origin: ErrorSource.LOGGER,
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
export function isAuthorized(status, handlerType, logger) {
    var loggerHandler = logger.getHandler();
    var sanitizedHandlerType = Array.isArray(loggerHandler) ? loggerHandler : [loggerHandler];
    return (STATUS_PRIORITIES[status] >= STATUS_PRIORITIES[logger.getLevel()] && includes(sanitizedHandlerType, handlerType));
}
//# sourceMappingURL=loggerCollection.js.map