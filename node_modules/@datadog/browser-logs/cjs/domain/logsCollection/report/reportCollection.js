"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.startReportCollection = void 0;
var browser_core_1 = require("@datadog/browser-core");
var logger_1 = require("../../logger");
var LogStatusForReport = (_a = {},
    _a[browser_core_1.RawReportType.cspViolation] = logger_1.StatusType.error,
    _a[browser_core_1.RawReportType.intervention] = logger_1.StatusType.error,
    _a[browser_core_1.RawReportType.deprecation] = logger_1.StatusType.warn,
    _a);
function startReportCollection(configuration, lifeCycle) {
    var reportSubscription = (0, browser_core_1.initReportObservable)(configuration.forwardReports).subscribe(function (report) {
        var message = report.message;
        var status = LogStatusForReport[report.type];
        var error;
        if (status === logger_1.StatusType.error) {
            error = {
                kind: report.subtype,
                origin: browser_core_1.ErrorSource.REPORT,
                stack: report.stack,
            };
        }
        else if (report.stack) {
            message += " Found in ".concat((0, browser_core_1.getFileFromStackTraceString)(report.stack));
        }
        lifeCycle.notify(0 /* RAW_LOG_COLLECTED */, {
            rawLogsEvent: {
                date: (0, browser_core_1.timeStampNow)(),
                message: message,
                origin: browser_core_1.ErrorSource.REPORT,
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
exports.startReportCollection = startReportCollection;
//# sourceMappingURL=reportCollection.js.map