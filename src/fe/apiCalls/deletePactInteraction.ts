import axios from './axios';
import { interactionsByRouteAndIdEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string, id: number): Promise<any> => axios
  .delete(interactionsByRouteAndIdEndpoint(route, id));
