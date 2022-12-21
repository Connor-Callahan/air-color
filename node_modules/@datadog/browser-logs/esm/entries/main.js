import { defineGlobal, getGlobalObject } from '@datadog/browser-core';
import { makeLogsPublicApi } from '../boot/logsPublicApi';
import { startLogs } from '../boot/startLogs';
export { Logger, StatusType, HandlerType } from '../domain/logger';
export var datadogLogs = makeLogsPublicApi(startLogs);
defineGlobal(getGlobalObject(), 'DD_LOGS', datadogLogs);
//# sourceMappingURL=main.js.map