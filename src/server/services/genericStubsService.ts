import GenericStub from '../../classes/GenericStub';
import GenericProvider from '../../classes/GenericProvider';

const stubs: Record<number, GenericStub> = {};

let idCounter = 0;

// Creates records for each interaction in the pact, and adds the indexes for each
// interaction to the provider stub and returns the provider stub.
export function addGenericStubToProvider(
  provider: GenericProvider, stubToLoad: GenericStub,
): GenericProvider {
  const id = idCounter + 1;
  idCounter += 1;
  provider.stubs.push(id);
  stubs[id] = stubToLoad;
  return provider;
}

export function getStubs(stubIndexes: number[]): GenericStub[] {
  return stubIndexes.map((index) => stubs[index]);
}

export function getStubsForProvider(provider: GenericProvider): GenericStub[] {
  return getStubs(provider.stubs);
}

export function incrementCounterForStub(stub: GenericStub) {
  stub.incrementCounter();
  return stub;
}
