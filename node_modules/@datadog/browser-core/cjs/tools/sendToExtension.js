"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToExtension = void 0;
function sendToExtension(type, payload) {
    var callback = window.__ddBrowserSdkExtensionCallback;
    if (callback) {
        callback({ type: type, payload: payload });
    }
}
exports.sendToExtension = sendToExtension;
//# sourceMappingURL=sendToExtension.js.map