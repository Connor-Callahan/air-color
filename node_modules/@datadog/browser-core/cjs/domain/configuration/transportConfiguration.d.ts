import type { InitConfiguration } from './configuration';
import type { EndpointBuilder } from './endpointBuilder';
export interface TransportConfiguration {
    logsEndpointBuilder: EndpointBuilder;
    rumEndpointBuilder: EndpointBuilder;
    sessionReplayEndpointBuilder: EndpointBuilder;
    isIntakeUrl: (url: string) => boolean;
    replica?: ReplicaConfiguration;
    site: string;
}
export interface ReplicaConfiguration {
    applicationId?: string;
    logsEndpointBuilder: EndpointBuilder;
    rumEndpointBuilder: EndpointBuilder;
}
export declare function computeTransportConfiguration(initConfiguration: InitConfiguration): TransportConfiguration;
