import { TestBed } from '@angular/core/testing';

import { ingredientsService } from './ingredients.service';

describe('IngredientsService', () => {
  let service: ingredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ingredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
