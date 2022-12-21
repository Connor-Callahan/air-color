import { assign, objectValues } from '../../tools/utils';
import { createEndpointBuilder } from './endpointBuilder';
import { buildTags } from './tags';
import { INTAKE_SITE_US1 } from './intakeSites';
export function computeTransportConfiguration(initConfiguration) {
    var tags = buildTags(initConfiguration);
    var endpointBuilders = computeEndpointBuilders(initConfiguration, tags);
    var intakeEndpoints = objectValues(endpointBuilders).map(function (builder) { return builder.buildIntakeUrl(); });
    var replicaConfiguration = computeReplicaConfiguration(initConfiguration, intakeEndpoints, tags);
    return assign({
        isIntakeUrl: function (url) { return intakeEndpoints.some(function (intakeEndpoint) { return url.indexOf(intakeEndpoint) === 0; }); },
        replica: replicaConfiguration,
        site: initConfiguration.site || INTAKE_SITE_US1,
    }, endpointBuilders);
}
function computeEndpointBuilders(initConfiguration, tags) {
    return {
        logsEndpointBuilder: createEndpointBuilder(initConfiguration, 'logs', tags),
        rumEndpointBuilder: createEndpointBuilder(initConfiguration, 'rum', tags),
        sessionReplayEndpointBuilder: createEndpointBuilder(initConfiguration, 'sessionReplay', tags),
    };
}
function computeReplicaConfiguration(initConfiguration, intakeEndpoints, tags) {
    if (!initConfiguration.replica) {
        return;
    }
    var replicaConfiguration = assign({}, initConfiguration, {
        site: INTAKE_SITE_US1,
        clientToken: initConfiguration.replica.clientToken,
    });
    var replicaEndpointBuilders = {
        logsEndpointBuilder: createEndpointBuilder(replicaConfiguration, 'logs', tags),
        rumEndpointBuilder: createEndpointBuilder(replicaConfiguration, 'rum', tags),
    };
    intakeEndpoints.push.apply(intakeEndpoints, objectValues(replicaEndpointBuilders).map(function (builder) { return builder.buildIntakeUrl(); }));
    return assign({ applicationId: initConfiguration.replica.applicationId }, replicaEndpointBuilders);
}
//# sourceMappingURL=transportConfiguration.js.map