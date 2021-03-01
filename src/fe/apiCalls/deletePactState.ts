import axios from './axios';
import { pactStatesByRouteEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string, state: string): Promise<any> => axios
  .delete(pactStatesByRouteEndpoint(route), { data: { state } });
