import { Request } from 'express';
import { StubResponse } from '../../classes/types';
import PactInteraction from '../../classes/PactInteraction';
import RequestRecord from '../../classes/RequestRecord';
import { getProviderStub } from './pactStubService';
import MatchedPactInteraction from '../../classes/MatchedPactInteraction';

const requestsRecords: RequestRecord[] = [];

function matchPactRequestToStub(req: Request): PactInteraction[] {
  const uri = req.url;
  const route = uri.split(/\//)[1];
  const method = req.method.toLowerCase();

  const providerStub = getProviderStub(route);

  if (providerStub) {
    const pathRegex = new RegExp(`${route}/(.+)`);
    const regexArray = pathRegex.exec(uri);
    const path = `/${regexArray ? regexArray[1] : ''}`;

    const providerInteractions = providerStub.getAllInteractions();
    const providerActiveStates = providerStub.activeStates;

    const matchingInteractions = providerInteractions
      .filter((interaction) => interaction.request.path === path
        && interaction.request.method.toLowerCase() === method
        && providerActiveStates.includes(interaction.provider_state));

    return matchingInteractions;
  }
  return [];
}

export function matchRequestToStub(req: Request): StubResponse|null {
  const matchedPactResponses = matchPactRequestToStub(req);
  if (matchedPactResponses.length > 0) {
    console.log(`Provider interactions matched with ${matchedPactResponses.length} pact(s)`);
    const matchedPactInteraction = new MatchedPactInteraction(matchedPactResponses[0], 'something');
    requestsRecords.push(new RequestRecord(req, matchedPactInteraction));
    return matchedPactInteraction.response;
  }

  requestsRecords.push(new RequestRecord(req));
  return null;
}

export function getAllRequestRecords(): RequestRecord[] {
  return requestsRecords;
}
