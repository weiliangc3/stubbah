import axios from './axios';
import RequestRecord from '../../classes/RequestRecord';
import { requestsEndpoint } from '../../endpoints/manageEndpoints';

export default (): Promise<RequestRecord[]> => axios
  .get(requestsEndpoint)
  .then((res) => res.data);
