import { ConsoleApiName } from './display';
export declare function startMonitorErrorCollection(newOnMonitorErrorCollected: (error: unknown) => void): void;
export declare function setDebugMode(newDebugMode: boolean): void;
export declare function resetMonitor(): void;
export declare function monitored<T extends (...params: any[]) => unknown>(_: any, __: string, descriptor: TypedPropertyDescriptor<T>): void;
export declare function monitor<T extends (...args: any[]) => any>(fn: T): T;
export declare function callMonitored<T extends (...args: any[]) => any>(fn: T, context: ThisParameterType<T>, args: Parameters<T>): ReturnType<T> | undefined;
export declare function callMonitored<T extends (this: void) => any>(fn: T): ReturnType<T> | undefined;
export declare function displayIfDebugEnabled(api: ConsoleApiName, ...args: any[]): void;
