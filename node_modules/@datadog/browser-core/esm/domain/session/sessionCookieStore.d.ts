import type { CookieOptions } from '../../browser/cookie';
import type { SessionState } from './sessionStore';
export declare const SESSION_COOKIE_NAME = "_dd_s";
export declare const LOCK_RETRY_DELAY = 10;
export declare const MAX_NUMBER_OF_LOCK_RETRIES = 100;
declare type Operations = {
    options: CookieOptions;
    process: (cookieSession: SessionState) => SessionState | undefined;
    after?: (cookieSession: SessionState) => void;
};
export declare function withCookieLockAccess(operations: Operations, numberOfRetries?: number): void;
export declare function persistSession(session: SessionState, options: CookieOptions): void;
export declare function toSessionString(session: SessionState): string;
export declare function retrieveSession(): SessionState;
export {};
