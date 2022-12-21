"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serializeLogsConfiguration = exports.validateAndBuildForwardOption = exports.validateAndBuildLogsConfiguration = exports.DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT = void 0;
var browser_core_1 = require("@datadog/browser-core");
/**
 * arbitrary value, byte precision not needed
 */
exports.DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT = 32 * browser_core_1.ONE_KIBI_BYTE;
function validateAndBuildLogsConfiguration(initConfiguration) {
    var baseConfiguration = (0, browser_core_1.validateAndBuildConfiguration)(initConfiguration);
    var forwardConsoleLogs = validateAndBuildForwardOption(initConfiguration.forwardConsoleLogs, (0, browser_core_1.objectValues)(browser_core_1.ConsoleApiName), 'Forward Console Logs');
    var forwardReports = validateAndBuildForwardOption(initConfiguration.forwardReports, (0, browser_core_1.objectValues)(browser_core_1.RawReportType), 'Forward Reports');
    if (!baseConfiguration || !forwardConsoleLogs || !forwardReports) {
        return;
    }
    if (initConfiguration.forwardErrorsToLogs && !(0, browser_core_1.includes)(forwardConsoleLogs, browser_core_1.ConsoleApiName.error)) {
        forwardConsoleLogs.push(browser_core_1.ConsoleApiName.error);
    }
    return (0, browser_core_1.assign)({
        forwardErrorsToLogs: initConfiguration.forwardErrorsToLogs !== false,
        forwardConsoleLogs: forwardConsoleLogs,
        forwardReports: forwardReports,
        requestErrorResponseLengthLimit: exports.DEFAULT_REQUEST_ERROR_RESPONSE_LENGTH_LIMIT,
    }, baseConfiguration);
}
exports.validateAndBuildLogsConfiguration = validateAndBuildLogsConfiguration;
function validateAndBuildForwardOption(option, allowedValues, label) {
    if (option === undefined) {
        return [];
    }
    if (!(option === 'all' || (Array.isArray(option) && option.every(function (api) { return (0, browser_core_1.includes)(allowedValues, api); })))) {
        browser_core_1.display.error("".concat(label, " should be \"all\" or an array with allowed values \"").concat(allowedValues.join('", "'), "\""));
        return;
    }
    return option === 'all' ? allowedValues : (0, browser_core_1.removeDuplicates)(option);
}
exports.validateAndBuildForwardOption = validateAndBuildForwardOption;
function serializeLogsConfiguration(configuration) {
    var baseSerializedInitConfiguration = (0, browser_core_1.serializeConfiguration)(configuration);
    return (0, browser_core_1.assign)({
        forward_errors_to_logs: configuration.forwardErrorsToLogs,
        forward_console_logs: configuration.forwardConsoleLogs,
        forward_reports: configuration.forwardReports,
    }, baseSerializedInitConfiguration);
}
exports.serializeLogsConfiguration = serializeLogsConfiguration;
//# sourceMappingURL=configuration.js.map