import axios from './axios';
import PactProvider from '../../classes/PactProvider';
import { managePactsByRouteEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string): Promise<PactProvider> => axios
  .get(managePactsByRouteEndpoint(route))
  .then((res) => res.data);
