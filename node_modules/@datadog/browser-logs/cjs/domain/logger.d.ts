import type { Context } from '@datadog/browser-core';
export interface LogsMessage {
    message: string;
    status: StatusType;
    context?: Context;
}
export declare const StatusType: {
    readonly debug: "debug";
    readonly error: "error";
    readonly info: "info";
    readonly warn: "warn";
};
export declare type StatusType = typeof StatusType[keyof typeof StatusType];
export declare const HandlerType: {
    readonly console: "console";
    readonly http: "http";
    readonly silent: "silent";
};
export declare type HandlerType = typeof HandlerType[keyof typeof HandlerType];
export declare const STATUSES: StatusType[];
export declare class Logger {
    private handleLogStrategy;
    private handlerType;
    private level;
    private contextManager;
    constructor(handleLogStrategy: (logsMessage: LogsMessage, logger: Logger) => void, name?: string, handlerType?: HandlerType | HandlerType[], level?: StatusType, loggerContext?: object);
    log(message: string, messageContext?: object, status?: StatusType): void;
    debug(message: string, messageContext?: object): void;
    info(message: string, messageContext?: object): void;
    warn(message: string, messageContext?: object): void;
    error(message: string, messageContext?: object): void;
    setContext(context: object): void;
    getContext(): Context;
    addContext(key: string, value: any): void;
    removeContext(key: string): void;
    setHandler(handler: HandlerType | HandlerType[]): void;
    getHandler(): HandlerType | HandlerType[];
    setLevel(level: StatusType): void;
    getLevel(): StatusType;
}
