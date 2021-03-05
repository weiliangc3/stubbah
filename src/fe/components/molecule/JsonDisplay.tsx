import JSONPretty from 'react-json-pretty';
import styled from 'styled-components';
import getFromTheme from '../../utils/getFromTheme';

export default styled(JSONPretty)`
  ${getFromTheme('jsonTheme')}
`;
