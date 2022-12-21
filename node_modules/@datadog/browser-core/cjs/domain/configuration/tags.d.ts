import type { InitConfiguration } from './configuration';
export declare const TAG_SIZE_LIMIT = 200;
export declare function buildTags(configuration: InitConfiguration): string[];
export declare function buildTag(key: string, rawValue: string): string;
