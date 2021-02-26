import startServer from './app/server';
import samplePact from '../stubs/sample.json';
import { loadPact, addStateForProviderByRoute } from './app/providerStubs';

const app = startServer;

loadPact(samplePact, 'zoo');
addStateForProviderByRoute('there is an alligator named Mary', 'zoo');
addStateForProviderByRoute('there is an alligator named Garry', 'zoo');
