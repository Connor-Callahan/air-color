export function startInternalContext(sessionManager) {
    return {
        get: function (startTime) {
            var trackedSession = sessionManager.findTrackedSession(startTime);
            if (trackedSession) {
                return {
                    session_id: trackedSession.id,
                };
            }
        },
    };
}
//# sourceMappingURL=internalContext.js.map