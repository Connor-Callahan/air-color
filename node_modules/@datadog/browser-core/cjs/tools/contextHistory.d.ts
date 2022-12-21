import type { RelativeTime } from './timeUtils';
export interface ContextHistoryEntry<T> {
    startTime: RelativeTime;
    endTime: RelativeTime;
    context: T;
    remove(): void;
    close(endTime: RelativeTime): void;
}
export declare const CLEAR_OLD_CONTEXTS_INTERVAL: number;
/**
 * Store and keep track of contexts spans. This whole class assumes that contexts are added in
 * chronological order (i.e. all entries have an increasing start time).
 */
export declare class ContextHistory<Context> {
    private expireDelay;
    private entries;
    private clearOldContextsInterval;
    constructor(expireDelay: number);
    /**
     * Add a context to the history associated with a start time. Returns a reference to this newly
     * added entry that can be removed or closed.
     */
    add(context: Context, startTime: RelativeTime): ContextHistoryEntry<Context>;
    /**
     * Return the latest context that was active during `startTime`, or the currently active context
     * if no `startTime` is provided. This method assumes that entries are not overlapping.
     */
    find(startTime?: RelativeTime): Context | undefined;
    /**
     * Helper function to close the currently active context, if any. This method assumes that entries
     * are not overlapping.
     */
    closeActive(endTime: RelativeTime): void;
    /**
     * Return all contexts that were active during `startTime`, or all currently active contexts if no
     * `startTime` is provided.
     */
    findAll(startTime?: RelativeTime): Context[];
    /**
     * Remove all entries from this collection.
     */
    reset(): void;
    /**
     * Stop internal garbage collection of past entries.
     */
    stop(): void;
    private clearOldContexts;
}
