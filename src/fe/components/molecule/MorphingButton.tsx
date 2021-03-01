import React, { FunctionComponent, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { TableButton } from './Table';

const Button = styled.button`
  display:inline-block;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  padding: 6px;
  margin: 4px;
`;
const ConfirmButton = styled(Button)`
  background-color: #FFF;
  border: 2px solid #1b8e1b;
  color: #1b8e1b;
  &:hover {
    background-color: #1b8e1b;
    border: 2px solid #FFF;
    color: #FFF;
  }
`;
const CancelButton = styled(Button)`
  background-color: #FFF;
  border: 2px solid #d83a17;
  color: #d83a17;
  &:hover {
    background-color: #d83a17;
    border: 2px solid #FFF;
    color: #FFF;
  }
`;

const MorphingButton: FunctionComponent<Props> = ({ onClick, children }: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const confirmHandler = () => {
    setActive(false);
    onClick();
  };

  return active ? (
    <>
      <ConfirmButton onClick={confirmHandler}>
        Confirm
      </ConfirmButton>
      <CancelButton onClick={() => setActive(false)}>
        Cancel
      </CancelButton>
    </>
  ) : (
    <TableButton onClick={() => setActive(true)}>
      {children}
    </TableButton>
  );
};

export default MorphingButton;

interface Props{
  onClick: Function;
  children: ReactNode;
}
