export function isIE() {
    return Boolean(document.documentMode);
}
export function isChromium() {
    return !!window.chrome || /HeadlessChrome/.test(window.navigator.userAgent);
}
//# sourceMappingURL=browserDetection.js.map