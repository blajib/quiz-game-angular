import { TestBed } from '@angular/core/testing';

import { QuestiongameService } from './questiongame.service';

describe('QuestiongameService', () => {
  let service: QuestiongameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestiongameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
