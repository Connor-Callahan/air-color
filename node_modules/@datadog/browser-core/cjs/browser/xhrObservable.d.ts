import { Observable } from '../tools/observable';
import type { Duration, RelativeTime, ClocksState } from '../tools/timeUtils';
export interface XhrOpenContext {
    state: 'open';
    method: string;
    url: string;
}
export interface XhrStartContext extends Omit<XhrOpenContext, 'state'> {
    state: 'start';
    startTime: RelativeTime;
    startClocks: ClocksState;
    isAborted: boolean;
    xhr: XMLHttpRequest;
}
export interface XhrCompleteContext extends Omit<XhrStartContext, 'state'> {
    state: 'complete';
    duration: Duration;
    status: number;
}
export declare type XhrContext = XhrOpenContext | XhrStartContext | XhrCompleteContext;
export declare function initXhrObservable(): Observable<XhrContext>;
