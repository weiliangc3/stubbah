import axios from './axios';
import { availablePactStatesByRouteEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string): Promise<string[]> => axios
  .get(availablePactStatesByRouteEndpoint(route))
  .then((res) => res.data);
