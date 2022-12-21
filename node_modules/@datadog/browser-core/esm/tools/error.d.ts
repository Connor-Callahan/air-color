import type { StackTrace } from '../domain/tracekit';
import type { ClocksState } from './timeUtils';
export interface ErrorWithCause extends Error {
    cause?: Error;
}
export declare type RawErrorCause = {
    message: string;
    source: string;
    type?: string;
    stack?: string;
};
export interface RawError {
    startClocks: ClocksState;
    message: string;
    type?: string;
    stack?: string;
    source: ErrorSource;
    originalError?: unknown;
    handling?: ErrorHandling;
    handlingStack?: string;
    causes?: RawErrorCause[];
}
export declare const ErrorSource: {
    readonly AGENT: "agent";
    readonly CONSOLE: "console";
    readonly CUSTOM: "custom";
    readonly LOGGER: "logger";
    readonly NETWORK: "network";
    readonly SOURCE: "source";
    readonly REPORT: "report";
};
export declare const enum ErrorHandling {
    HANDLED = "handled",
    UNHANDLED = "unhandled"
}
export declare type ErrorSource = typeof ErrorSource[keyof typeof ErrorSource];
declare type RawErrorParams = {
    stackTrace?: StackTrace;
    originalError: unknown;
    handlingStack?: string;
    startClocks: ClocksState;
    nonErrorPrefix: string;
    source: ErrorSource;
    handling: ErrorHandling;
};
export declare function computeRawError({ stackTrace, originalError, handlingStack, startClocks, nonErrorPrefix, source, handling, }: RawErrorParams): RawError;
export declare function toStackTraceString(stack: StackTrace): string;
export declare function getFileFromStackTraceString(stack: string): string | undefined;
export declare function formatErrorMessage(stack: StackTrace): string;
/**
 Creates a stacktrace without SDK internal frames.
 
 Constraints:
 - Has to be called at the utmost position of the call stack.
 - No monitored function should encapsulate it, that is why we need to use callMonitored inside it.
 */
export declare function createHandlingStack(): string;
export declare function flattenErrorCauses(error: ErrorWithCause, parentSource: ErrorSource): RawErrorCause[] | undefined;
export {};
