export function sendToExtension(type, payload) {
    var callback = window.__ddBrowserSdkExtensionCallback;
    if (callback) {
        callback({ type: type, payload: payload });
    }
}
//# sourceMappingURL=sendToExtension.js.map