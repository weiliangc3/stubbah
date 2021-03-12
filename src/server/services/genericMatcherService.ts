import { Request } from 'express';
import GenericProvider from '../../classes/GenericProvider';
import PactProvider from '../../classes/PactProvider';
import { Matcher } from '../../classes/types';
import { getRouteFromBaseUrl, getStubPathForMatching } from '../utils/routeUtils';

function matchUrl(request: Request, matcher: Matcher): boolean {
  const urlMatcher = matcher.matcher || 'exact';
  const route = getRouteFromBaseUrl(request);
  const stubPath = getStubPathForMatching(request, route);
  let regex;

  switch (urlMatcher) {
    case 'exact':
      return stubPath === matcher.value;
    case 'regex':
      if (matcher.value) {
        regex = new RegExp(matcher.value);
        return regex.test(stubPath);
      }
      return false;
    default:
      break;
  }
  return false;
}

function matchMethod(request: Request, matcher: Matcher): boolean {
  const requestMethod = request.method;
  return matcher.value?.toLowerCase() === requestMethod.toLowerCase();
}

function matchHeaders(request: Request, matcher: Matcher): boolean {
  const headersToMatch = matcher.headers;
  if (!headersToMatch) { return false; }

  let matched = true;
  Object.keys(headersToMatch).forEach((key) => {
    if (!(request.header(key) === headersToMatch[key])) {
      matched = false;
    }
  });

  return matched;
}

function matchState(
  matcher: Matcher, provider: GenericProvider|PactProvider,
): boolean {
  if (matcher.value) {
    return provider.activeStates.includes(matcher.value);
  }
  return false;
}

// eslint-disable-next-line import/prefer-default-export
export function match(
  request: Request, matcher: Matcher, provider: GenericProvider|PactProvider,
): boolean {
  switch (matcher.type) {
    case 'url':
      return matchUrl(request, matcher);
    case 'method':
      return matchMethod(request, matcher);
    case 'headers':
      return matchHeaders(request, matcher);
    case 'state':
      return matchState(matcher, provider);
    default:
      console.log(`No matcher found for '${matcher.type}'`);
      break;
  }
  return false;
}

export function matchAll(
  request: Request, matchers: Matcher[], provider: GenericProvider|PactProvider,
): boolean {
  let matched = true;
  for (let index = 0; index < matchers.length; index += 1) {
    const matcher = matchers[index];

    if (!match(request, matcher, provider)) {
      matched = false;
      break;
    }
  }
  return matched;
}
