import React, { FunctionComponent } from 'react';
import PactInteraction from '../../../../classes/PactInteraction';
import JsonDisplay from '../JsonDisplay';
import Table from '../Table';

const FullInteractionsTable: FunctionComponent<Props> = ({ interactions }: Props) => (
  <Table>
    <tr>
      <th>Description</th>
      <th>State</th>
      <th>Request</th>
      <th>Response</th>
      <th>Count*</th>
    </tr>
    {interactions.map((interaction) => {
      const {
        description, providerState, request,
        response, counter,
      } = interaction;
      return (
        <tr>
          <td>{description}</td>
          <td>{providerState}</td>
          <td>
            <JsonDisplay data={request} />
          </td>
          <td>
            <JsonDisplay data={response} />
          </td>
          <td>{counter}</td>
        </tr>
      );
    })}
  </Table>
);

export default FullInteractionsTable;

interface Props{
  interactions: PactInteraction[];
}

FullInteractionsTable.defaultProps = {};
