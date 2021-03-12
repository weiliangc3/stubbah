import axios from './axios';
import PactProvider from '../../classes/PactProvider';
import { managePactsEndpoint } from '../../endpoints/managePactEndpoints';

export default (): Promise<Record<string, PactProvider>> => axios
  .get(managePactsEndpoint)
  .then((res) => res.data);
