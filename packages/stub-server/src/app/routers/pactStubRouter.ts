/* eslint-disable no-prototype-builtins */
import { Router } from 'express';
import { getProviderStubByRoute } from '../providerStubs';
import emulateResponse from '../utils/emulateResponse';

const router = Router();

router.use((req, res, next) => {
  console.log(`Matching request: ${req.method} to ${req.originalUrl}`);
  next();
});

router.get('*', (req, res) => {
  const URI = req.url;
  const root = URI.split(/\//)[1];
  const providerStubs = getProviderStubByRoute(root);

  if (providerStubs) {
    const pathRegex = new RegExp(`${root}/(.+)`);
    const regexArray = pathRegex.exec(URI);
    const path = `/${regexArray ? regexArray[1] : ''}`;

    const providerInteractions = providerStubs.interactions;
    const providerActiveStates = providerStubs.activeStates;

    const matchingInteractions = providerInteractions
      .filter((interaction) => interaction.request.path === path
        && interaction.request.method.toLowerCase() === req.method.toLowerCase()
        && providerActiveStates.includes(interaction.provider_state));

    if (matchingInteractions.length > 0) {
      console.log(`Provider interactions matched with ${matchingInteractions.length} pact(s)`);
      return emulateResponse(matchingInteractions[0].response, res);
    }
  }

  console.log(`Request unmatched: ${req.method} to ${req.originalUrl}`);
  return res
    .status(404)
    .send('No matched stubs');
});

export default router;
