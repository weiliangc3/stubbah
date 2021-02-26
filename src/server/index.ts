import startServer from './server';
import { loadPact, addStateForProviderByRoute } from './providerStubs';

const app = startServer;

addStateForProviderByRoute('there is an alligator named Mary', 'zoo');
addStateForProviderByRoute('there is an alligator named Garry', 'zoo');
