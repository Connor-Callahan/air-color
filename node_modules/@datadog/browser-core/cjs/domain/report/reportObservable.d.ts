import { Observable } from '../../tools/observable';
export declare const RawReportType: {
    readonly intervention: "intervention";
    readonly deprecation: "deprecation";
    readonly cspViolation: "csp_violation";
};
export declare type RawReportType = typeof RawReportType[keyof typeof RawReportType];
export interface RawReport {
    type: RawReportType;
    subtype: string;
    message: string;
    stack?: string;
}
export declare function initReportObservable(apis: RawReportType[]): Observable<RawReport>;
