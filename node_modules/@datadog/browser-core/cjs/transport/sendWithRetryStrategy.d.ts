import type { EndpointType } from '../domain/configuration';
import type { RawError } from '../tools/error';
import type { Payload, HttpResponse } from './httpRequest';
export declare const MAX_ONGOING_BYTES_COUNT: number;
export declare const MAX_ONGOING_REQUESTS = 32;
export declare const MAX_QUEUE_BYTES_COUNT: number;
export declare const MAX_BACKOFF_TIME: number;
export declare const INITIAL_BACKOFF_TIME = 1000;
declare const enum TransportStatus {
    UP = 0,
    FAILURE_DETECTED = 1,
    DOWN = 2
}
export interface RetryState {
    transportStatus: TransportStatus;
    currentBackoffTime: number;
    bandwidthMonitor: ReturnType<typeof newBandwidthMonitor>;
    queuedPayloads: ReturnType<typeof newPayloadQueue>;
    queueFullReported: boolean;
}
declare type SendStrategy = (payload: Payload, onResponse: (r: HttpResponse) => void) => void;
export declare function sendWithRetryStrategy(payload: Payload, state: RetryState, sendStrategy: SendStrategy, endpointType: EndpointType, reportError: (error: RawError) => void): void;
export declare function newRetryState(): RetryState;
declare function newPayloadQueue(): {
    bytesCount: number;
    enqueue(payload: Payload): void;
    first(): Payload;
    dequeue(): Payload | undefined;
    size(): number;
    isFull(): boolean;
};
declare function newBandwidthMonitor(): {
    ongoingRequestCount: number;
    ongoingByteCount: number;
    canHandle(payload: Payload): boolean;
    add(payload: Payload): void;
    remove(payload: Payload): void;
};
export {};
