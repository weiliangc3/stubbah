const providerStubs = {};

function loadPact(pact, route) {
  if (providerStubs[route]) {
    if (providerStubs[route].provider !== pact.provider) {
      console.log(`Error loading pact for ${route} <-> ${pact.provider}, unmatched provider ${providerStubs[route].provider} found`);
      return false;
    }

    providerStubs[route].interactions.push(pact.interactions);
    return true;
  }

  providerStubs[route] = {
    provider: pact.provider,
    interactions: pact.interactions,
    activeStates: [],
  };
  return true;
}

function addStateForProviderByRoute(state, route) {
  if (providerStubs[route]) {
    providerStubs[route].activeStates.push(state);
  }
}

function getProviderStubMap() {
  return providerStubs;
}

function getProviderStubsByRoute(route) {
  return providerStubs[route];
}

export {
  getProviderStubMap, getProviderStubsByRoute,
  loadPact, addStateForProviderByRoute,
};
