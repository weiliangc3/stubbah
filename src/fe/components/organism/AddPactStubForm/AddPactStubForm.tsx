import {
  Formik, Form, FormikHelpers,
} from 'formik';
import React, { FunctionComponent } from 'react';
import addPact from '../../../apiCalls/addPact';
import Input from '../../molecule/Input';
import SubmitButton from '../../molecule/SubmitButton';
import constructPactFromValues from './constructPactFromValues';
import { FormValues as PactStubFormValues } from './PactStubFormValues';
import pactStubValidationSchema from './pactStubValidationSchema';

const AddPactStubForm: FunctionComponent<Props> = ({
  providerRoute, providerName, onSubmit = () => {},
}: Props) => {
  const initialValues = {
    description: '',
    providerState: '',
    requestMethod: 'get',
    requestPath: '/',
    requestHeaders: '{"Accept": "application/json"}',
    responseStatus: 200,
    responseHeaders: '{"Content-Type": "application/json;charset=utf-8"}',
    responseBody: '',
  };
  const submitHandler = (values: PactStubFormValues, { resetForm }: FormikHelpers<any>) => {
    if (providerName) {
      const pact = constructPactFromValues(values, providerName);
      addPact(providerRoute, pact);
      onSubmit();
    }
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
      validationSchema={pactStubValidationSchema}
    >
      <Form>
        <Input
          fieldFor="description"
          type="text"
          label="Description"
        />
        <Input
          fieldFor="providerState"
          type="text"
          label="Provider State"
        />
        <Input
          fieldFor="requestMethod"
          as="select"
          label="Request Method"
        >
          <option value="get">GET</option>
          <option value="post">POST</option>
          <option value="delete">DELETE</option>
          <option value="put">PUT</option>
          <option value="patch">PATCH</option>
        </Input>
        <Input
          fieldFor="requestPath"
          type="text"
          label="Request Path"
        />
        <Input
          fieldFor="requestHeaders"
          type="text"
          label="Request Headers"
        />
        <Input
          fieldFor="responseStatus"
          type="text"
          label="Response Status"
        />
        <Input
          fieldFor="responseHeaders"
          type="text"
          label="Response Headers"
        />
        <Input
          fieldFor="responseBody"
          type="text"
          label="Response Body*"
        />
        <SubmitButton type="submit">Submit</SubmitButton>
        <p>
          *If response body is valid json, using JSON.parse,
          it will be sent as json.
        </p>
      </Form>
    </Formik>
  );
};

export default AddPactStubForm;

interface Props{
  providerRoute: string;
  providerName: string | undefined;
  onSubmit?: Function;
}

AddPactStubForm.defaultProps = {
  onSubmit: () => {},
};
