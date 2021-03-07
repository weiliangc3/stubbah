import Pact from '../../../../classes/Pact';
import { FormValues as PactStubFormValues } from './PactStubFormValues';

const constructPactFromValues = (
  values: PactStubFormValues, providerName: string,
): Pact => {
  const requestHeaders = JSON.parse(values.requestHeaders);
  const responseHeaders = JSON.parse(values.responseHeaders);
  let responseBody;
  try {
    responseBody = JSON.parse(values.responseBody);
  } catch {
    responseBody = values.responseBody;
  }

  return new Pact({
    provider: {
      name: providerName,
    },
    consumer: {
      name: 'Stubbah',
    },
    interactions: [
      {
        description: values.description,
        provider_state: values.providerState,
        request: {
          method: values.requestMethod,
          path: values.requestPath,
          headers: requestHeaders,
        },
        response: {
          status: values.responseStatus,
          headers: responseHeaders,
          body: responseBody,
        },
      },
    ],
    metadata: {
      pactSpecificationVersion: '1.0.0',
    },
  });
};

export default constructPactFromValues;
