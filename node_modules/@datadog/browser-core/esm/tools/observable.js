var Observable = /** @class */ (function () {
    function Observable(onFirstSubscribe) {
        this.onFirstSubscribe = onFirstSubscribe;
        this.observers = [];
    }
    Observable.prototype.subscribe = function (f) {
        var _this = this;
        if (!this.observers.length && this.onFirstSubscribe) {
            this.onLastUnsubscribe = this.onFirstSubscribe() || undefined;
        }
        this.observers.push(f);
        return {
            unsubscribe: function () {
                _this.observers = _this.observers.filter(function (other) { return f !== other; });
                if (!_this.observers.length && _this.onLastUnsubscribe) {
                    _this.onLastUnsubscribe();
                }
            },
        };
    };
    Observable.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer(data); });
    };
    return Observable;
}());
export { Observable };
export function mergeObservables() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        observables[_i] = arguments[_i];
    }
    var globalObservable = new Observable(function () {
        var subscriptions = observables.map(function (observable) {
            return observable.subscribe(function (data) { return globalObservable.notify(data); });
        });
        return function () { return subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); }); };
    });
    return globalObservable;
}
//# sourceMappingURL=observable.js.map