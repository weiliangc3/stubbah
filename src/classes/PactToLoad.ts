import RawPact from './RawPact';

export default class PactToLoad {
  pact: RawPact;

  route: string;

  constructor(pact: RawPact, route: string) {
    this.pact = pact;
    this.route = route;
  }
}
