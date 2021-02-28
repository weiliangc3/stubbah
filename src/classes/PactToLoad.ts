import Pact from './Pact';

export default class PactToLoad {
  pact: Pact;

  route: string;

  constructor(pact: Pact, route: string) {
    this.pact = pact;
    this.route = route;
  }
}
