import { Request } from 'express';
import { StubResponse } from '../../classes/types';
import RequestRecord from '../../classes/RequestRecord';
import { getProviderStub } from './pactStubService';

const requestsRecods: RequestRecord[] = [];

// eslint-disable-next-line import/prefer-default-export
export function matchPactRequestToStub(req: Request): StubResponse|null {
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

    if (matchingInteractions.length > 0) {
      console.log(`Provider interactions matched with ${matchingInteractions.length} pact(s)`);
      return matchingInteractions[0].response;
    }
  }
  return null;
}