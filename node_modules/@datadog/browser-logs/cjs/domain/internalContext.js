"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startInternalContext = void 0;
function startInternalContext(sessionManager) {
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
exports.startInternalContext = startInternalContext;
//# sourceMappingURL=internalContext.js.map