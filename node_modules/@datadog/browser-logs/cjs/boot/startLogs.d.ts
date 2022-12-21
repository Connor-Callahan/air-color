import type { LogsConfiguration, LogsInitConfiguration } from '../domain/configuration';
import type { CommonContext } from '../rawLogsEvent.types';
import type { Logger } from '../domain/logger';
export declare function startLogs(initConfiguration: LogsInitConfiguration, configuration: LogsConfiguration, getCommonContext: () => CommonContext, mainLogger: Logger): {
    handleLog: (logsMessage: import("../domain/logger").LogsMessage, logger: Logger, savedCommonContext?: CommonContext | undefined, savedDate?: import("@datadog/browser-core").TimeStamp | undefined) => void;
    getInternalContext: (startTime?: number | undefined) => import("../domain/internalContext").InternalContext | undefined;
};
