import { serializeConfiguration, assign, ONE_KIBI_BYTE, validateAndBuildConfiguration, display, removeDuplicates, ConsoleApiName, RawReportType, includes, objectValues, } from '@datadog/browser-core';
/**
 * arbitrary value, byte precision not needed
 */
export var DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT = 32 * ONE_KIBI_BYTE;
export function validateAndBuildLogsConfiguration(initConfiguration) {
    var baseConfiguration = validateAndBuildConfiguration(initConfiguration);
    var forwardConsoleLogs = validateAndBuildForwardOption(initConfiguration.forwardConsoleLogs, objectValues(ConsoleApiName), 'Forward Console Logs');
    var forwardReports = validateAndBuildForwardOption(initConfiguration.forwardReports, objectValues(RawReportType), 'Forward Reports');
    if (!baseConfiguration || !forwardConsoleLogs || !forwardReports) {
        return;
    }
    if (initConfiguration.forwardErrorsToLogs && !includes(forwardConsoleLogs, ConsoleApiName.error)) {
        forwardConsoleLogs.push(ConsoleApiName.error);
    }
    return assign({
        forwardErrorsToLogs: initConfiguration.forwardErrorsToLogs !== false,
        forwardConsoleLogs: forwardConsoleLogs,
        forwardReports: forwardReports,
        requestErrorResponseLengthLimit: DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT,
    }, baseConfiguration);
}
export function validateAndBuildForwardOption(option, allowedValues, label) {
    if (option === undefined) {
        return [];
    }
    if (!(option === 'all' || (Array.isArray(option) && option.every(function (api) { return includes(allowedValues, api); })))) {
        display.error("".concat(label, " should be \"all\" or an array with allowed values \"").concat(allowedValues.join('", "'), "\""));
        return;
    }
    return option === 'all' ? allowedValues : removeDuplicates(option);
}
export function serializeLogsConfiguration(configuration) {
    var baseSerializedInitConfiguration = serializeConfiguration(configuration);
    return assign({
        forward_errors_to_logs: configuration.forwardErrorsToLogs,
        forward_console_logs: configuration.forwardConsoleLogs,
        forward_reports: configuration.forwardReports,
    }, baseSerializedInitConfiguration);
}
//# sourceMappingURL=configuration.js.map