import { deepClone } from './utils';
export function createContextManager() {
    var context = {};
    return {
        /** @deprecated use getContext instead */
        get: function () { return context; },
        /** @deprecated use setContextProperty instead */
        add: function (key, value) {
            context[key] = value;
        },
        /** @deprecated renamed to removeContextProperty */
        remove: function (key) {
            delete context[key];
        },
        /** @deprecated use setContext instead */
        set: function (newContext) {
            context = newContext;
        },
        getContext: function () { return deepClone(context); },
        setContext: function (newContext) {
            context = deepClone(newContext);
        },
        setContextProperty: function (key, property) {
            context[key] = deepClone(property);
        },
        removeContextProperty: function (key) {
            delete context[key];
        },
        clearContext: function () {
            context = {};
        },
    };
}
//# sourceMappingURL=contextManager.js.map