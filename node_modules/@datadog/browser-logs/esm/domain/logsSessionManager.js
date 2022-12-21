import { performDraw, startSessionManager } from '@datadog/browser-core';
export var LOGS_SESSION_KEY = 'logs';
export function startLogsSessionManager(configuration) {
    var sessionManager = startSessionManager(configuration.cookieOptions, LOGS_SESSION_KEY, function (rawTrackingType) {
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
export function startLogsSessionManagerStub(configuration) {
    var isTracked = computeTrackingType(configuration) === "1" /* TRACKED */;
    var session = isTracked ? {} : undefined;
    return {
        findTrackedSession: function () { return session; },
    };
}
function computeTrackingType(configuration) {
    if (!performDraw(configuration.sampleRate)) {
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