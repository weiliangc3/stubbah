import React, { FunctionComponent, useEffect, useState } from 'react';
import RequestRecord from '../../../classes/RequestRecord';
import getRequestRecords from '../../apiCalls/getRequestRecords';
import Title from '../molecule/Title';
import Section from '../molecule/Section';

const RequestsPage: FunctionComponent = () => {
  const [requests, setRequests] = useState<RequestRecord[]>([]);

  useEffect(() => {
    getRequestRecords().then((data) => {
      setRequests(data);
    });
  }, []);

  return (
    <Section>
      <Title>Requests page</Title>
      <div>
        {JSON.stringify(requests)}
      </div>
    </Section>
  );
};

export default RequestsPage;
