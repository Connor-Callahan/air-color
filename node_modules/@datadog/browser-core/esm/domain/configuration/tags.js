import { display } from '../../tools/display';
export var TAG_SIZE_LIMIT = 200;
export function buildTags(configuration) {
    var env = configuration.env, service = configuration.service, version = configuration.version, datacenter = configuration.datacenter;
    var tags = [];
    if (env) {
        tags.push(buildTag('env', env));
    }
    if (service) {
        tags.push(buildTag('service', service));
    }
    if (version) {
        tags.push(buildTag('version', version));
    }
    if (datacenter) {
        tags.push(buildTag('datacenter', datacenter));
    }
    return tags;
}
var FORBIDDEN_CHARACTERS = /[^a-z0-9_:./-]/;
export function buildTag(key, rawValue) {
    // See https://docs.datadoghq.com/getting_started/tagging/#defining-tags for tags syntax. Note
    // that the backend may not follow the exact same rules, so we only want to display an informal
    // warning.
    var valueSizeLimit = TAG_SIZE_LIMIT - key.length - 1;
    if (rawValue.length > valueSizeLimit || FORBIDDEN_CHARACTERS.test(rawValue)) {
        display.warn("".concat(key, " value doesn't meet tag requirements and will be sanitized"));
    }
    // Let the backend do most of the sanitization, but still make sure multiple tags can't be crafted
    // by forging a value containing commas.
    var sanitizedValue = rawValue.replace(/,/g, '_');
    return "".concat(key, ":").concat(sanitizedValue);
}
//# sourceMappingURL=tags.js.map