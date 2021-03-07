import React, { FunctionComponent, ReactNode } from 'react';
import { Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import getFromTheme from '../../utils/getFromTheme';

const Label = styled.label`
  display: block;
`;

const InputContainer = styled.p`
  display: block;
  ${getFromTheme('formLabelFont')};

  & input[type=text] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: none;
    border: 2px solid #b3b3b3;
    border-radius: 4px;
  }

  & input:active, & input:focus {
    background-color: #f2f2f2;
    border: 2px solid black;
  }
`;
const ErrorMessageContainer = styled.div`
  padding-bottom: 16px;
  ${getFromTheme('mainFont')};
  color: ${getFromTheme('errorColour')};
`;

const Input: FunctionComponent<Props> = ({
  fieldFor, type, children, className, label, as,
}: Props) => (
  <InputContainer className={className}>
    <Label htmlFor={fieldFor}>
      {label}
    </Label>
    <Field
      name={fieldFor}
      type={type}
      as={as}
    >
      {children}
    </Field>
    <ErrorMessageContainer>
      <ErrorMessage name={fieldFor} />
    </ErrorMessageContainer>

  </InputContainer>
);

export default Input;

interface Props{
  fieldFor: string,
  type?: string,
  children?: ReactNode,
  label: ReactNode,
  className?: string,
  as?: string,
}

Input.defaultProps = {
  children: undefined,
  className: '',
  as: undefined,
  type: undefined,
};
