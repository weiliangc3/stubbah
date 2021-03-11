import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

const Element = styled.span<Props>`
  ${(props) => (props.bold ? 'font-weight: bold;' : '')}
`;

const Span: FunctionComponent<Props> = ({ bold, children }: Props) => (
  <Element bold={bold}>{children}</Element>
);

export default Span;

interface Props{
  bold?: boolean;
  children: ReactNode;
}

Span.defaultProps = {
  bold: false,
};
