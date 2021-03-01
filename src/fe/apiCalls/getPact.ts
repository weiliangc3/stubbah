import axios from './axios';
import StoredProviderStub from '../../classes/StoredProviderStub';
import { managePactsByRouteEndpoint } from '../../endpoints/managePactEndpoints';

export default (route: string): Promise<StoredProviderStub> => axios
  .get(managePactsByRouteEndpoint(route))
  .then((res) => res.data);
