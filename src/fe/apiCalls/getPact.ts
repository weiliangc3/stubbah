import axios from 'axios';
import StoredProviderStub from '../../classes/StoredProviderStub';

export default (id: string): Promise<StoredProviderStub> => axios
  .get(`/manage-api/pact/${id}`)
  .then((res) => res.data);
