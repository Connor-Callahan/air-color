import { noop } from './utils';
export declare function instrumentMethod<OBJECT extends {
    [key: string]: any;
}, METHOD extends keyof OBJECT>(object: OBJECT, method: METHOD, instrumentationFactory: (original: OBJECT[METHOD]) => (this: OBJECT, ...args: Parameters<OBJECT[METHOD]>) => ReturnType<OBJECT[METHOD]>): {
    stop: () => void;
};
export declare function instrumentMethodAndCallOriginal<OBJECT extends {
    [key: string]: any;
}, METHOD extends keyof OBJECT>(object: OBJECT, method: METHOD, { before, after, }: {
    before?: (this: OBJECT, ...args: Parameters<OBJECT[METHOD]>) => void;
    after?: (this: OBJECT, ...args: Parameters<OBJECT[METHOD]>) => void;
}): {
    stop: () => void;
};
export declare function instrumentSetter<OBJECT extends {
    [key: string]: any;
}, PROPERTY extends keyof OBJECT>(object: OBJECT, property: PROPERTY, after: (thisObject: OBJECT, value: OBJECT[PROPERTY]) => void): {
    stop: typeof noop;
};
