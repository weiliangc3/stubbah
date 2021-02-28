import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import StoredProviderStub from '../../../../classes/StoredProviderStub';
import getPacts from '../../../apiCalls/getPacts';
import getFromTheme from '../../../utils/getFromTheme';
import Title from '../../molecule/Title';
import Paragraph from '../../molecule/Paragraph';
import Section from '../../molecule/Section';

const PactsTable = styled.table`
  ${getFromTheme('tableStyling')}
`;

const StyledTableLink = styled(Link)`
  display: block;
  width: 100%;
`;

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
    <Section>
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
            Click &ldquo;Manage pacts&rdquo; to make changes.
          </Paragraph>
          <PactsTable>
            <tr>
              <th>Provider name</th>
              <th>Route</th>
              <th>No. of stubs</th>
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
                  <StyledTableLink to={`/pact/route/${pactRoutes[index]}`}>
                    Manage pact &#x25B8;
                  </StyledTableLink>
                </td>
              </tr>
            ))}
          </PactsTable>
        </>
      )}
    </Section>
  );
};

export default PactsPage;
