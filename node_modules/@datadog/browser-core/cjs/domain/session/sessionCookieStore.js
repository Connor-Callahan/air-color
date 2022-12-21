"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveSession = exports.toSessionString = exports.persistSession = exports.withCookieLockAccess = exports.MAX_NUMBER_OF_LOCK_RETRIES = exports.LOCK_RETRY_DELAY = exports.SESSION_COOKIE_NAME = void 0;
var cookie_1 = require("../../browser/cookie");
var browserDetection_1 = require("../../tools/browserDetection");
var monitor_1 = require("../../tools/monitor");
var timeUtils_1 = require("../../tools/timeUtils");
var utils = __importStar(require("../../tools/utils"));
var sessionConstants_1 = require("./sessionConstants");
var SESSION_ENTRY_REGEXP = /^([a-z]+)=([a-z0-9-]+)$/;
var SESSION_ENTRY_SEPARATOR = '&';
exports.SESSION_COOKIE_NAME = '_dd_s';
// arbitrary values
exports.LOCK_RETRY_DELAY = 10;
exports.MAX_NUMBER_OF_LOCK_RETRIES = 100;
var bufferedOperations = [];
var ongoingOperations;
function withCookieLockAccess(operations, numberOfRetries) {
    var _a;
    if (numberOfRetries === void 0) { numberOfRetries = 0; }
    if (!ongoingOperations) {
        ongoingOperations = operations;
    }
    if (operations !== ongoingOperations) {
        bufferedOperations.push(operations);
        return;
    }
    if (numberOfRetries >= exports.MAX_NUMBER_OF_LOCK_RETRIES) {
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
exports.withCookieLockAccess = withCookieLockAccess;
/**
 * Cookie lock strategy allows mitigating issues due to concurrent access to cookie.
 * This issue concerns only chromium browsers and enabling this on firefox increase cookie write failures.
 */
function isCookieLockEnabled() {
    return (0, browserDetection_1.isChromium)();
}
function retryLater(operations, currentNumberOfRetries) {
    setTimeout((0, monitor_1.monitor)(function () {
        withCookieLockAccess(operations, currentNumberOfRetries + 1);
    }), exports.LOCK_RETRY_DELAY);
}
function next() {
    ongoingOperations = undefined;
    var nextOperations = bufferedOperations.shift();
    if (nextOperations) {
        withCookieLockAccess(nextOperations);
    }
}
function persistSession(session, options) {
    if (isExpiredState(session)) {
        clearSession(options);
        return;
    }
    session.expire = String((0, timeUtils_1.dateNow)() + sessionConstants_1.SESSION_EXPIRATION_DELAY);
    setSession(session, options);
}
exports.persistSession = persistSession;
function setSession(session, options) {
    (0, cookie_1.setCookie)(exports.SESSION_COOKIE_NAME, toSessionString(session), sessionConstants_1.SESSION_EXPIRATION_DELAY, options);
}
function toSessionString(session) {
    return utils
        .objectEntries(session)
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        return "".concat(key, "=").concat(value);
    })
        .join(SESSION_ENTRY_SEPARATOR);
}
exports.toSessionString = toSessionString;
function retrieveSession() {
    var sessionString = (0, cookie_1.getCookie)(exports.SESSION_COOKIE_NAME);
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
exports.retrieveSession = retrieveSession;
function isValidSessionString(sessionString) {
    return (sessionString !== undefined &&
        (sessionString.indexOf(SESSION_ENTRY_SEPARATOR) !== -1 || SESSION_ENTRY_REGEXP.test(sessionString)));
}
function isExpiredState(session) {
    return utils.isEmptyObject(session);
}
function clearSession(options) {
    (0, cookie_1.setCookie)(exports.SESSION_COOKIE_NAME, '', 0, options);
}
//# sourceMappingURL=sessionCookieStore.js.map