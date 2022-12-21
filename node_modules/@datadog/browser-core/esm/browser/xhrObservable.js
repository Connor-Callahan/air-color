import { instrumentMethodAndCallOriginal } from '../tools/instrumentMethod';
import { monitor } from '../tools/monitor';
import { Observable } from '../tools/observable';
import { elapsed, relativeNow, clocksNow, timeStampNow } from '../tools/timeUtils';
import { normalizeUrl } from '../tools/urlPolyfill';
import { shallowClone } from '../tools/utils';
var xhrObservable;
var xhrContexts = new WeakMap();
export function initXhrObservable() {
    if (!xhrObservable) {
        xhrObservable = createXhrObservable();
    }
    return xhrObservable;
}
function createXhrObservable() {
    var observable = new Observable(function () {
        var stopInstrumentingStart = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'open', {
            before: openXhr,
        }).stop;
        var stopInstrumentingSend = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'send', {
            before: function () {
                sendXhr.call(this, observable);
            },
        }).stop;
        var stopInstrumentingAbort = instrumentMethodAndCallOriginal(XMLHttpRequest.prototype, 'abort', {
            before: abortXhr,
        }).stop;
        return function () {
            stopInstrumentingStart();
            stopInstrumentingSend();
            stopInstrumentingAbort();
        };
    });
    return observable;
}
function openXhr(method, url) {
    xhrContexts.set(this, {
        state: 'open',
        method: method,
        url: normalizeUrl(String(url)),
    });
}
function sendXhr(observable) {
    var _this = this;
    var context = xhrContexts.get(this);
    if (!context) {
        return;
    }
    var startContext = context;
    startContext.state = 'start';
    startContext.startTime = relativeNow();
    startContext.startClocks = clocksNow();
    startContext.isAborted = false;
    startContext.xhr = this;
    var hasBeenReported = false;
    var stopInstrumentingOnReadyStateChange = instrumentMethodAndCallOriginal(this, 'onreadystatechange', {
        before: function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                // Try to report the XHR as soon as possible, because the XHR may be mutated by the
                // application during a future event. For example, Angular is calling .abort() on
                // completed requests during a onreadystatechange event, so the status becomes '0'
                // before the request is collected.
                onEnd();
            }
        },
    }).stop;
    var onEnd = monitor(function () {
        _this.removeEventListener('loadend', onEnd);
        stopInstrumentingOnReadyStateChange();
        if (hasBeenReported) {
            return;
        }
        hasBeenReported = true;
        var completeContext = context;
        completeContext.state = 'complete';
        completeContext.duration = elapsed(startContext.startClocks.timeStamp, timeStampNow());
        completeContext.status = _this.status;
        observable.notify(shallowClone(completeContext));
    });
    this.addEventListener('loadend', onEnd);
    observable.notify(startContext);
}
function abortXhr() {
    var context = xhrContexts.get(this);
    if (context) {
        context.isAborted = true;
    }
}
//# sourceMappingURL=xhrObservable.js.map