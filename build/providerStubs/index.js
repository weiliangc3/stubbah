"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProviderStubMap = getProviderStubMap;
exports.getProviderStubsByRoute = getProviderStubsByRoute;
exports.loadPact = loadPact;
exports.addStateForProviderByRoute = addStateForProviderByRoute;
var providerStubs = {};

function loadPact(pact, route) {
  if (providerStubs[route]) {
    if (providerStubs[route].provider !== pact.provider) {
      console.log("Error loading pact for ".concat(route, " <-> ").concat(pact.provider, ", unmatched provider ").concat(providerStubs[route].provider, " found"));
      return false;
    }

    providerStubs[route].interactions.push(pact.interactions);
    return true;
  }

  providerStubs[route] = {
    provider: pact.provider,
    interactions: pact.interactions,
    activeStates: []
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