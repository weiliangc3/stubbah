import RawPact from '../../classes/RawPact';
import PactInteraction from '../../classes/PactInteraction';
import PactProvider from '../../classes/PactProvider';

const pactInteractions: Record<number, PactInteraction> = {};

let idCounter = 0;

// Creates records for each interaction in the pact, and adds the indexes for each
// interaction to the provider stub and returns the provider stub.
export function addPactInteractionsToProviderStub(
  providerStub: PactProvider, pactToLoad: RawPact,
): PactProvider {
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

export function getInteractionsForProviderStub(provider: PactProvider): PactInteraction[] {
  return getInteractions(provider.interactions);
}

export function incrementCounterForInteraction(interaction: PactInteraction) {
  interaction.incrementCounter();
  return interaction;
}
