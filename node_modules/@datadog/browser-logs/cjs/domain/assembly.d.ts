import type { Context, RawError, RelativeTime } from '@datadog/browser-core';
import type { CommonContext } from '../rawLogsEvent.types';
import type { LogsConfiguration } from './configuration';
import type { LifeCycle } from './lifeCycle';
import type { Logger } from './logger';
import type { LogsSessionManager } from './logsSessionManager';
export declare function startLogsAssembly(sessionManager: LogsSessionManager, configuration: LogsConfiguration, lifeCycle: LifeCycle, getCommonContext: () => CommonContext, mainLogger: Logger, // Todo: [RUMF-1230] Remove this parameter in the next major release
reportError: (error: RawError) => void): void;
export declare function getRUMInternalContext(startTime?: RelativeTime): Context | undefined;
export declare function resetRUMInternalContext(): void;
