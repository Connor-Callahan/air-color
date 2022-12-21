import type { Configuration, InitConfiguration, RawTelemetryConfiguration } from '@datadog/browser-core';
import { ConsoleApiName, RawReportType } from '@datadog/browser-core';
import type { LogsEvent } from '../logsEvent.types';
export interface LogsInitConfiguration extends InitConfiguration {
    beforeSend?: ((event: LogsEvent) => void | boolean) | undefined;
    forwardErrorsToLogs?: boolean | undefined;
    forwardConsoleLogs?: ConsoleApiName[] | 'all' | undefined;
    forwardReports?: RawReportType[] | 'all' | undefined;
}
export declare type HybridInitConfiguration = Omit<LogsInitConfiguration, 'clientToken'>;
export interface LogsConfiguration extends Configuration {
    forwardErrorsToLogs: boolean;
    forwardConsoleLogs: ConsoleApiName[];
    forwardReports: RawReportType[];
    requestErrorResponseLengthLimit: number;
}
/**
 * arbitrary value, byte precision not needed
 */
export declare const DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT: number;
export declare function validateAndBuildLogsConfiguration(initConfiguration: LogsInitConfiguration): LogsConfiguration | undefined;
export declare function validateAndBuildForwardOption<T>(option: readonly T[] | 'all' | undefined, allowedValues: T[], label: string): T[] | undefined;
export declare function serializeLogsConfiguration(configuration: LogsInitConfiguration): RawTelemetryConfiguration;
