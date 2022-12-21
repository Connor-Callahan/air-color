import type { RawError } from '../../tools/error';
import type { Observable } from '../../tools/observable';
export declare function trackRuntimeError(errorObservable: Observable<RawError>): {
    stop: () => void;
};
