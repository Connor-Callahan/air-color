import type { Context, ClocksState } from '@datadog/browser-core';
import type { LogsConfiguration } from '../../configuration';
import type { LifeCycle } from '../../lifeCycle';
export interface ProvidedError {
    startClocks: ClocksState;
    error: unknown;
    context?: Context;
    handlingStack: string;
}
export declare function startReportCollection(configuration: LogsConfiguration, lifeCycle: LifeCycle): {
    stop: () => void;
};
