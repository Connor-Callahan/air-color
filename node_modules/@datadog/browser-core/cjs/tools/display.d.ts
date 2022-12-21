/**
 * Keep references on console methods to avoid triggering patched behaviors
 *
 * NB: in some setup, console could already be patched by another SDK.
 * In this case, some display messages can be sent by the other SDK
 * but we should be safe from infinite loop nonetheless.
 */
export declare const ConsoleApiName: {
    readonly log: "log";
    readonly debug: "debug";
    readonly info: "info";
    readonly warn: "warn";
    readonly error: "error";
};
export declare type ConsoleApiName = typeof ConsoleApiName[keyof typeof ConsoleApiName];
interface Display {
    (api: ConsoleApiName, ...args: any[]): void;
    debug: typeof console.debug;
    log: typeof console.log;
    info: typeof console.info;
    warn: typeof console.warn;
    error: typeof console.error;
}
export declare const display: Display;
export {};
