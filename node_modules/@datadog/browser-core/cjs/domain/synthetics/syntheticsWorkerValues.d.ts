export declare const SYNTHETICS_TEST_ID_COOKIE_NAME = "datadog-synthetics-public-id";
export declare const SYNTHETICS_RESULT_ID_COOKIE_NAME = "datadog-synthetics-result-id";
export declare const SYNTHETICS_INJECTS_RUM_COOKIE_NAME = "datadog-synthetics-injects-rum";
export interface BrowserWindow extends Window {
    _DATADOG_SYNTHETICS_PUBLIC_ID?: unknown;
    _DATADOG_SYNTHETICS_RESULT_ID?: unknown;
    _DATADOG_SYNTHETICS_INJECTS_RUM?: unknown;
}
export declare function willSyntheticsInjectRum(): boolean;
export declare function getSyntheticsTestId(): string | undefined;
export declare function getSyntheticsResultId(): string | undefined;
