"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConsoleCollection = void 0;
var browser_core_1 = require("@datadog/browser-core");
var logger_1 = require("../../logger");
var LogStatusForApi = (_a = {},
    _a[browser_core_1.ConsoleApiName.log] = logger_1.StatusType.info,
    _a[browser_core_1.ConsoleApiName.debug] = logger_1.StatusType.debug,
    _a[browser_core_1.ConsoleApiName.info] = logger_1.StatusType.info,
    _a[browser_core_1.ConsoleApiName.warn] = logger_1.StatusType.warn,
    _a[browser_core_1.ConsoleApiName.error] = logger_1.StatusType.error,
    _a);
function startConsoleCollection(configuration, lifeCycle) {
    var consoleSubscription = (0, browser_core_1.initConsoleObservable)(configuration.forwardConsoleLogs).subscribe(function (log) {
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: (0, browser_core_1.timeStampNow)(),
                message: log.message,
                origin: browser_core_1.ErrorSource.CONSOLE,
                error: log.api === browser_core_1.ConsoleApiName.error
                    ? {
                        origin: browser_core_1.ErrorSource.CONSOLE,
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
exports.startConsoleCollection = startConsoleCollection;
//# sourceMappingURL=consoleCollection.js.map