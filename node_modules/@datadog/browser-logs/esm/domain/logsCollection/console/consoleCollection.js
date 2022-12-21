var _a;
import { timeStampNow, ConsoleApiName, ErrorSource, initConsoleObservable } from '@datadog/browser-core';
import { StatusType } from '../../logger';
var LogStatusForApi = (_a = {},
    _a[ConsoleApiName.log] = StatusType.info,
    _a[ConsoleApiName.debug] = StatusType.debug,
    _a[ConsoleApiName.info] = StatusType.info,
    _a[ConsoleApiName.warn] = StatusType.warn,
    _a[ConsoleApiName.error] = StatusType.error,
    _a);
export function startConsoleCollection(configuration, lifeCycle) {
    var consoleSubscription = initConsoleObservable(configuration.forwardConsoleLogs).subscribe(function (log) {
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: timeStampNow(),
                message: log.message,
                origin: ErrorSource.CONSOLE,
                error: log.api === ConsoleApiName.error
                    ? {
                        origin: ErrorSource.CONSOLE,
                        stack: log.stack,
                    }
                    : undefined,
                status: LogStatusForApi[log.api],
            },
        });
    });
    return {
        stop: function () {
            consoleSubscription.unsubscribe();
        },
    };
}
//# sourceMappingURL=consoleCollection.js.map