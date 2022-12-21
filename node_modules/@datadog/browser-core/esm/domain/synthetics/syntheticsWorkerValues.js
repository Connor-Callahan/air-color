import { getCookie } from '../../browser/cookie';
export var SYNTHETICS_TEST_ID_COOKIE_NAME = 'datadog-synthetics-public-id';
export var SYNTHETICS_RESULT_ID_COOKIE_NAME = 'datadog-synthetics-result-id';
export var SYNTHETICS_INJECTS_RUM_COOKIE_NAME = 'datadog-synthetics-injects-rum';
export function willSyntheticsInjectRum() {
    return Boolean(window._DATADOG_SYNTHETICS_INJECTS_RUM || getCookie(SYNTHETICS_INJECTS_RUM_COOKIE_NAME));
}
export function getSyntheticsTestId() {
    var value = window._DATADOG_SYNTHETICS_PUBLIC_ID || getCookie(SYNTHETICS_TEST_ID_COOKIE_NAME);
    return typeof value === 'string' ? value : undefined;
}
export function getSyntheticsResultId() {
    var value = window._DATADOG_SYNTHETICS_RESULT_ID || getCookie(SYNTHETICS_RESULT_ID_COOKIE_NAME);
    return typeof value === 'string' ? value : undefined;
}
//# sourceMappingURL=syntheticsWorkerValues.js.map