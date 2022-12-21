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
exports.getExperimentalFeatures = exports.resetExperimentalFeatures = exports.updateExperimentalFeatures = exports.isExperimentalFeatureEnabled = exports.createEndpointBuilder = exports.serializeConfiguration = exports.validateAndBuildConfiguration = exports.DefaultPrivacyLevel = exports.buildCookieOptions = void 0;
var configuration_1 = require("./configuration");
Object.defineProperty(exports, "buildCookieOptions", { enumerable: true, get: function () { return configuration_1.buildCookieOptions; } });
Object.defineProperty(exports, "DefaultPrivacyLevel", { enumerable: true, get: function () { return configuration_1.DefaultPrivacyLevel; } });
Object.defineProperty(exports, "validateAndBuildConfiguration", { enumerable: true, get: function () { return configuration_1.validateAndBuildConfiguration; } });
Object.defineProperty(exports, "serializeConfiguration", { enumerable: true, get: function () { return configuration_1.serializeConfiguration; } });
var endpointBuilder_1 = require("./endpointBuilder");
Object.defineProperty(exports, "createEndpointBuilder", { enumerable: true, get: function () { return endpointBuilder_1.createEndpointBuilder; } });
var experimentalFeatures_1 = require("./experimentalFeatures");
Object.defineProperty(exports, "isExperimentalFeatureEnabled", { enumerable: true, get: function () { return experimentalFeatures_1.isExperimentalFeatureEnabled; } });
Object.defineProperty(exports, "updateExperimentalFeatures", { enumerable: true, get: function () { return experimentalFeatures_1.updateExperimentalFeatures; } });
Object.defineProperty(exports, "resetExperimentalFeatures", { enumerable: true, get: function () { return experimentalFeatures_1.resetExperimentalFeatures; } });
Object.defineProperty(exports, "getExperimentalFeatures", { enumerable: true, get: function () { return experimentalFeatures_1.getExperimentalFeatures; } });
__exportStar(require("./intakeSites"), exports);
//# sourceMappingURL=index.js.map