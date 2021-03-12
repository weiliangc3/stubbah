import PactInteraction from '../../classes/PactInteraction';
import { Matcher } from '../../classes/types';

const makeMatchersFromInteraction = (interaction: PactInteraction): Matcher[] => {
  const stateMatcher: Matcher = {
    type: 'state',
    value: interaction.providerState,
  };
  const urlMatcher: Matcher = {
    type: 'url',
    value: interaction.request.path,
  };
  const methodMatcher: Matcher = {
    type: 'method',
    value: interaction.request.method,
  };
  const headerMatcher: Matcher = {
    type: 'headers',
    headers: interaction.request.headers,
  };

  return [stateMatcher, urlMatcher, methodMatcher, headerMatcher];
};

export default makeMatchersFromInteraction;
