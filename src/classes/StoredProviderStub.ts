import { Interaction } from './Pact';

export default class StoredProviderStub {
  provider: string;

  interactions : number[];

  interactionMap: Record<number, Interaction>;

  activeStates: string[];

  constructor(provider: string, interactions: Interaction[]) {
    this.provider = provider;
    this.interactions = [];
    this.interactionMap = {};
    interactions.forEach((interaction) => {
      this.addInteraction(interaction);
    });
    this.activeStates = [];
  }

  public addInteraction(interaction: Interaction): void {
    let newIndex: number;
    if (this.interactions.length === 0) {
      newIndex = 0;
    } else {
      newIndex = this.interactions[this.interactions.length - 1] + 1;
    }
    this.interactions.push(newIndex);
    this.interactionMap[newIndex] = interaction;
  }

  public removeInteraction(id: number): void {
    delete this.interactionMap[id];
    this.interactions = this.interactions.filter((_id) => _id !== id);
  }

  public getAllInteractions(): Interaction[] {
    const interactions: Interaction[] = [];
    this.interactions.forEach((interactionIndex) => {
      interactions.push(this.interactionMap[interactionIndex]);
    });
    return interactions;
  }
}
