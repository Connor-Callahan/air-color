export { Logger, LogsMessage, StatusType, HandlerType } from '../domain/logger';
export { LoggerConfiguration, LogsPublicApi as LogsGlobal } from '../boot/logsPublicApi';
export { LogsInitConfiguration } from '../domain/configuration';
export { LogsEvent } from '../logsEvent.types';
export declare const datadogLogs: {
    logger: import("../domain/logger").Logger;
    init: (initConfiguration: import("../domain/configuration").LogsInitConfiguration) => void;
    getLoggerGlobalContext: () => import("@datadog/browser-core").Context;
    getGlobalContext: () => import("@datadog/browser-core").Context;
    setLoggerGlobalContext: (newContext: object) => void;
    setGlobalContext: (newContext: import("@datadog/browser-core").Context) => void;
    addLoggerGlobalContext: (key: string, value: any) => void;
    setGlobalContextProperty: (key: string, property: any) => void;
    removeLoggerGlobalContext: (key: string) => void;
    removeGlobalContextProperty: (key: string) => void;
    clearGlobalContext: () => void;
    createLogger: (name: string, conf?: import("../boot/logsPublicApi").LoggerConfiguration) => import("../domain/logger").Logger;
    getLogger: (name: string) => import("../domain/logger").Logger | undefined;
    getInitConfiguration: () => import("@datadog/browser-core").InitConfiguration | undefined;
    getInternalContext: (startTime?: number | undefined) => import("../domain/internalContext").InternalContext | undefined;
    setUser: (newUser: import("@datadog/browser-core").User) => void;
    getUser: () => import("@datadog/browser-core").Context;
    setUserProperty: (key: any, property: any) => void;
    removeUserProperty: (key: string) => void;
    clearUser: () => void;
} & {
    onReady(callback: () => void): void;
    version: string;
};
