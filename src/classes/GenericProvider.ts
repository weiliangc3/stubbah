export default class GenericProvider {
  stubs : number[];

  activeStates: string[];

  route: string;

  constructor(route: string) {
    this.route = route;
    this.stubs = [];
    this.activeStates = [];
  }

  public removeStub(id: number): void {
    this.stubs = this.stubs.filter((_id) => _id !== id);
  }
}
