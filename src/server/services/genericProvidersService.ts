import GenericProvider from '../../classes/GenericProvider';
import GenericStub from '../../classes/GenericStub';
import { addGenericStubToProvider, getStubsForProvider } from './genericStubsService';
import { getLocalStubFiles } from './staticFileLoaderService';

const providers: Record<string, GenericProvider> = {};

const localStubs: Record<string, GenericStub[]> = getLocalStubFiles();

Object.keys(localStubs).forEach((route) => {
  const provider = new GenericProvider(route);
  localStubs[route].forEach((stub: GenericStub) => {
    providers[route] = addGenericStubToProvider(provider, stub);
  });
});

export function getProviders() :Record<string, GenericProvider> {
  return providers;
}

export function getProvider(route: string): GenericProvider {
  return providers[route];
}

export function loadStub(stub: GenericStub, route: string): boolean {
  let provider = getProvider(route);
  if (!provider) {
    provider = new GenericProvider(route);
    console.log(`New provider created for route '${route}'`);
  }
  providers[route] = addGenericStubToProvider(provider, stub);
  console.log(`New stub '${stub.name}' added to '${route}'`);
  return true;
}

export function getStubsForRoute(route: string): GenericStub[] {
  const provider = getProvider(route);
  if (!provider) { return []; }

  return getStubsForProvider(provider);
}

export function removeStubFromProvider(route: string, id: number) {
  const provider = getProvider(route);
  provider.removeStub(id);
}

export function removeProvider(route: string): Record<string, GenericProvider> {
  delete providers[route];
  return providers;
}

export function addStateForProviderByRoute(state: string, route: string): void {
  const provider = getProvider(route);
  if (provider && !provider.activeStates.includes(state)) {
    provider.activeStates.push(state);
  }
}

export function removeStateForProviderByRoute(state: string, route: string): void {
  const provider = getProvider(route);
  if (provider) {
    provider.activeStates = provider.activeStates.filter((_state) => _state !== state);
  }
}
export function getPotentialStatesForProvider(route: string): string[] {
  const potentialStates: string[] = [];
  const providerStub = getProvider(route);
  const stubs = getStubsForProvider(providerStub);

  stubs.forEach((stub) => {
    const state = stub.providerState;

    if (state && !potentialStates.includes(state) && !providerStub.activeStates.includes(state)) {
      potentialStates.push(state);
    }
  });
  return potentialStates;
}
