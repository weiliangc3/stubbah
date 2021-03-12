import axios from './axios';
import { managePactsByRouteEndpoint } from '../../endpoints/managePactEndpoints';
import RawPact from '../../classes/RawPact';

export default (route: string, pact: RawPact): Promise<any[]> => axios
  .post(managePactsByRouteEndpoint(route), pact);
