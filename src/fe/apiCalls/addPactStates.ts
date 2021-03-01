import axios from './axios';
import { pactStatesByRouteEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string, states: string[]): Promise<any[]> => Promise.all(
  states.map((state) => axios
    .post(pactStatesByRouteEndpoint(route), { state })),
);
