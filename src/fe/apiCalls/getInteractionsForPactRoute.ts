import axios from './axios';
import { interactionsByPactRouteEndpoint } from '../../endpoints/managePactEndpoints';
import PactInteraction from '../../classes/PactInteraction';

export default (route: string): Promise<PactInteraction[]> => axios
  .get(interactionsByPactRouteEndpoint(route))
  .then((res) => res.data);
