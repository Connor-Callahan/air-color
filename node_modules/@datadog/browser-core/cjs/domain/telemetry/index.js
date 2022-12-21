"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTelemetryConfiguration = exports.isTelemetryReplicationAllowed = exports.startTelemetry = exports.resetTelemetry = exports.startFakeTelemetry = exports.addTelemetryError = exports.addTelemetryDebug = void 0;
var telemetry_1 = require("./telemetry");
Object.defineProperty(exports, "addTelemetryDebug", { enumerable: true, get: function () { return telemetry_1.addTelemetryDebug; } });
Object.defineProperty(exports, "addTelemetryError", { enumerable: true, get: function () { return telemetry_1.addTelemetryError; } });
Object.defineProperty(exports, "startFakeTelemetry", { enumerable: true, get: function () { return telemetry_1.startFakeTelemetry; } });
Object.defineProperty(exports, "resetTelemetry", { enumerable: true, get: function () { return telemetry_1.resetTelemetry; } });
Object.defineProperty(exports, "startTelemetry", { enumerable: true, get: function () { return telemetry_1.startTelemetry; } });
Object.defineProperty(exports, "isTelemetryReplicationAllowed", { enumerable: true, get: function () { return telemetry_1.isTelemetryReplicationAllowed; } });
Object.defineProperty(exports, "addTelemetryConfiguration", { enumerable: true, get: function () { return telemetry_1.addTelemetryConfiguration; } });
__exportStar(require("./rawTelemetryEvent.types"), exports);
__exportStar(require("./telemetryEvent.types"), exports);
//# sourceMappingURL=index.js.map