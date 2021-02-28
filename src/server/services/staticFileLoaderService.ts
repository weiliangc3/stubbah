import { Dirent, readdirSync, readFileSync } from 'fs';
import path from 'path';
import Pact from '../../classes/Pact';
import PactToLoad from '../../classes/PactToLoad';

const stubDirectory = path.resolve(__dirname, '../../../stubs');
const pactDirectory = path.join(stubDirectory, 'pact');
// const genericDirectory = path.join(stubDirectory, 'generic');

function getDirectories(source: string): Dirent[] {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
}

export function getLocalPactFiles(): PactToLoad[] {
  const pactsToLoad: PactToLoad[] = [];

  const pactProviderDirectories = getDirectories(pactDirectory);
  pactProviderDirectories.forEach((pactProviderDirectory) => {
    const route = pactProviderDirectory.name;
    const fullProviderDirectory = path.join(pactDirectory, route);

    const filesToLoad = readdirSync(fullProviderDirectory);
    filesToLoad.forEach((file) => {
      const fullFilePath = path.join(fullProviderDirectory, file);
      try {
        const data = readFileSync(fullFilePath);
        const pact: Pact = new Pact(JSON.parse(data.toString()));
        pactsToLoad.push(new PactToLoad(pact, route));
        console.log(`Pact file loaded to provider "${route}" from file: ${fullFilePath}`);
      } catch {
        console.log(`Failed to load pact file: ${fullFilePath}`);
      }
    });
  });

  return pactsToLoad;
}

export function getPactsInDirectory() {
  getDirectories(path.join(stubDirectory, '/stubs'));
}
