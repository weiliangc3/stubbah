import { Request } from 'express';
import { StubResponse } from '../../classes/types';
import RequestRecord from '../../classes/RequestRecord';
import { getProviderStub } from './pactProvidersService';
import { getInteractionsForProviderStub, incrementCounterForInteraction } from './pactInteractionsService';
import MatchedPactInteraction from '../../classes/MatchedPactInteraction';
import { getStubsForProvider } from './genericStubsService';
import { getProvider } from './genericProvidersService';
import { matchAll } from './genericMatcherService';
import { getRouteFromBaseUrl } from '../utils/routeUtils';
import makeMatchersFromInteraction from '../utils/makeMatchersFromInteraction';

const requestsRecords: RequestRecord[] = [];

function matchPactRequestToStub(req: Request): StubResponse|null {
  const route = getRouteFromBaseUrl(req);

  const providerStub = getProviderStub(route);

  if (providerStub) {
    const providerInteractions = getInteractionsForProviderStub(providerStub);

    const matchingInteractions = providerInteractions
      .filter((interaction) => {
        const matchers = makeMatchersFromInteraction(interaction);
        return matchAll(req, matchers, providerStub);
      });

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

function matchRequestToGenericStub(req: Request): StubResponse|null {
  const route = getRouteFromBaseUrl(req);

  const provider = getProvider(route);

  if (provider) {
    const stubs = getStubsForProvider(provider);

    for (let index = 0; index < stubs.length; index += 1) {
      const stub = stubs[index];
      const stubMatchers = stubs[index].requestMatchers;

      if (matchAll(req, stubMatchers, provider)) {
        return stub.response;
      }
    }
  }
  return null;
}

export function matchRequestToStub(req: Request): StubResponse|null {
  let matchedResponse = matchPactRequestToStub(req);
  if (matchedResponse) {
    return matchedResponse;
  }
  matchedResponse = matchRequestToGenericStub(req);
  if (matchedResponse) {
    return matchedResponse;
  }

  requestsRecords.push(new RequestRecord(req));
  return null;
}

export function getAllRequestRecords(): RequestRecord[] {
  return requestsRecords;
}
