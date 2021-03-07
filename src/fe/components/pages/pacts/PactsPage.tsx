import React, { FunctionComponent, useEffect, useState } from 'react';
import StoredProviderStub from '../../../../classes/StoredProviderStub';
import getPacts from '../../../apiCalls/getPacts';
import Title from '../../molecule/Title';
import Paragraph from '../../molecule/Paragraph';
import Main from '../../molecule/Main';
import Table, { TableLink } from '../../molecule/Table';

const PactsPage: FunctionComponent = () => {
  const [pacts, setPacts] = useState<Record<string, StoredProviderStub>>({});

  useEffect(() => {
    getPacts().then((data) => {
      setPacts(data);
    });
  }, []);

  const pactRoutes: string[] = [];
  const pactsArray: StoredProviderStub[] = Object.keys(pacts).map((key) => {
    pactRoutes.push(key);
    return pacts[key];
  });

  return (
    <Main>
      <Title>Pacts loaded</Title>

      <Paragraph>
        Pacts loaded, by provider.
      </Paragraph>

      {pactsArray.length === 0 ? (
        <p>
          No pacts found.
        </p>
      ) : (
        <>
          <Paragraph>
            Click &ldquo;Manage pacts&rdquo; to make changes and see details.
          </Paragraph>
          <Table>
            <tr>
              <th>Provider name</th>
              <th>Route</th>
              <th>No. of available interactions</th>
              <th>Active states</th>
              <th>Manage</th>
            </tr>
            {pactsArray.map((pact, index) => (
              <tr>
                <td>{pact.provider}</td>
                <td>{pactRoutes[index]}</td>
                <td>{pact.interactions.length}</td>
                <td>
                  <ul>
                    {pact.activeStates.map((state) => (
                      <li>{state}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  <TableLink to={`/pact/route/${pactRoutes[index]}`}>
                    Manage pact &#x25B8;
                  </TableLink>
                </td>
              </tr>
            ))}
          </Table>
        </>
      )}
    </Main>
  );
};

export default PactsPage;
