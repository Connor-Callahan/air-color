"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChromium = exports.isIE = void 0;
function isIE() {
    return Boolean(document.documentMode);
}
exports.isIE = isIE;
function isChromium() {
    return !!window.chrome || /HeadlessChrome/.test(window.navigator.userAgent);
}
exports.isChromium = isChromium;
//# sourceMappingURL=browserDetection.js.map