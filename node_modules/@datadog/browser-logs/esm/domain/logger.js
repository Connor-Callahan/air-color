var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { deepClone, assign, combine, createContextManager, ErrorSource, monitored } from '@datadog/browser-core';
export var StatusType = {
    debug: 'debug',
    error: 'error',
    info: 'info',
    warn: 'warn',
};
export var HandlerType = {
    console: 'console',
    http: 'http',
    silent: 'silent',
};
export var STATUSES = Object.keys(StatusType);
var Logger = /** @class */ (function () {
    function Logger(handleLogStrategy, name, handlerType, level, loggerContext) {
        if (handlerType === void 0) { handlerType = HandlerType.http; }
        if (level === void 0) { level = StatusType.debug; }
        if (loggerContext === void 0) { loggerContext = {}; }
        this.handleLogStrategy = handleLogStrategy;
        this.handlerType = handlerType;
        this.level = level;
        this.contextManager = createContextManager();
        this.contextManager.set(assign({}, loggerContext, name ? { logger: { name: name } } : undefined));
    }
    Logger.prototype.log = function (message, messageContext, status) {
        if (status === void 0) { status = StatusType.info; }
        this.handleLogStrategy({ message: message, context: deepClone(messageContext), status: status }, this);
    };
    Logger.prototype.debug = function (message, messageContext) {
        this.log(message, messageContext, StatusType.debug);
    };
    Logger.prototype.info = function (message, messageContext) {
        this.log(message, messageContext, StatusType.info);
    };
    Logger.prototype.warn = function (message, messageContext) {
        this.log(message, messageContext, StatusType.warn);
    };
    Logger.prototype.error = function (message, messageContext) {
        var errorOrigin = {
            error: {
                origin: ErrorSource.LOGGER,
            },
        };
        this.log(message, combine(errorOrigin, messageContext), StatusType.error);
    };
    Logger.prototype.setContext = function (context) {
        this.contextManager.set(context);
    };
    Logger.prototype.getContext = function () {
        return this.contextManager.get();
    };
    Logger.prototype.addContext = function (key, value) {
        this.contextManager.add(key, value);
    };
    Logger.prototype.removeContext = function (key) {
        this.contextManager.remove(key);
    };
    Logger.prototype.setHandler = function (handler) {
        this.handlerType = handler;
    };
    Logger.prototype.getHandler = function () {
        return this.handlerType;
    };
    Logger.prototype.setLevel = function (level) {
        this.level = level;
    };
    Logger.prototype.getLevel = function () {
        return this.level;
    };
    __decorate([
        monitored
    ], Logger.prototype, "log", null);
    return Logger;
}());
export { Logger };
//# sourceMappingURL=logger.js.map