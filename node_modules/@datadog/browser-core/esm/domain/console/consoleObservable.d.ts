import { Observable } from '../../tools/observable';
import { ConsoleApiName } from '../../tools/display';
export interface ConsoleLog {
    message: string;
    api: ConsoleApiName;
    stack?: string;
    handlingStack?: string;
}
export declare function initConsoleObservable(apis: ConsoleApiName[]): Observable<ConsoleLog>;
