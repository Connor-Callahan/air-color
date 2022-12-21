import type { Context, ClocksState } from '@datadog/browser-core';
import { noop } from '@datadog/browser-core';
import type { LogsConfiguration } from '../../configuration';
import type { LifeCycle } from '../../lifeCycle';
export interface ProvidedError {
    startClocks: ClocksState;
    error: unknown;
    context?: Context;
    handlingStack: string;
}
export declare function startRuntimeErrorCollection(configuration: LogsConfiguration, lifeCycle: LifeCycle): {
    stop: typeof noop;
};
