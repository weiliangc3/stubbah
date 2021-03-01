import axios from './axios';
import StoredProviderStub from '../../classes/StoredProviderStub';
import { managePactsEndpoint } from '../../endpoints/managePactEndpoints';

export default (): Promise<Record<string, StoredProviderStub>> => axios
  .get(managePactsEndpoint)
  .then((res) => res.data);
