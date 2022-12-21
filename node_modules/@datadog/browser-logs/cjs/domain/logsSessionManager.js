"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogsSessionManagerStub = exports.startLogsSessionManager = exports.LOGS_SESSION_KEY = void 0;
var browser_core_1 = require("@datadog/browser-core");
exports.LOGS_SESSION_KEY = 'logs';
function startLogsSessionManager(configuration) {
    var sessionManager = (0, browser_core_1.startSessionManager)(configuration.cookieOptions, exports.LOGS_SESSION_KEY, function (rawTrackingType) {
        return computeSessionState(configuration, rawTrackingType);
    });
    return {
        findTrackedSession: function (startTime) {
            var session = sessionManager.findActiveSession(startTime);
            return session && session.trackingType === "1" /* TRACKED */
                ? {
                    id: session.id,
                }
                : undefined;
        },
    };
}
exports.startLogsSessionManager = startLogsSessionManager;
function startLogsSessionManagerStub(configuration) {
    var isTracked = computeTrackingType(configuration) === "1" /* TRACKED */;
    var session = isTracked ? {} : undefined;
    return {
        findTrackedSession: function () { return session; },
    };
}
exports.startLogsSessionManagerStub = startLogsSessionManagerStub;
function computeTrackingType(configuration) {
    if (!(0, browser_core_1.performDraw)(configuration.sampleRate)) {
        return "0" /* NOT_TRACKED */;
    }
    return "1" /* TRACKED */;
}
function computeSessionState(configuration, rawSessionType) {
    var trackingType = hasValidLoggerSession(rawSessionType) ? rawSessionType : computeTrackingType(configuration);
    return {
        trackingType: trackingType,
        isTracked: trackingType === "1" /* TRACKED */,
    };
}
function hasValidLoggerSession(trackingType) {
    return trackingType === "0" /* NOT_TRACKED */ || trackingType === "1" /* TRACKED */;
}
//# sourceMappingURL=logsSessionManager.js.map