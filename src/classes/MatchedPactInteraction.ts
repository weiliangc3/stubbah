import PactInteraction from './PactInteraction';

export default class MatchedPactInteraction extends PactInteraction {
  provider: string;

  constructor(pactInteraction: PactInteraction, provider: string) {
    super(pactInteraction.description,
      pactInteraction.provider_state,
      pactInteraction.request,
      pactInteraction.response);
    this.provider = provider;
  }
}
