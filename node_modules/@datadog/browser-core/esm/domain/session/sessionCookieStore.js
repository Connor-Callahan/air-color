import { getCookie, setCookie } from '../../browser/cookie';
import { isChromium } from '../../tools/browserDetection';
import { monitor } from '../../tools/monitor';
import { dateNow } from '../../tools/timeUtils';
import * as utils from '../../tools/utils';
import { SESSION_EXPIRATION_DELAY } from './sessionConstants';
var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
var SESSION_ENTRY_SEPARATOR = '&';
export var SESSION_COOKIE_NAME = '_dd_s';
// arbitrary values
export var LOCK_RETRY_DELAY = 10;
export var MAX_NUMBER_OF_LOCK_RETRIES = 100;
var bufferedOperations = [];
var ongoingOperations;
export function withCookieLockAccess(operations, numberOfRetries) {
    var _a;
    if (numberOfRetries === void 0) { numberOfRetries = 0; }
    if (!ongoingOperations) {
        ongoingOperations = operations;
    }
    if (operations !== ongoingOperations) {
        bufferedOperations.push(operations);
        return;
    }
    if (numberOfRetries >= MAX_NUMBER_OF_LOCK_RETRIES) {
        next();
        return;
    }
    var currentLock;
    var currentSession = retrieveSession();
    if (isCookieLockEnabled()) {
        // if someone has lock, retry later
        if (currentSession.lock) {
            retryLater(operations, numberOfRetries);
            return;
        }
        // acquire lock
        currentLock = utils.generateUUID();
        currentSession.lock = currentLock;
        setSession(currentSession, operations.options);
        // if lock is not acquired, retry later
        currentSession = retrieveSession();
        if (currentSession.lock !== currentLock) {
            retryLater(operations, numberOfRetries);
            return;
        }
    }
    var processedSession = operations.process(currentSession);
    if (isCookieLockEnabled()) {
        // if lock corrupted after process, retry later
        currentSession = retrieveSession();
        if (currentSession.lock !== currentLock) {
            retryLater(operations, numberOfRetries);
            return;
        }
    }
    if (processedSession) {
        persistSession(processedSession, operations.options);
    }
    if (isCookieLockEnabled()) {
        // correctly handle lock around expiration would require to handle this case properly at several levels
        // since we don't have evidence of lock issues around expiration, let's just not do the corruption check for it
        if (!(processedSession && isExpiredState(processedSession))) {
            // if lock corrupted after persist, retry later
            currentSession = retrieveSession();
            if (currentSession.lock !== currentLock) {
                retryLater(operations, numberOfRetries);
                return;
            }
            delete currentSession.lock;
            setSession(currentSession, operations.options);
            processedSession = currentSession;
        }
    }
    // call after even if session is not persisted in order to perform operations on
    // up-to-date cookie value, the value could have been modified by another tab
    (_a = operations.after) === null || _a === void 0 ? void 0 : _a.call(operations, processedSession || currentSession);
    next();
}
/**
 * Cookie lock strategy allows mitigating issues due to concurrent access to cookie.
 * This issue concerns only chromium browsers and enabling this on firefox increase cookie write failures.
 */
function isCookieLockEnabled() {
    return isChromium();
}
function retryLater(operations, currentNumberOfRetries) {
    setTimeout(monitor(function () {
        withCookieLockAccess(operations, currentNumberOfRetries + 1);
    }), LOCK_RETRY_DELAY);
}
function next() {
    ongoingOperations = undefined;
    var nextOperations = bufferedOperations.shift();
    if (nextOperations) {
        withCookieLockAccess(nextOperations);
    }
}
export function persistSession(session, options) {
    if (isExpiredState(session)) {
        clearSession(options);
        return;
    }
    session.expire = String(dateNow() + SESSION_EXPIRATION_DELAY);
    setSession(session, options);
}
function setSession(session, options) {
    setCookie(SESSION_COOKIE_NAME, toSessionString(session), SESSION_EXPIRATION_DELAY, options);
}
export function toSessionString(session) {
    return utils
        .objectEntries(session)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(value);
    })
        .join(SESSION_ENTRY_SEPARATOR);
}
export function retrieveSession() {
    var sessionString = getCookie(SESSION_COOKIE_NAME);
    var session = {};
    if (isValidSessionString(sessionString)) {
        sessionString.split(SESSION_ENTRY_SEPARATOR).forEach(function (entry) {
            var matches = SESSION_ENTRY_REGEXP.exec(entry);
            if (matches !== null) {
                var key = matches[1], value = matches[2];
                session[key] = value;
            }
        });
    }
    return session;
}
function isValidSessionString(sessionString) {
    return (sessionString !== undefined &&
        (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString)));
}
function isExpiredState(session) {
    return utils.isEmptyObject(session);
}
function clearSession(options) {
    setCookie(SESSION_COOKIE_NAME, '', 0, options);
}
//# sourceMappingURL=sessionCookieStore.js.map