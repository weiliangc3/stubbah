export default class StoredProviderStub {
  provider: string;

  interactions : number[];

  activeStates: string[];

  route: string;

  constructor(provider: string, route: string) {
    this.provider = provider;
    this.route = route;
    this.interactions = [];
    this.activeStates = [];
  }

  public removeInteraction(id: number): void {
    this.interactions = this.interactions.filter((_id) => _id !== id);
  }
}
