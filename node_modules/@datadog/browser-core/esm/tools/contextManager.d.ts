import type { Context } from './context';
export declare function createContextManager(): {
    /** @deprecated use getContext instead */
    get: () => Context;
    /** @deprecated use setContextProperty instead */
    add: (key: string, value: any) => void;
    /** @deprecated renamed to removeContextProperty */
    remove: (key: string) => void;
    /** @deprecated use setContext instead */
    set: (newContext: object) => void;
    getContext: () => Context;
    setContext: (newContext: Context) => void;
    setContextProperty: (key: string, property: any) => void;
    removeContextProperty: (key: string) => void;
    clearContext: () => void;
};
