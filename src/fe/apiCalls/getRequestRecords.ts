import axios from 'axios';
import RequestRecord from '../../classes/RequestRecord';

export default (): Promise<RequestRecord[]> => axios
  .get('/manage-api/requests')
  .then((res) => res.data);
