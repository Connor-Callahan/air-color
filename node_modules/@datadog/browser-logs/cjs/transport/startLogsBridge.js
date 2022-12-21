"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogsBridge = void 0;
var browser_core_1 = require("@datadog/browser-core");
function startLogsBridge(lifeCycle) {
    var bridge = (0, browser_core_1.getEventBridge)();
    lifeCycle.subscribe(1 /* LOG_COLLECTED */, function (serverLogsEvent) {
        bridge.send('log', serverLogsEvent);
    });
}
exports.startLogsBridge = startLogsBridge;
//# sourceMappingURL=startLogsBridge.js.map