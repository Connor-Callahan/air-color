"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEventRateLimiter = void 0;
var error_1 = require("./error");
var timeUtils_1 = require("./timeUtils");
var utils_1 = require("./utils");
function createEventRateLimiter(eventType, limit, onLimitReached) {
    var eventCount = 0;
    var allowNextEvent = false;
    return {
        isLimitReached: function () {
            if (eventCount === 0) {
                setTimeout(function () {
                    eventCount = 0;
                }, utils_1.ONE_MINUTE);
            }
            eventCount += 1;
            if (eventCount <= limit || allowNextEvent) {
                allowNextEvent = false;
                return false;
            }
            if (eventCount === limit + 1) {
                allowNextEvent = true;
                try {
                    onLimitReached({
                        message: "Reached max number of ".concat(eventType, "s by minute: ").concat(limit),
                        source: error_1.ErrorSource.AGENT,
                        startClocks: (0, timeUtils_1.clocksNow)(),
                    });
                }
                finally {
                    allowNextEvent = false;
                }
            }
            return true;
        },
    };
}
exports.createEventRateLimiter = createEventRateLimiter;
//# sourceMappingURL=createEventRateLimiter.js.map