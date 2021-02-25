import startServer from './server';
import samplePact from '../stubs/sample.json';
import { loadPact, addStateForProviderByRoute } from './providerStubs';

const app = startServer;

loadPact(samplePact, 'zoo');
addStateForProviderByRoute('there is an alligator named Mary', 'zoo');
addStateForProviderByRoute('there is an alligator named Garry', 'zoo');
