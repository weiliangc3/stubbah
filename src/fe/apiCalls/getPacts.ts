import axios from 'axios';
import StoredProviderStub from '../../classes/StoredProviderStub';

export default (): Promise<Record<string, StoredProviderStub>> => axios
  .get('/manage-api/pact')
  .then((res) => res.data);
