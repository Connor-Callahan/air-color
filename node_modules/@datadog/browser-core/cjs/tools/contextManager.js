"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContextManager = void 0;
var utils_1 = require("./utils");
function createContextManager() {
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
        getContext: function () { return (0, utils_1.deepClone)(context); },
        setContext: function (newContext) {
            context = (0, utils_1.deepClone)(newContext);
        },
        setContextProperty: function (key, property) {
            context[key] = (0, utils_1.deepClone)(property);
        },
        removeContextProperty: function (key) {
            delete context[key];
        },
        clearContext: function () {
            context = {};
        },
    };
}
exports.createContextManager = createContextManager;
//# sourceMappingURL=contextManager.js.map