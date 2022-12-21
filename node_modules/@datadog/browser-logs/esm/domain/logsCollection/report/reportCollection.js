var _a;
import { timeStampNow, ErrorSource, RawReportType, getFileFromStackTraceString, initReportObservable, } from '@datadog/browser-core';
import { StatusType } from '../../logger';
var LogStatusForReport = (_a = {},
    _a[RawReportType.cspViolation] = StatusType.error,
    _a[RawReportType.intervention] = StatusType.error,
    _a[RawReportType.deprecation] = StatusType.warn,
    _a);
export function startReportCollection(configuration, lifeCycle) {
    var reportSubscription = initReportObservable(configuration.forwardReports).subscribe(function (report) {
        var message = report.message;
        var status = LogStatusForReport[report.type];
        var error;
        if (status === StatusType.error) {
            error = {
                kind: report.subtype,
                origin: ErrorSource.REPORT,
                stack: report.stack,
            };
        }
        else if (report.stack) {
            message += " Found in ".concat(getFileFromStackTraceString(report.stack));
        }
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: timeStampNow(),
                message: message,
                origin: ErrorSource.REPORT,
                error: error,
                status: status,
            },
        });
    });
    return {
        stop: function () {
            reportSubscription.unsubscribe();
        },
    };
}
//# sourceMappingURL=reportCollection.js.map