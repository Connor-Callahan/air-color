"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetNavigationStart = exports.looksLikeRelativeTime = exports.getTimeStamp = exports.getRelativeTime = exports.addDuration = exports.elapsed = exports.clocksOrigin = exports.clocksNow = exports.relativeNow = exports.timeStampNow = exports.dateNow = exports.toServerDuration = exports.currentDrift = exports.relativeToClocks = void 0;
var utils_1 = require("./utils");
function relativeToClocks(relative) {
    return { relative: relative, timeStamp: getCorrectedTimeStamp(relative) };
}
exports.relativeToClocks = relativeToClocks;
function getCorrectedTimeStamp(relativeTime) {
    var correctedOrigin = (dateNow() - performance.now());
    // apply correction only for positive drift
    if (correctedOrigin > getNavigationStart()) {
        return Math.round(addDuration(correctedOrigin, relativeTime));
    }
    return getTimeStamp(relativeTime);
}
function currentDrift() {
    return Math.round(dateNow() - addDuration(getNavigationStart(), performance.now()));
}
exports.currentDrift = currentDrift;
function toServerDuration(duration) {
    if (!(0, utils_1.isNumber)(duration)) {
        return duration;
    }
    return (0, utils_1.round)(duration * 1e6, 0);
}
exports.toServerDuration = toServerDuration;
function dateNow() {
    // Do not use `Date.now` because sometimes websites are wrongly "polyfilling" it. For example, we
    // had some users using a very old version of `datejs`, which patched `Date.now` to return a Date
    // instance instead of a timestamp[1]. Those users are unlikely to fix this, so let's handle this
    // case ourselves.
    // [1]: https://github.com/datejs/Datejs/blob/97f5c7c58c5bc5accdab8aa7602b6ac56462d778/src/core-debug.js#L14-L16
    return new Date().getTime();
}
exports.dateNow = dateNow;
function timeStampNow() {
    return dateNow();
}
exports.timeStampNow = timeStampNow;
function relativeNow() {
    return performance.now();
}
exports.relativeNow = relativeNow;
function clocksNow() {
    return { relative: relativeNow(), timeStamp: timeStampNow() };
}
exports.clocksNow = clocksNow;
function clocksOrigin() {
    return { relative: 0, timeStamp: getNavigationStart() };
}
exports.clocksOrigin = clocksOrigin;
function elapsed(start, end) {
    return (end - start);
}
exports.elapsed = elapsed;
function addDuration(a, b) {
    return a + b;
}
exports.addDuration = addDuration;
/**
 * Get the time since the navigation was started.
 *
 * Note: this does not use `performance.timeOrigin` because it doesn't seem to reflect the actual
 * time on which the navigation has started: it may be much farther in the past, at least in Firefox 71.
 * Related issue in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1429926
 */
function getRelativeTime(timestamp) {
    return (timestamp - getNavigationStart());
}
exports.getRelativeTime = getRelativeTime;
function getTimeStamp(relativeTime) {
    return Math.round(addDuration(getNavigationStart(), relativeTime));
}
exports.getTimeStamp = getTimeStamp;
function looksLikeRelativeTime(time) {
    return time < utils_1.ONE_YEAR;
}
exports.looksLikeRelativeTime = looksLikeRelativeTime;
/**
 * Navigation start slightly change on some rare cases
 */
var navigationStart;
function getNavigationStart() {
    if (navigationStart === undefined) {
        navigationStart = performance.timing.navigationStart;
    }
    return navigationStart;
}
function resetNavigationStart() {
    navigationStart = undefined;
}
exports.resetNavigationStart = resetNavigationStart;
//# sourceMappingURL=timeUtils.js.map