import { Request } from 'express';
import { MatchType } from './types';
import MatchedPactInteraction from './MatchedPactInteraction';
import MatchedRequest from './MatchedRequest';

export default class RequestRecord {
  request: MatchedRequest;

  matched: boolean;

  matchedStub: MatchedPactInteraction|undefined;

  matchType: MatchType|undefined;

  constructor(request: Request, matchedStub: MatchedPactInteraction|undefined = undefined) {
    this.request = new MatchedRequest(request);
    if (matchedStub) {
      this.matched = true;
      this.matchedStub = matchedStub;
      if (matchedStub instanceof MatchedPactInteraction) {
        this.matchType = MatchType.Pact;
      } else {
        this.matchType = MatchType.Generic;
      }
    } else {
      this.matched = false;
    }
  }
}
