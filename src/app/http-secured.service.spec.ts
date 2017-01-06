/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpSecuredService } from './http-secured.service';

describe('HttpSecuredService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpSecuredService]
    });
  });

  it('should ...', inject([HttpSecuredService], (service: HttpSecuredService) => {
    expect(service).toBeTruthy();
  }));
});
