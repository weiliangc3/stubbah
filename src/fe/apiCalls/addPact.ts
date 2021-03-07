import axios from './axios';
import { managePactsByRouteEndpoint } from '../../endpoints/managePactEndpoints';
import Pact from '../../classes/Pact';

export default (route: string, pact: Pact): Promise<any[]> => axios
  .post(managePactsByRouteEndpoint(route), pact);
