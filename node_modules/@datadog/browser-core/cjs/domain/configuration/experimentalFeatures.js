"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExperimentalFeatures = exports.resetExperimentalFeatures = exports.isExperimentalFeatureEnabled = exports.updateExperimentalFeatures = void 0;
/**
 * LIMITATION:
 * For NPM setup, this feature flag singleton is shared between RUM and Logs product.
 * This means that an experimental flag set on the RUM product will be set on the Logs product.
 * So keep in mind that in certain configurations, your experimental feature flag may affect other products.
 */
var utils_1 = require("../../tools/utils");
var display_1 = require("../../tools/display");
var enabledExperimentalFeatures;
function updateExperimentalFeatures(enabledFeatures) {
    // Safely handle external data
    if (!Array.isArray(enabledFeatures)) {
        return;
    }
    if (!enabledExperimentalFeatures) {
        enabledExperimentalFeatures = new Set(enabledFeatures);
    }
    enabledFeatures
        .filter(function (flag) { return typeof flag === 'string'; })
        .forEach(function (flag) {
        if ((0, utils_1.includes)(flag, '-')) {
            display_1.display.warn("please use snake case for '".concat(flag, "'"));
        }
        enabledExperimentalFeatures.add(flag);
    });
}
exports.updateExperimentalFeatures = updateExperimentalFeatures;
function isExperimentalFeatureEnabled(featureName) {
    return !!enabledExperimentalFeatures && enabledExperimentalFeatures.has(featureName);
}
exports.isExperimentalFeatureEnabled = isExperimentalFeatureEnabled;
function resetExperimentalFeatures() {
    enabledExperimentalFeatures = new Set();
}
exports.resetExperimentalFeatures = resetExperimentalFeatures;
function getExperimentalFeatures() {
    return enabledExperimentalFeatures || new Set();
}
exports.getExperimentalFeatures = getExperimentalFeatures;
//# sourceMappingURL=experimentalFeatures.js.map