import { TestBed } from '@angular/core/testing';

import { CloudVisionService } from './cloud-vision.service';

describe('CloudVisionService', () => {
  let service: CloudVisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloudVisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
