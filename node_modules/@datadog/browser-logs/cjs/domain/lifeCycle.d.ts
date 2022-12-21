import type { Context, Subscription } from '@datadog/browser-core';
import type { LogsEvent } from '../logsEvent.types';
import type { CommonContext, RawLogsEvent } from '../rawLogsEvent.types';
import type { Logger } from './logger';
export declare const enum LifeCycleEventType {
    RAW_LOG_COLLECTED = 0,
    LOG_COLLECTED = 1
}
export declare class LifeCycle {
    private callbacks;
    notify<E extends RawLogsEvent = RawLogsEvent>(eventType: LifeCycleEventType.RAW_LOG_COLLECTED, data: RawLogsEventCollectedData<E>): void;
    notify(eventType: LifeCycleEventType.LOG_COLLECTED, data: LogsEvent & Context): void;
    subscribe(eventType: LifeCycleEventType.RAW_LOG_COLLECTED, callback: (data: RawLogsEventCollectedData) => void): Subscription;
    subscribe(eventType: LifeCycleEventType.LOG_COLLECTED, callback: (data: LogsEvent & Context) => void): Subscription;
}
export interface RawLogsEventCollectedData<E extends RawLogsEvent = RawLogsEvent> {
    rawLogsEvent: E;
    messageContext?: object;
    savedCommonContext?: CommonContext;
    logger?: Logger;
}
