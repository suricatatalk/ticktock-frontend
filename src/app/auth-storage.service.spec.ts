/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthStorageService } from './auth-storage.service';

describe('AuthStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthStorageService]
    });
  });

  it('should ...', inject([AuthStorageService], (service: AuthStorageService) => {
    expect(service).toBeTruthy();
  }));
});
