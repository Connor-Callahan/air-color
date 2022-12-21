export declare function makePublicApi<T>(stub: T): T & {
    onReady(callback: () => void): void;
    version: string;
};
export declare function defineGlobal<Global, Name extends keyof Global>(global: Global, name: Name, api: Global[Name]): void;
