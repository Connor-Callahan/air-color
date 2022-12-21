import { getEventBridge } from '@datadog/browser-core';
export function startLogsBridge(lifeCycle) {
    var bridge = getEventBridge();
    lifeCycle.subscribe(1 /* LOG_COLLECTED */, function (serverLogsEvent) {
        bridge.send('log', serverLogsEvent);
    });
}
//# sourceMappingURL=startLogsBridge.js.map