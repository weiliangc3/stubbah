import Pact from '../../classes/Pact';
import PactInteraction from '../../classes/PactInteraction';
import StoredProviderStub from '../../classes/StoredProviderStub';

const pactInteractions: Record<number, PactInteraction> = {};

let idCounter = 0;

// Creates records for each interaction in the pact, and adds the indexes for each
// interaction to the provider stub and returns the provider stub.
export function addPactInteractionsToProviderStub(
  providerStub: StoredProviderStub, pactToLoad: Pact,
): StoredProviderStub {
  pactToLoad.interactions.forEach((rawPactInteraction) => {
    const id = idCounter + 1;
    idCounter += 1;

    const pactInteraction = PactInteraction
      .fromRawPactInteraction(rawPactInteraction, id, providerStub.route);
    providerStub.interactions.push(id);
    pactInteractions[id] = pactInteraction;
  });

  return providerStub;
}

export function getInteractions(interactionIndexes: number[]): PactInteraction[] {
  return interactionIndexes.map((index) => pactInteractions[index]);
}

export function getInteractionsForProviderStub(provider: StoredProviderStub): PactInteraction[] {
  return getInteractions(provider.interactions);
}

export function incrementCounterForInteraction(interaction: PactInteraction) {
  interaction.incrementCounter();
  return interaction;
}
