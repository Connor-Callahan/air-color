import { isNumber, ONE_YEAR, round } from './utils';
export function relativeToClocks(relative) {
    return { relative: relative, timeStamp: getCorrectedTimeStamp(relative) };
}
function getCorrectedTimeStamp(relativeTime) {
    var correctedOrigin = (dateNow() - performance.now());
    // apply correction only for positive drift
    if (correctedOrigin > getNavigationStart()) {
        return Math.round(addDuration(correctedOrigin, relativeTime));
    }
    return getTimeStamp(relativeTime);
}
export function currentDrift() {
    return Math.round(dateNow() - addDuration(getNavigationStart(), performance.now()));
}
export function toServerDuration(duration) {
    if (!isNumber(duration)) {
        return duration;
    }
    return round(duration * 1e6, 0);
}
export function dateNow() {
    // Do not use `Date.now` because sometimes websites are wrongly "polyfilling" it. For example, we
    // had some users using a very old version of `datejs`, which patched `Date.now` to return a Date
    // instance instead of a timestamp[1]. Those users are unlikely to fix this, so let's handle this
    // case ourselves.
    // [1]: https://github.com/datejs/Datejs/blob/97f5c7c58c5bc5accdab8aa7602b6ac56462d778/src/core-debug.js#L14-L16
    return new Date().getTime();
}
export function timeStampNow() {
    return dateNow();
}
export function relativeNow() {
    return performance.now();
}
export function clocksNow() {
    return { relative: relativeNow(), timeStamp: timeStampNow() };
}
export function clocksOrigin() {
    return { relative: 0, timeStamp: getNavigationStart() };
}
export function elapsed(start, end) {
    return (end - start);
}
export function addDuration(a, b) {
    return a + b;
}
/**
 * Get the time since the navigation was started.
 *
 * Note: this does not use `performance.timeOrigin` because it doesn't seem to reflect the actual
 * time on which the navigation has started: it may be much farther in the past, at least in Firefox 71.
 * Related issue in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1429926
 */
export function getRelativeTime(timestamp) {
    return (timestamp - getNavigationStart());
}
export function getTimeStamp(relativeTime) {
    return Math.round(addDuration(getNavigationStart(), relativeTime));
}
export function looksLikeRelativeTime(time) {
    return time < ONE_YEAR;
}
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
export function resetNavigationStart() {
    navigationStart = undefined;
}
//# sourceMappingURL=timeUtils.js.map