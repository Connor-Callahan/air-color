"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRuntimeErrorCollection = void 0;
var browser_core_1 = require("@datadog/browser-core");
var logger_1 = require("../../logger");
function startRuntimeErrorCollection(configuration, lifeCycle) {
    if (!configuration.forwardErrorsToLogs) {
        return { stop: browser_core_1.noop };
    }
    var rawErrorObservable = new browser_core_1.Observable();
    var stopRuntimeErrorTracking = (0, browser_core_1.trackRuntimeError)(rawErrorObservable).stop;
    var rawErrorSubscription = rawErrorObservable.subscribe(function (rawError) {
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                message: rawError.message,
                date: rawError.startClocks.timeStamp,
                error: {
                    kind: rawError.type,
                    origin: browser_core_1.ErrorSource.SOURCE,
                    stack: rawError.stack,
                },
                origin: browser_core_1.ErrorSource.SOURCE,
                status: logger_1.StatusType.error,
            },
        });
    });
    return {
        stop: function () {
            stopRuntimeErrorTracking();
            rawErrorSubscription.unsubscribe();
        },
    };
}
exports.startRuntimeErrorCollection = startRuntimeErrorCollection;
//# sourceMappingURL=runtimeErrorCollection.js.map