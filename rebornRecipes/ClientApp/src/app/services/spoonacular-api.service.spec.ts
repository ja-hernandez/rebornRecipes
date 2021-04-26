import { TestBed } from '@angular/core/testing';

import { SpoonacularApiService } from './spoonacular-api.service';

describe('SpoonacularApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpoonacularApiService = TestBed.get(SpoonacularApiService);
    expect(service).toBeTruthy();
  });
});
