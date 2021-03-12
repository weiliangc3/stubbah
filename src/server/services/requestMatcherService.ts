import { Request } from 'express';
import { StubResponse } from '../../classes/types';
import RequestRecord from '../../classes/RequestRecord';
import { getProviderStub } from './pactProvidersService';
import { getInteractionsForProviderStub, incrementCounterForInteraction } from './pactInteractionsService';
import MatchedPactInteraction from '../../classes/MatchedPactInteraction';

const requestsRecords: RequestRecord[] = [];

function matchPactRequestToStub(req: Request): StubResponse|null {
  const uri = req.baseUrl;
  const route = uri.split(/\//)[2];
  const method = req.method.toLowerCase();

  const providerStub = getProviderStub(route);

  if (providerStub) {
    const pathRegex = new RegExp(`/stub/${route}/(.+)`);
    const regexArray = pathRegex.exec(uri);
    const path = `/${regexArray ? regexArray[1] : ''}`;

    const providerInteractions = getInteractionsForProviderStub(providerStub);
    const providerActiveStates = providerStub.activeStates;

    const matchingInteractions = providerInteractions
      .filter((interaction) => interaction.request.path === path
        && interaction.request.method.toLowerCase() === method
        && providerActiveStates.includes(interaction.providerState));

    if (matchingInteractions.length > 0) {
      console.log(`Provider interactions matched with ${matchingInteractions.length} pact interaction(s)`);
      incrementCounterForInteraction(matchingInteractions[0]);
      const matchedPactInteraction = new MatchedPactInteraction(
        matchingInteractions[0], providerStub.provider,
      );
      requestsRecords.push(new RequestRecord(req, matchedPactInteraction));
      return matchedPactInteraction.response;
    }
  }
  return null;
}

export function matchRequestToStub(req: Request): StubResponse|null {
  const matchedPactResponse = matchPactRequestToStub(req);
  if (matchedPactResponse) {
    return matchedPactResponse;
  }

  requestsRecords.push(new RequestRecord(req));
  return null;
}

export function getAllRequestRecords(): RequestRecord[] {
  return requestsRecords;
}
