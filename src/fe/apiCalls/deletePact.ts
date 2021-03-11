import axios from './axios';
import { managePactsByRouteEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string): Promise<any> => axios
  .delete(managePactsByRouteEndpoint(route));
