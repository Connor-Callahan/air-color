import { endsWith, getGlobalObject } from '../tools/utils';
export function getEventBridge() {
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
export function canUseEventBridge(currentHost) {
    var _a;
    if (currentHost === void 0) { currentHost = (_a = getGlobalObject().location) === null || _a === void 0 ? void 0 : _a.hostname; }
    var bridge = getEventBridge();
    return (!!bridge &&
        bridge
            .getAllowedWebViewHosts()
            .some(function (allowedHost) { return currentHost === allowedHost || endsWith(currentHost, ".".concat(allowedHost)); }));
}
function getEventBridgeGlobal() {
    return getGlobalObject().DatadogEventBridge;
}
//# sourceMappingURL=eventBridge.js.map