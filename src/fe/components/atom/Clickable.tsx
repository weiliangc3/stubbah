import styled from 'styled-components';
import getFromTheme from '../../utils/getFromTheme';

const Clickable = styled.a<ClickableProps>`
  cursor: pointer;
  color: ${getFromTheme('linkColour')};
`;
export interface ClickableProps{
  onClick: Function;
  onKeyPress: Function;
  role: string;
  tabIndex: number;
}

export default Clickable;
