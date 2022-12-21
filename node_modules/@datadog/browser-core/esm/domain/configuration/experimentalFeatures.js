/**
 * LIMITATION:
 * For NPM setup, this feature flag singleton is shared between RUM and Logs product.
 * This means that an experimental flag set on the RUM product will be set on the Logs product.
 * So keep in mind that in certain configurations, your experimental feature flag may affect other products.
 */
import { includes } from '../../tools/utils';
import { display } from '../../tools/display';
var enabledExperimentalFeatures;
export function updateExperimentalFeatures(enabledFeatures) {
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
        if (includes(flag, '-')) {
            display.warn("please use snake case for '".concat(flag, "'"));
        }
        enabledExperimentalFeatures.add(flag);
    });
}
export function isExperimentalFeatureEnabled(featureName) {
    return !!enabledExperimentalFeatures && enabledExperimentalFeatures.has(featureName);
}
export function resetExperimentalFeatures() {
    enabledExperimentalFeatures = new Set();
}
export function getExperimentalFeatures() {
    return enabledExperimentalFeatures || new Set();
}
//# sourceMappingURL=experimentalFeatures.js.map