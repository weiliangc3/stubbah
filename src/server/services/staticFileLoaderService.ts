import { Dirent, readdirSync, readFileSync } from 'fs';
import path from 'path';
import RawPact from '../../classes/RawPact';
import PactToLoad from '../../classes/PactToLoad';
import GenericStub from '../../classes/GenericStub';

const stubDirectory = path.resolve(__dirname, '../../../stubs');
const pactDirectory = path.join(stubDirectory, 'pact');
const genericDirectory = path.join(stubDirectory, 'generic');

const filetypeMap: Record<string, string> = {
  '.json': 'json',
  '.xml': 'xml',
};

function getDirectories(source: string): Dirent[] {
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory());
}

function getExtension(filename: string): string {
  const i = filename.lastIndexOf('.');
  return (i < 0) ? '' : filename.substr(i);
}

function checkFileType(filename: string): string {
  return filetypeMap[getExtension(filename)];
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
        const pact: RawPact = new RawPact(JSON.parse(data.toString()));
        pactsToLoad.push(new PactToLoad(pact, route));
        console.log(`Pact file loaded to provider "${route}" from file: ${fullFilePath}`);
      } catch {
        console.log(`Failed to load pact file: ${fullFilePath}`);
      }
    });
  });

  return pactsToLoad;
}

export function getLocalStubFiles(): Record<string, GenericStub[]> {
  const stubs: Record<string, GenericStub[]> = {};

  const stubProviderDirectories = getDirectories(genericDirectory);
  stubProviderDirectories.forEach((providerDirectory) => {
    const route = providerDirectory.name;
    if (!stubs[route]) { stubs[route] = []; }
    const fullProviderDirectory = path.join(genericDirectory, route);

    const filesToLoad = readdirSync(fullProviderDirectory);
    filesToLoad.forEach((file) => {
      const fullFilePath = path.join(fullProviderDirectory, file);
      if (checkFileType(fullFilePath) === 'json') {
        try {
          const data = readFileSync(fullFilePath);
          const stub: GenericStub = JSON.parse(data.toString());
          stub.name = file;
          stubs[route].push(stub);
          console.log(`Stub file loaded to provider "${route}" from file: ${fullFilePath}`);
        } catch {
          console.log(`Failed to load stub file: ${fullFilePath}`);
        }
      }
    });
  });

  return stubs;
}

export function getPactsInDirectory() {
  getDirectories(path.join(stubDirectory, '/stubs'));
}
