import { TestBed } from '@angular/core/testing';

import { NgEspnFantasyFootballService } from './ng-espn-fantasy-football.service';

describe('NgEspnFantasyFootballService', () => {
  let service: NgEspnFantasyFootballService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgEspnFantasyFootballService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
