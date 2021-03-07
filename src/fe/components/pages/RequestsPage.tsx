import React, { FunctionComponent, useEffect, useState } from 'react';
import RequestRecord from '../../../classes/RequestRecord';
import getRequestRecords from '../../apiCalls/getRequestRecords';
import Title from '../molecule/Title';
import Main from '../molecule/Main';

const RequestsPage: FunctionComponent = () => {
  const [requests, setRequests] = useState<RequestRecord[]>([]);

  useEffect(() => {
    getRequestRecords().then((data) => {
      setRequests(data);
    });
  }, []);

  return (
    <Main>
      <Title>Requests page</Title>
      <div>
        {JSON.stringify(requests)}
      </div>
    </Main>
  );
};

export default RequestsPage;
