import { noop, ErrorSource, trackRuntimeError, Observable } from '@datadog/browser-core';
import { StatusType } from '../../logger';
export function startRuntimeErrorCollection(configuration, lifeCycle) {
    if (!configuration.forwardErrorsToLogs) {
        return { stop: noop };
    }
    var rawErrorObservable = new Observable();
    var stopRuntimeErrorTracking = trackRuntimeError(rawErrorObservable).stop;
    var rawErrorSubscription = rawErrorObservable.subscribe(function (rawError) {
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                message: rawError.message,
                date: rawError.startClocks.timeStamp,
                error: {
                    kind: rawError.type,
                    origin: ErrorSource.SOURCE,
                    stack: rawError.stack,
                },
                origin: ErrorSource.SOURCE,
                status: StatusType.error,
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
//# sourceMappingURL=runtimeErrorCollection.js.map