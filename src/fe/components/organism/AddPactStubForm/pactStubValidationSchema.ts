import * as Yup from 'yup';

const jsonTest = (value: string) => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

const pactStubValidationSchema = Yup.object().shape({
  description: Yup.string()
    .required('A description is required for pact files'),
  providerState: Yup.string()
    .required('A state is required for pact files'),
  requestMethod: Yup.string()
    .required('Method of request is required')
    .oneOf(['get', 'put', 'patch', 'post', 'delete']),
  requestPath: Yup.string()
    .required('A request path is required')
    .matches(/^\/[\S]*$/, 'must start with a /, and have no spaces'),
  requestHeaders: Yup.string()
  // @ts-ignore
    .test('json', 'This needs to be valid json', jsonTest),
  responseStatus: Yup.number()
    .test('numberLength',
      'This number needs to be 3 digits long',
      // @ts-ignore
      (value: string) => value.toString().length === 3),
  responseHeaders: Yup.string()
  // @ts-ignore
    .test('json', 'This needs to be valid json', jsonTest),
  responseBody: Yup.string(),
});

export default pactStubValidationSchema;
