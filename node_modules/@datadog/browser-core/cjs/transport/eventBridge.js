"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseEventBridge = exports.getEventBridge = void 0;
var utils_1 = require("../tools/utils");
function getEventBridge() {
    var eventBridgeGlobal = getEventBridgeGlobal();
    if (!eventBridgeGlobal) {
        return;
    }
    return {
        getAllowedWebViewHosts: function () {
            return JSON.parse(eventBridgeGlobal.getAllowedWebViewHosts());
        },
        send: function (eventType, event) {
            eventBridgeGlobal.send(JSON.stringify({ eventType: eventType, event: event }));
        },
    };
}
exports.getEventBridge = getEventBridge;
function canUseEventBridge(currentHost) {
    var _a;
    if (currentHost === void 0) { currentHost = (_a = (0, utils_1.getGlobalObject)().location) === null || _a === void 0 ? void 0 : _a.hostname; }
    var bridge = getEventBridge();
    return (!!bridge &&
        bridge
            .getAllowedWebViewHosts()
            .some(function (allowedHost) { return currentHost === allowedHost || (0, utils_1.endsWith)(currentHost, ".".concat(allowedHost)); }));
}
exports.canUseEventBridge = canUseEventBridge;
function getEventBridgeGlobal() {
    return (0, utils_1.getGlobalObject)().DatadogEventBridge;
}
//# sourceMappingURL=eventBridge.js.map