"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextHistory = exports.CLEAR_OLD_CONTEXTS_INTERVAL = void 0;
var timeUtils_1 = require("./timeUtils");
var utils_1 = require("./utils");
var END_OF_TIMES = Infinity;
exports.CLEAR_OLD_CONTEXTS_INTERVAL = utils_1.ONE_MINUTE;
/**
 * Store and keep track of contexts spans. This whole class assumes that contexts are added in
 * chronological order (i.e. all entries have an increasing start time).
 */
var ContextHistory = /** @class */ (function () {
    function ContextHistory(expireDelay) {
        var _this = this;
        this.expireDelay = expireDelay;
        this.entries = [];
        this.clearOldContextsInterval = setInterval(function () { return _this.clearOldContexts(); }, exports.CLEAR_OLD_CONTEXTS_INTERVAL);
    }
    /**
     * Add a context to the history associated with a start time. Returns a reference to this newly
     * added entry that can be removed or closed.
     */
    ContextHistory.prototype.add = function (context, startTime) {
        var _this = this;
        var entry = {
            context: context,
            startTime: startTime,
            endTime: END_OF_TIMES,
            remove: function () {
                var index = _this.entries.indexOf(entry);
                if (index >= 0) {
                    _this.entries.splice(index, 1);
                }
            },
            close: function (endTime) {
                entry.endTime = endTime;
            },
        };
        this.entries.unshift(entry);
        return entry;
    };
    /**
     * Return the latest context that was active during `startTime`, or the currently active context
     * if no `startTime` is provided. This method assumes that entries are not overlapping.
     */
    ContextHistory.prototype.find = function (startTime) {
        if (startTime === void 0) { startTime = END_OF_TIMES; }
        for (var _i = 0, _a = this.entries; _i < _a.length; _i++) {
            var entry = _a[_i];
            if (entry.startTime <= startTime) {
                if (startTime <= entry.endTime) {
                    return entry.context;
                }
                break;
            }
        }
    };
    /**
     * Helper function to close the currently active context, if any. This method assumes that entries
     * are not overlapping.
     */
    ContextHistory.prototype.closeActive = function (endTime) {
        var latestEntry = this.entries[0];
        if (latestEntry && latestEntry.endTime === END_OF_TIMES) {
            latestEntry.close(endTime);
        }
    };
    /**
     * Return all contexts that were active during `startTime`, or all currently active contexts if no
     * `startTime` is provided.
     */
    ContextHistory.prototype.findAll = function (startTime) {
        if (startTime === void 0) { startTime = END_OF_TIMES; }
        return this.entries
            .filter(function (entry) { return entry.startTime <= startTime && startTime <= entry.endTime; })
            .map(function (entry) { return entry.context; });
    };
    /**
     * Remove all entries from this collection.
     */
    ContextHistory.prototype.reset = function () {
        this.entries = [];
    };
    /**
     * Stop internal garbage collection of past entries.
     */
    ContextHistory.prototype.stop = function () {
        clearInterval(this.clearOldContextsInterval);
    };
    ContextHistory.prototype.clearOldContexts = function () {
        var oldTimeThreshold = (0, timeUtils_1.relativeNow)() - this.expireDelay;
        while (this.entries.length > 0 && this.entries[this.entries.length - 1].endTime < oldTimeThreshold) {
            this.entries.pop();
        }
    };
    return ContextHistory;
}());
exports.ContextHistory = ContextHistory;
//# sourceMappingURL=contextHistory.js.map