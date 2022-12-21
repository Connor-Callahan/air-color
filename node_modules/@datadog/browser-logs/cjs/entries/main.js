"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datadogLogs = exports.HandlerType = exports.StatusType = exports.Logger = void 0;
var browser_core_1 = require("@datadog/browser-core");
var logsPublicApi_1 = require("../boot/logsPublicApi");
var startLogs_1 = require("../boot/startLogs");
var logger_1 = require("../domain/logger");
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return logger_1.Logger; } });
Object.defineProperty(exports, "StatusType", { enumerable: true, get: function () { return logger_1.StatusType; } });
Object.defineProperty(exports, "HandlerType", { enumerable: true, get: function () { return logger_1.HandlerType; } });
exports.datadogLogs = (0, logsPublicApi_1.makeLogsPublicApi)(startLogs_1.startLogs);
(0, browser_core_1.defineGlobal)((0, browser_core_1.getGlobalObject)(), 'DD_LOGS', exports.datadogLogs);
//# sourceMappingURL=main.js.map