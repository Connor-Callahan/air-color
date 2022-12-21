import type { CookieOptions } from '../../browser/cookie';
import { Observable } from '../../tools/observable';
export interface SessionStore {
    expandOrRenewSession: () => void;
    expandSession: () => void;
    getSession: () => SessionState;
    renewObservable: Observable<void>;
    expireObservable: Observable<void>;
    stop: () => void;
}
export interface SessionState {
    id?: string;
    created?: string;
    expire?: string;
    lock?: string;
    [key: string]: string | undefined;
}
/**
 * Different session concepts:
 * - tracked, the session has an id and is updated along the user navigation
 * - not tracked, the session does not have an id but it is updated along the user navigation
 * - inactive, no session in store or session expired, waiting for a renew session
 */
export declare function startSessionStore<TrackingType extends string>(options: CookieOptions, productKey: string, computeSessionState: (rawTrackingType?: string) => {
    trackingType: TrackingType;
    isTracked: boolean;
}): SessionStore;
