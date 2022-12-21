import { noop } from '@datadog/browser-core';
import type { LogsConfiguration } from '../../configuration';
import type { LifeCycle } from '../../lifeCycle';
export declare function startNetworkErrorCollection(configuration: LogsConfiguration, lifeCycle: LifeCycle): {
    stop: typeof noop;
};
export declare function computeXhrResponseData(xhr: XMLHttpRequest, configuration: LogsConfiguration, callback: (responseData: unknown) => void): void;
export declare function computeFetchErrorText(error: Error, configuration: LogsConfiguration, callback: (errorText: string) => void): void;
export declare function computeFetchResponseText(response: Response, configuration: LogsConfiguration, callback: (responseText?: string) => void): void;
