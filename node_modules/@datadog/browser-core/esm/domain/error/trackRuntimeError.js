import { ErrorSource, computeRawError } from '../../tools/error';
import { clocksNow } from '../../tools/timeUtils';
import { startUnhandledErrorCollection } from '../tracekit';
export function trackRuntimeError(errorObservable) {
    return startUnhandledErrorCollection(function (stackTrace, originalError) {
        errorObservable.notify(computeRawError({
            stackTrace: stackTrace,
            originalError: originalError,
            startClocks: clocksNow(),
            nonErrorPrefix: 'Uncaught',
            source: ErrorSource.SOURCE,
            handling: "unhandled" /* UNHANDLED */,
        }));
    });
}
//# sourceMappingURL=trackRuntimeError.js.map