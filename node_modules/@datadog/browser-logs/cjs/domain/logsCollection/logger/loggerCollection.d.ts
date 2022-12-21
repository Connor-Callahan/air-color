import type { TimeStamp } from '@datadog/browser-core';
import type { CommonContext } from '../../../rawLogsEvent.types';
import type { LifeCycle } from '../../lifeCycle';
import type { Logger, LogsMessage } from '../../logger';
import { StatusType, HandlerType } from '../../logger';
export declare const STATUS_PRIORITIES: {
    [key in StatusType]: number;
};
export declare function startLoggerCollection(lifeCycle: LifeCycle): {
    handleLog: (logsMessage: LogsMessage, logger: Logger, savedCommonContext?: CommonContext | undefined, savedDate?: TimeStamp | undefined) => void;
};
export declare function isAuthorized(status: StatusType, handlerType: HandlerType, logger: Logger): boolean;
