import PactInteraction from './PactInteraction';

export default class MatchedPactInteraction extends PactInteraction {
  provider: string;

  constructor(pactInteraction: PactInteraction, provider: string) {
    super(
      pactInteraction.id,
      pactInteraction.description,
      pactInteraction.providerState,
      pactInteraction.request,
      pactInteraction.response,
      pactInteraction.route,
    );
    this.provider = provider;
  }
}
