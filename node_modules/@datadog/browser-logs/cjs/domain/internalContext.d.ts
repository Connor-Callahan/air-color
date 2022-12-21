import type { LogsSessionManager } from './logsSessionManager';
export interface InternalContext {
    session_id: string | undefined;
}
export declare function startInternalContext(sessionManager: LogsSessionManager): {
    get: (startTime?: number | undefined) => InternalContext | undefined;
};
