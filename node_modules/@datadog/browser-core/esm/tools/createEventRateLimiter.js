import { ErrorSource } from './error';
import { clocksNow } from './timeUtils';
import { ONE_MINUTE } from './utils';
export function createEventRateLimiter(eventType, limit, onLimitReached) {
    var eventCount = 0;
    var allowNextEvent = false;
    return {
        isLimitReached: function () {
            if (eventCount === 0) {
                setTimeout(function () {
                    eventCount = 0;
                }, ONE_MINUTE);
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
                        source: ErrorSource.AGENT,
                        startClocks: clocksNow(),
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
//# sourceMappingURL=createEventRateLimiter.js.map