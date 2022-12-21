"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifeCycle = void 0;
var LifeCycle = /** @class */ (function () {
    function LifeCycle() {
        this.callbacks = {};
    }
    LifeCycle.prototype.notify = function (eventType, data) {
        var eventCallbacks = this.callbacks[eventType];
        if (eventCallbacks) {
            eventCallbacks.forEach(function (callback) { return callback(data); });
        }
    };
    LifeCycle.prototype.subscribe = function (eventType, callback) {
        var _this = this;
        if (!this.callbacks[eventType]) {
            this.callbacks[eventType] = [];
        }
        this.callbacks[eventType].push(callback);
        return {
            unsubscribe: function () {
                _this.callbacks[eventType] = _this.callbacks[eventType].filter(function (other) { return callback !== other; });
            },
        };
    };
    return LifeCycle;
}());
exports.LifeCycle = LifeCycle;
//# sourceMappingURL=lifeCycle.js.map